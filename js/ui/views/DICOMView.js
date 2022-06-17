'use strict';


{

class DICOMView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.DICOMParser} parser
	 */
	constructor( parser ) {
		super( parser, 'dicom' );

		this._frameIndex = 0;
		this._listenerKeyNav = null;
	}


	/**
	 *
	 * @private
	 * @param {object} dataSet
	 */
	_addMetaInfo( dataSet ) {
		this.metaData._HR_0 = 1;

		// Study
		this.metaData['Study Description'] = dataSet.string( 'x00081030' );
		this.metaData['Study Date'] = dataSet.string( 'x00080020' );
		this.metaData['Study Time'] = dataSet.string( 'x00080030' );
		this.metaData['Accession Number'] = dataSet.string( 'x00080050' );

		this.metaData._HR_1 = 1;

		// Institution
		this.metaData['Manufacturer'] = dataSet.string( 'x00080070' );
		this.metaData['Institution Name'] = dataSet.string( 'x00080080' );
		this.metaData['Institution Address'] = dataSet.string( 'x00080081' );

		this.metaData['Referring Physician Name'] = dataSet.string( 'x00080090' );
		this.metaData['Performing Physician Name'] = dataSet.string( 'x00081050' );

		this.metaData._HR_2 = 1;

		// Patient
		this.metaData['Patient ID'] = dataSet.string( 'x00100020' );
		this.metaData['Patient Name'] = dataSet.string( 'x00100010' );
		this.metaData['Patient Birth Date'] = dataSet.string( 'x00100030' );
		this.metaData['Patient Sex'] = dataSet.string( 'x00100040' );

		this.metaData._HR_3 = 1;

		// Image
		this.metaData['Modality'] = this.getModalityName( dataSet.string( 'x00080060' ) );
		this.metaData['Image Type'] = dataSet.string( 'x00080008' );
		this.metaData['TransferSyntaxUID'] = dataSet.string( 'x00020010' );
	}


	/**
	 *
	 * @private
	 */
	_buildControls() {
		const node = Evy.UI.buildHTML( `
			<div class="image-container"></div>
			<div class="actions">
				<input type="range" min="1" max="${this._numFrames}" value="1" />
				<div class="line">
					<button class="frame-prev">&larr;</button>
					<span class="counter"></span>
					<button class="frame-next">&rarr;</button>
				</div>
			</div>
		` );

		this._frameIndex = 0;

		const slider = node.querySelector( 'input[type="range"]' );
		slider.addEventListener( 'change', ev => {
			this._frameIndex = ev.target.valueAsNumber - 1;
			this.showFrame( this._frameIndex );
		} );

		const btnPrev = node.querySelector( 'button.frame-prev' );
		btnPrev.addEventListener( 'click', _ev => {
			this.showFrame( --this._frameIndex );
			slider.value = this._frameIndex + 1;
		} );

		const btnNext = node.querySelector( 'button.frame-next' );
		btnNext.addEventListener( 'click', _ev => {
			this.showFrame( ++this._frameIndex );
			slider.value = this._frameIndex + 1;
		} );

		this._listenerKeyNav = ev => {
			const active = document.activeElement;

			if( active && active.type === 'range' ) {
				return;
			}

			if( ev.key === 'ArrowLeft' ) {
				this.showFrame( --this._frameIndex );
				slider.value = this._frameIndex + 1;
			}
			else if( ev.key === 'ArrowRight' ) {
				this.showFrame( ++this._frameIndex );
				slider.value = this._frameIndex + 1;
			}
		};

		document.body.addEventListener( 'keyup', this._listenerKeyNav );

		this._counter = node.querySelector( '.counter' );

		this.nodeView.append( node );
	}


	/**
	 *
	 */
	destroy() {
		super.destroy();

		cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.purge();
		cornerstoneWADOImageLoader.wadouri.fileManager.purge();

		document.body.removeEventListener( 'keyup', this._listenerKeyNav );
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

		let value = DICOMView.MODALITY_MAP[key];

		if( value ) {
			value += ` [${key}]`;
		}

		return value || key;
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.parse( ( _err, dataSet ) => {
			this._numFrames = Number( dataSet.string( 'x00280008' ) || 1 );
			this._addMetaInfo( dataSet );

			this.buildMetaNode();
			this._buildControls();

			cb();

			const imageContainer = this.nodeView.querySelector( '.image-container' );
			cornerstone.enable( imageContainer );
			cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

			this._imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add( this.parser.file );
			this.showFrame( 0 );
		} );
	}


	/**
	 *
	 * @param {number} index
	 */
	showFrame( index ) {
		if( index >= this._numFrames ) {
			index = 0;
		}
		else if( index < 0 ) {
			index = this._numFrames - 1;
		}

		this._frameIndex = index;

		cornerstone.loadImage( this._imageId + '?frame=' + index ).then( image => {
			const imageContainer = this.nodeView.querySelector( '.image-container' );
			const viewport = cornerstone.getDefaultViewportForImage( imageContainer, image );
			cornerstone.displayImage( imageContainer, image, viewport );
		} );

		this._counter.textContent = ( index + 1 ) + '/' + this._numFrames;
	}


}


// Source: https://dicomlibrary.com/dicom/modality/
DICOMView.MODALITY_MAP = {
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

Evy.UI.DICOMView = DICOMView;

}
