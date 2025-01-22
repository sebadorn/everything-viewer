import { BaseView } from './BaseView.js';
import { DICOMParser } from '../../parser/DICOMParser.js';


export class DICOMView extends BaseView {


	/**
	 *
	 * @param {DICOMParser} parser
	 */
	constructor( parser ) {
		super( parser, 'dicom' );

		this._frameDelay = 250; // [ms]
		this._frameIndex = 0;
		this._frameTime = 33.333; // [ms]

		this._listenerKeyNav = null;
		this._timer = 0;
	}


	/**
	 *
	 * @private
	 * @param {object} dataSet
	 */
	_addMetaInfo( dataSet ) {
		this.mdAddGroup(
			'Patient',
			[
				{ name: 'Patient ID', value: dataSet.string( 'x00100020' ) },
				{ name: 'Issuer of Patient ID', value: dataSet.string( 'x00100021' ) },
				{ name: 'Type of Patient ID', value: dataSet.string( 'x00100022' ) },
				{ hr: 1 },
				{ name: 'Patient Name', value: dataSet.string( 'x00100010' ) },
				{ name: 'Other Patient Names', value: dataSet.string( 'x00101001' ) },
				{ name: 'Patient Birth Date', value: dataSet.string( 'x00100030' ) },
				{ name: 'Patient Birth Time', value: dataSet.string( 'x00100032' ) },
				{ name: 'Patient Sex', value: dataSet.string( 'x00100040' ) },
				{ name: 'Ethnic Group', value: dataSet.string( 'x00102160' ) },
				{ name: 'Patient Breed Desc.', value: dataSet.string( 'x00102292' ) },
				{ name: 'Patient Species Desc.', value: dataSet.string( 'x00102201' ) },
				{ name: 'Patient Comments', value: dataSet.string( 'x00104000' ) },
				{ name: 'Strain Desc.', value: dataSet.string( 'x00100212' ) },
				{ name: 'Strain Nomenclature', value: dataSet.string( 'x00100213' ) },
				{ name: 'Strain Addit. Info.', value: dataSet.string( 'x00100218' ) },
				{ hr: 1 },
				{ name: 'Responsible Person', value: dataSet.string( 'x00102297' ) },
				{ name: 'Resp. Person Role', value: dataSet.string( 'x00102298' ) },
				{ name: 'Resp. Organization', value: dataSet.string( 'x00102299' ) }
			]
		);

		this.mdAddGroup(
			'Patient Study',
			[
				{ name: 'Admitting Diagnoses Desc.', value: dataSet.string( 'x00081080' ) },
				{ name: 'Patient\'s Age (years)', value: dataSet.string( 'x00101010' ) },
				{ name: 'Patient\'s Size (m)', value: dataSet.string( 'x00101020' ) },
				{ name: 'Patient\'s BMI', value: dataSet.string( 'x00101022' ) },
				{ name: 'Measured AP Dimension (mm)', value: dataSet.string( 'x00101023' ) },
				{ name: 'Measured Lateral Dimension (mm)', value: dataSet.string( 'x00101024' ) },
				{ name: 'Patient\'s Weight (kg)', value: dataSet.string( 'x00101030' ) },
				{ name: 'Medical Alerts', value: dataSet.string( 'x00102000' ) },
				{ name: 'Allergies', value: dataSet.string( 'x00102110' ) },
				{ name: 'Occupation', value: dataSet.string( 'x00102180' ) },
				{ name: 'Smoking Status', value: dataSet.string( 'x001021a0' ) },
				{ name: 'Addit. Patient History', value: dataSet.string( 'x001021b0' ) },
				{ name: 'Pregnancy Status', value: DICOMParser.getPregnancyStatus( dataSet.string( 'x001021c0' ) ) },
				{ name: 'Last Menstrual Date', value: dataSet.string( 'x001021d0' ) },
				{ name: 'Patient\'s Sex Neutered', value: dataSet.string( 'x00102203' ) },
				{ name: 'Reason for Visit', value: dataSet.string( 'x00321066' ) },
				{ name: 'Admission ID', value: dataSet.string( 'x00380010' ) },
				{ name: 'Service Episode ID', value: dataSet.string( 'x00380060' ) },
				{ name: 'Service Episode Desc.', value: dataSet.string( 'x00380062' ) },
				{ name: 'Patient State', value: dataSet.string( 'x00380500' ) }
			]
		);

		this.mdAddGroup(
			'General Study',
			[
				{ name: 'Study Date', value: dataSet.string( 'x00080020' ) },
				{ name: 'Study Time', value: dataSet.string( 'x00080030' ) },
				{ name: 'Accession Number', value: dataSet.string( 'x00080050' ) },
				{ name: 'Referring Physician Name', value: dataSet.string( 'x00080090' ) },
				{ name: 'Consulting Physician\'s Name', value: dataSet.string( 'x0008109c' ) },
				{ name: 'Study Desc.', value: dataSet.string( 'x00081030' ) },
				{ name: 'Physician(s) of Record', value: dataSet.string( 'x00081048' ) },
				{ name: 'Physician(s) Reading Study', value: dataSet.string( 'x00081060' ) },
				{ name: 'Study ID', value: dataSet.string( 'x00200010' ) },
				{ name: 'Requesting Service', value: dataSet.string( 'x00321033' ) }
			]
		);

		this.mdAddGroup(
			'General Series',
			[
				{ name: 'Series Date', value: dataSet.string( 'x00080021' ) },
				{ name: 'Series Time', value: dataSet.string( 'x00080031' ) },
				{ name: 'Modality', value: DICOMParser.getModalityName( dataSet.string( 'x00080060' ) ) },
				{ name: 'Series Desc.', value: dataSet.string( 'x0008103e' ) },
				{ name: 'Performing Physician\'s Name', value: dataSet.string( 'x00081050' ) },
				{ name: 'Operator\'s Name', value: dataSet.string( 'x00081070' ) },
				{ name: 'Anatomical Orientation Type', value: dataSet.string( 'x00102210' ) },
				{ name: 'Body Part Examined', value: dataSet.string( 'x00180015' ) },
				{ name: 'Protocol Name', value: dataSet.string( 'x00181030' ) },
				{ name: 'Patient Position', value: dataSet.string( 'x00185100' ) },
				{ name: 'Series Number', value: dataSet.string( 'x00200011' ) },
				{ name: 'Laterality', value: dataSet.string( 'x00200060' ) },
				{ name: 'Performed Procedure Step Desc.', value: dataSet.string( 'x00400254' ) },
				{ name: 'Comments on the Procedure Step', value: dataSet.string( 'x00400280' ) }
			]
		);

		this.mdAddGroup(
			'General Image',
			[
				{ name: 'Image Type', value: dataSet.string( 'x00080008' ) },
				{ name: 'Patient Orientation', value: dataSet.string( 'x00200020' ) },
				{ name: 'Image Laterality', value: dataSet.string( 'x00200062' ) },
				{ name: 'Image Comments', value: dataSet.string( 'x00204000' ) }
			]
		);

		this.mdAddGroup(
			'General Equipment',
			[
				{ name: 'Manufacturer', value: dataSet.string( 'x00080070' ) },
				{ name: 'Institution Name', value: dataSet.string( 'x00080080' ) },
				{ name: 'Institution Address', value: dataSet.string( 'x00080081' ) },
				{ name: 'Station Name', value: dataSet.string( 'x00081010' ) },
				{ name: 'Institutional Department Name', value: dataSet.string( 'x00081040' ) },
				{ name: 'Manufacturer\'s Model Name', value: dataSet.string( 'x00081090' ) },
				{ name: 'Device Serial Number', value: dataSet.string( 'x00181000' ) },
				{ name: 'Device UID', value: dataSet.string( 'x00181002' ) },
				{ name: 'Gantry ID', value: dataSet.string( 'x00181008' ) },
				{ name: 'Software Versions', value: dataSet.string( 'x00181020' ) },
				{ name: 'Spatial Resolution', value: dataSet.string( 'x00181050' ) },
				{ name: 'Date of Last Calibration', value: dataSet.string( 'x00181200' ) },
				{ name: 'Time of Last Calibration', value: dataSet.string( 'x00181201' ) }
			]
		);
	}


