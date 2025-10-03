import { BaseParser } from '../BaseParser.js';
import { NIFTIParser } from '../nifti/NIFTIParser.js';


export class DICOMParser extends BaseParser {


	static numInstances = 0;


	/**
	 *
	 * @param {import('../Registry.js').ImportData} data
	 */
	constructor( data ) {
		super( data, !!data.dir );
		this.file = data.dir || data.file;

		if( data.fileList ) {
			this.entries = data.fileList;
		}

		this._fileManagerIds = [];

		DICOMParser.numInstances++;
	}


	/**
	 *
	 * @private
	 * @param {File} file
	 * @returns {Promise<*>}
	 */
	async _loadFromDicomdirFile( file ) {
		const arrayBuffer = await file.arrayBuffer();

		const dicomParser = await import(
			/* webpackChunkName: "dicom-parser" */
			'dicom-parser'
		);

		const options = { TransferSyntaxUID: '1.2.840.10008.1.2' };
		const dataSet = dicomParser.parseDicom( new Uint8Array( arrayBuffer ), options );
		const record = dataSet.elements.x00041220;

		if( !record || !Array.isArray( record.items ) ) {
			console.error( '[DICOMParser._parseHandlerDir]' +
				' Record is either not set or has no entries.', record );
		}

		return record;
	}


	/**
	 *
	 * @private
	 * @returns {Promise<any>}
	 */
	async _parseHandlerDir() {
		const entries = this.entries;

		/** @type {FileSystemFileEntry?} */
		const dicomdirEntry = entries.find( entry => {
			return (
				entry.isFile &&
				entry.name.toLowerCase() === 'dicomdir'
			);
		} );

		if( !dicomdirEntry ) {
			return entries;
		}

		return new Promise( ( resolve, reject ) => {
			dicomdirEntry.file(
				async file => {
					const record = await this._loadFromDicomdirFile( file );
					resolve( record );
				},
				err => {
					console.error( '[DICOMParser._parseHandlerDir]', err );
					reject( err );
				}
			);
		} );
	}


	/**
	 *
	 * @param {File} file
	 * @returns {Promise<IImage>}
	 */
	async addAndLoadFile( file ) {
		const imageId = this.wadouri.fileManager.add( file );
		this._fileManagerIds.push( imageId );

		return await this.wadouri.loadImage( imageId ).promise;
	}


	/**
	 *
	 */
	destroy() {
		if( DICOMParser.numInstances === 1 ) {
			console.log( '[DICOMParser.destroy] Purging cornerstone caches.' );

			try {
				if( NIFTIParser.numInstances === 0 ) {
					this.cache.purgeCache();
				}

				this.wadouri.dataSetCacheManager.purge();
				this.wadouri.fileManager.purge();
			}
			catch( err ) {
				console.error( '[DICOMParser.destroy]', err );
			}
		}

		DICOMParser.numInstances--;
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
	 * @param {object[]} record.items
	 * @returns {string[]}
	 */
	getFilepathsFromRecord( record ) {
		const filePaths = [];

		record.items.forEach( item => {
			let filePath = item.dataSet.string( 'x00041500' );

			if( filePath ) {
				filePath = filePath.replace( /\\/g, '/' );
				filePaths.push( filePath );
			}
		} );

		return filePaths;
	}


	/**
	 *
	 * @param {object|FileSystemEntry[]} record
	 * @param {function} cb
	 */
	loadDICOMDIRFiles( record, cb ) {
		const images = [];

		if( Array.isArray( record ) ) {
			const loadFile = i => {
				if( i >= record.length ) {
					cb( null, images );
					return;
				}

				const fileEntry = record[i];

				fileEntry.file( async file => {
					const image = await this.addAndLoadFile( file );
					images.push( image );
					loadFile( i + 1 );
				} );
			};

			loadFile( 0 );
		}
		else {
			const filePaths = this.getFilepathsFromRecord( record );

			const loadFile = i => {
				if( i >= filePaths.length ) {
					cb( null, images );
					return;
				}

				const filePath = filePaths[i];

				this.file.getFile(
					filePath, {},
					fileEntry => {
						fileEntry.file( async file => {
							const image = await this.addAndLoadFile( file );
							images.push( image );
							loadFile( i + 1 );
						} );
					},
					err => {
						console.error( `[DICOMParser.loadDICOMDIRFiles] getFile "${filePath}": ` + err.message );
						loadFile( i + 1 );
					}
				);
			};

			loadFile( 0 );
		}
	}


	/**
	 *
	 * @returns {Promise<IImage|string[]>}
	 */
	async parse() {
		const core = await import(
			/* webpackChunkName: "cornerstone_core" */
			'@cornerstonejs/core'
		);
		const dicomLoader = await import(
			/* webpackChunkName: "cornerstone_dicom-image-loader" */
			'@cornerstonejs/dicom-image-loader'
		);

		core.init();
		dicomLoader.init();

		this.cache = core.cache;
		this.wadouri = dicomLoader.wadouri;

		if( this.isDir ) {
			return await this._parseHandlerDir();
		}
		else if( this.file.name.toLowerCase() === 'dicomdir' ) {
			const record = await this._loadFromDicomdirFile( this.file );
			return this.getFilepathsFromRecord( record );
		}
		else {
			return await this.addAndLoadFile( this.file );
		}
	}


};

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
	XC: 'External-camera Photography',
};