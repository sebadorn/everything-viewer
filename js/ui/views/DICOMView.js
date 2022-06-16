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
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.parse( ( _err, dataSet ) => {
			console.log('DICOM dataSet', dataSet); // TODO: remove

			// Patient
			const patientName = dataSet.string( 'x00100010' );
			const patientID = dataSet.string( 'x00100020' );
			const patientBirthDate = dataSet.string( 'x00100030' );
			const patientSex = dataSet.string( 'x00100040' );

			// Image
			const imgType = dataSet.string( 'x00080008' );
			this._numFrames = dataSet.string( 'x00280008' ) || 1;
			const imgHeight = dataSet.string( 'x00280010' );
			const imgWidth = dataSet.string( 'x00280011' );

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


Evy.UI.DICOMView = DICOMView;

}