	/**
	 *
	 * @private
	 */
	_buildControls() {
		const node = UI.build( `
			<div class="image-container"></div>
			<div class="actions">
				<input type="range" min="1" max="${this._numFrames}" value="1" />
				<div class="line">
					<div class="wrap wrap-frame-controls">
						<button class="frame-prev">&larr;</button>
						<span class="counter"></span>
						<button class="frame-next">&rarr;</button>
					</div>
					<div class="wrap wrap-playback">
						<button class="play-pause">▶</button>
						<select class="speed">
							<option value="${this._frameTime}">Default: ${this._frameTime} ms</option>
							<option value="16.7">16.7 ms</option>
							<option value="33.3">33.3 ms</option>
							<option value="66.7">66.7 ms</option>
							<option value="133.3">133.3 ms</option>
						</select>
					</div>
				</div>
			</div>
		` );

		this._frameIndex = 0;

		if( this._numFrames <= 2 ) {
			node.querySelector( '.actions' ).remove();
		}
		else {
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

			const selectSpeed = node.querySelector( 'select.speed' );
			selectSpeed.addEventListener( 'change', _ev => {
				this._frameTime = Number( selectSpeed.value );
			} );

			const btnPlayPause = node.querySelector( 'button.play-pause' );
			btnPlayPause.addEventListener( 'click', _ev => {
				// Start playback
				if( !this._timer ) {
					btnPlayPause.textContent = '⏸';
					this._playback( slider );
				}
				// Pause playback
				else {
					btnPlayPause.textContent = '▶';
					clearTimeout( this._timer );
					this._timer = 0;
				}
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
		}

		this.nodeView.append( node );
	}


	/**
	 *
	 * @private
	 * @param {HTMLInputElement} slider
	 */
	_playback( slider ) {
		if( this._timer ) {
			return;
		}

		const delay = this._frameIndex === 0 ? this._frameDelay : 0;

		this._timer = setTimeout( () => {
			this.showFrame( ++this._frameIndex );
			slider.value = this._frameIndex + 1;

			this._timer = 0;
			this._playback( slider );
		}, this._frameTime + delay );
	}


	/**
	 *
	 */
	destroy() {
		super.destroy();

		clearTimeout( this._timer );

		cornerstone.imageCache.purgeCache();
		cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.purge();
		cornerstoneWADOImageLoader.wadouri.fileManager.purge();

		document.body.removeEventListener( 'keyup', this._listenerKeyNav );
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.parse( ( err, dataSet ) => {
			if( err ) {
				return;
			}

			// DICOMDIR directory.
			if( this.parser.isDir ) {
				this.parser.loadDICOMDIRFiles( dataSet, ( _err, files, dataSets ) => {
					this._imageId = [];
					this._dataSets = dataSets;
					this._buildControls();

					cb();

					const imageContainer = this.nodeView.querySelector( '.image-container' );
					cornerstone.enable( imageContainer );
					cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

					files.forEach( file => {
						const id = cornerstoneWADOImageLoader.wadouri.fileManager.add( file );
						this._imageId.push( id );
					} );

					this.showFile( 0 );
				} );
			}
			// Single file.
			else {
				this._numFrames = Number( dataSet.string( 'x00280008' ) || 1 );
				this._frameDelay = Number( dataSet.string( 'x00181033' ) || this._frameDelay ); // [ms]
				this._frameTime = Number( dataSet.string( 'x00181063' ) || this._frameTime ); // [ms]

				this._addMetaInfo( dataSet );

				this.buildMetaNode( { toggleForEmpty: true } );
				this._buildControls();

				cb();

				const imageContainer = this.nodeView.querySelector( '.image-container' );
				cornerstone.enable( imageContainer );
				cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

				this._imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add( this.parser.file );
				this.showFrame( 0, this._imageId );
			}
		} );
	}


	/**
	 *
	 * @param {number} index
	 */
	showFile( index ) {
		const dataSet = this._dataSets[index];
		const imageId = this._imageId[index];

		this._numFrames = Number( dataSet.string( 'x00280008' ) || 1 );
		this._frameDelay = Number( dataSet.string( 'x00181033' ) || this._frameDelay ); // [ms]
		this._frameTime = Number( dataSet.string( 'x00181063' ) || this._frameTime ); // [ms]

		this._addMetaInfo( dataSet );
		this.buildMetaNode( { toggleForEmpty: true } );

		this.showFrame( 0, imageId );
	}


	/**
	 *
	 * @param {number} index
	 * @param {string} imageId
	 */
	showFrame( index, imageId ) {
		if( index >= this._numFrames ) {
			index = 0;
		}
		else if( index < 0 ) {
			index = this._numFrames - 1;
		}

		this._frameIndex = index;

		cornerstone.loadAndCacheImage( imageId + '?frame=' + index ).then( image => {
			const imageContainer = this.nodeView.querySelector( '.image-container' );
			const viewport = cornerstone.getDefaultViewportForImage( imageContainer, image );
			cornerstone.displayImage( imageContainer, image, viewport );
		} );

		if( this._counter ) {
			this._counter.textContent = ( index + 1 ) + '/' + this._numFrames;
		}
	}


};
