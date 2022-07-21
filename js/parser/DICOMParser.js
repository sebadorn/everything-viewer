'use strict';


{

class DICOMParser extends Evy.BaseParser {


	/**
	 *
	 * @constructor
	 * @param {(File|FileSystemEntry[])} file
	 * @param {string}                   mimeType
	 */
	constructor( file, mimeType ) {
		const isDir = Array.isArray( file );
		super( file, mimeType, isDir );
	}


	/**
	 *
	 * @private
	 * @param {function} cb
	 */
	_parseHandlerDir( cb ) {
		const entries = this.file;
		const dicomdirEntry = entries.find( entry => {
			return (
				entry.isFile &&
				entry.name.toLowerCase() === 'dicomdir'
			);
		} );

		dicomdirEntry.file(
			file => {
				const promise = file.arrayBuffer();

				promise
					.then( arrayBuffer => {
						const options = { TransferSyntaxUID: '1.2.840.10008.1.2' };
						const dataSet = dicomParser.parseDicom( new Uint8Array( arrayBuffer ), options );
						const record = dataSet.elements.x00041220;

						if( !record || !Array.isArray( record.items ) ) {
							console.error( '[Evy.DICOMParser._parseHandlerDir]' +
								' Record is either not set or has no entries.', record );
						}
						else {
							cb( null, record );
						}
					} )
					.catch( err => {
						console.error( err );
					} );
			},
			err => {
				console.error( '[Evy.DICOMParser._parseHandlerDir] ' + err.message );
				cb( err );
			}
		);
	}


	/**
	 *
	 * @private
	 * @param {function} cb
	 */
	_parseHandlerFile( cb ) {
		this.getArrayBuffer( ( _err, arrayBuffer ) => {
			// Allow raw files
			const options = { TransferSyntaxUID: '1.2.840.10008.1.2' };
			const dataSet = dicomParser.parseDicom( new Uint8Array( arrayBuffer ), options );

			cb( null, dataSet );
		} );
	}


	/**
	 *
	 * @param  {string} key
	 * @return {string}
	 */
	static getModalityName( key ) {
		if( !key ) {
			return key;
		}

		key = String( key ).toUpperCase();

		let value = DICOMParser.MODALITY_MAP[key];

		if( value ) {
			value += ` [${key}]`;
		}

		return value || key;
	}


	/**
	 *
	 * @param  {number} value
	 * @return {(string|number)}
	 */
	static getPregnancyStatus( value ) {
		if( isNaN( Number( value ) ) ) {
			return value;
		}

		value = Number( value );

		const names = [
			'not pregnant',
			'possibly pregnant',
			'definitely pregnant',
			'unknown'
		];

		return names[value + 1] || value;
	}


	/**
	 *
	 * @param {object}   record
	 * @param {function} cb
	 */
	loadDICOMDIRFiles( record, cb ) {
		const filePaths = [];
		const files = [];
		const entries = this.file;

		record.items.forEach( item => {
			let filePath = item.dataSet.string('x00041500');

			if( filePath ) {
				filePath = filePath.replace( /\\/g, '/' );
				filePaths.push( filePath );
			}
		} );

		// TODO: currently only works if all files – including the DICOMDIR file – are in the same directory.

		const loadFile = i => {
			if( i >= filePaths.length ) {
				cb( null, files );
				return;
			}

			const filePath = filePaths[i];
			const entry = entries.find( entry => {
				return (
					entry.isFile &&
					entry.name === filePath
				);
			} );

			if( !entry ) {
				console.error( '[Evy.DICOMParser.loadDICOMDIRFiles]' +
					' File entry not found for: ' + filePath );
				loadFile( i + 1 );

				return;
			}

			entry.file(
				file => {
					files.push( file );
					loadFile( i + 1 );
				},
				err => {
					console.error( '[Evy.DICOMParser.loadDICOMDIRFiles] ' + err.message );
					loadFile( i + 1 );
				}
			);
		};

		loadFile( 0 );
	}


	/**
	 *
	 * @param {function} cb
	 */
	parse( cb ) {
		Evy.ensureScript( 'dicom', () => {
			if( this.isDir ) {
				this._parseHandlerDir( cb );
			}
			else {
				this._parseHandlerFile( cb );
			}
		} );
	}


}

// Source: https://dicomlibrary.com/dicom/modality/
DICOMParser.MODALITY_MAP = {
	AR: 'Autorefraction',
	AS: 'Angioscopy',
	ASMT: 'Content Assessment Results',
	AU: 'Audio',
	BDUS: 'Bone Densitometry (ultrasound)',
	BI: 'Biomagnetic imaging',
	BMD: 'Bone Densitometry (X-Ray)',
	CD: 'Color flow Doppler',
	CF: 'Cinefluorography',
	CP: 'Colposcopy',
	CR: 'Computed Radiography',
	CS: 'Cystoscopy',
	CT: 'Computed Tomography',
	DD: 'Duplex Doppler',
	DF: 'Digital fluoroscopy',
	DG: 'Diaphanography',
	DM: 'Digital microscopy',
	DOC: 'Document',
	DS: 'Digital Subtraction Angiography',
	DX: 'Digital Radiography',
	EC: 'Echocardiography',
	ECG: 'Electrocardiography',
	EPS: 'Cardiac Electrophysiology',
	ES: 'Endoscopy',
	FA: 'Fluorescein angiography',
	FID: 'Fiducials',
	FS: 'Fundoscopy',
	GM: 'General Microscopy',
	HC: 'Hard Copy',
	HD: 'Hemodynamic Waveform',
	IO: 'Intra-Oral Radiography',
	IOL: 'Intraocular Lens Data',
	IVOCT: 'Intravascular Optical Coherence Tomography',
	IVUS: 'Intravascular Ultrasound',
	KER: 'Keratometry',
	KO: 'Key Object Selection',
	LEN: 'Lensometry',
	LP: 'Laparoscopy',
	LS: 'Laser surface scan',
	MA: 'Magnetic resonance angiography',
	MG: 'Mammography',
	MR: 'Magnetic Resonance',
	MS: 'Magnetic resonance spectroscopy',
	NM: 'Nuclear Medicine',
	OAM: 'Ophthalmic Axial Measurements',
	OCT: 'Optical Coherence Tomography (non-Ophthalmic)',
	OP: 'Ophthalmic Photography',
	OPM: 'Ophthalmic Mapping',
	OPR: 'Ophthalmic Refraction',
	OPT: 'Ophthalmic Tomography',
	OPV: 'Ophthalmic Visual Field',
	OSS: 'Optical Surface Scan',
	OT: 'Other',
	PLAN: 'Plan',
	PR: 'Presentation State',
	PT: 'Positron emission tomography (PET)',
	PX: 'Panoramic X-Ray',
	REG: 'Registration',
	RESP: 'Respiratory Waveform',
	RF: 'Radio Fluoroscopy',
	RG: 'Radiographic imaging (conventional film/screen)',
	RTDOSE: 'Radiotherapy Dose',
	RTIMAGE: 'Radiotherapy Image',
	RTPLAN: 'Radiotherapy Plan',
	RTRECORD: 'RT Treatment Record',
	RTSTRUCT: 'Radiotherapy Structure Set',
	RWV: 'Real World Value Map',
	SEG: 'Segmentation',
	SM: 'Slide Microscopy',
	SMR: 'Stereometric Relationship',
	SR: 'SR Document',
	SRF: 'Subjective Refraction',
	ST: 'Single-photon emission computed tomography (SPECT)',
	STAIN: 'Automated Slide Stainer',
	TG: 'Thermography',
	US: 'Ultrasound',
	VA: 'Visual Acuity',
	VF: 'Videofluorography',
	XA: 'X-Ray Angiography',
	XC: 'External-camera Photography'
};


Evy.DICOMParser = DICOMParser;

}