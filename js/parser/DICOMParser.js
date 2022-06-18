'use strict';


{

class DICOMParser extends Evy.BaseParser {


	/**
	 *
	 * @constructor
	 * @param {File}   file
	 * @param {string} mimeType
	 */
	constructor( file, mimeType ) {
		super( file, mimeType );
	}


	/**
	 *
	 * @param  {string} key
	 * @return {string}
	 */
	getModalityName( key ) {
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
	getPregnancyStatus( value ) {
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
	 * @param {function} cb
	 */
	parse( cb ) {
		this.getArrayBuffer( ( _err, arrayBuffer ) => {
			Evy.ensureScript( 'dicom', () => {
				// Allow raw files
				const options = { TransferSyntaxUID: '1.2.840.10008.1.2' };
				const dataSet = dicomParser.parseDicom( new Uint8Array( arrayBuffer ), options );

				cb( null, dataSet );
			} );
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
