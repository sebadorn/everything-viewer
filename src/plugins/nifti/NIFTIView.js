import { viewport } from '@cornerstonejs/tools/utilities';
import { Button } from '../../ui/components/Button.js';
import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';
import { NIFTIParser } from './NIFTIParser.js';


export class NIFTIView extends BaseView {


	/**
	 *
	 * @param {NIFTIParser} parser
	 */
	constructor( parser ) {
		super( parser, 'nifti' );

		this._imageIds = null;
		this._volume = null;

		this._viewports = {
			axial: null,
			sagittal: null,
			coronal: null,
		};

		this._frameDelay = 250; // [ms]
		this._frameIndex = 0;
		this._frameTime = 33.333; // [ms]

		this._listenerKeyNav = null;
		this._timer = 0;
	}


	/**
	 *
	 * @private
	 */
	_buildControls() {
		const node = UI.build( `
			<div class="viewports">
				<div class="image-container image-container-axial"></div>
				<div class="image-container image-container-sagittal"></div>
				<div class="image-container image-container-coronal"></div>
			</div>
			<div class="actions">
				<input type="range" min="1" max="${this._numFrames}" value="1" />
				<div class="line">
					<div class="wrap wrap-frame-controls"></div>
					<div class="wrap wrap-playback">
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

		const btnPrev = new Button( {
			classes: 'frame-prev',
			text: '←',
		} );

		const btnNext = new Button( {
			classes: 'frame-next',
			text: '→',
		} );

		const btnPlayPause = new Button( {
			classes: 'play-pause',
			text: '▶',
		} );

		node.querySelector( '.wrap-frame-controls' ).append(
			btnPrev.render(),
			UI.build( '<span class="counter"></span>' ),
			btnNext.render(),
		);

		node.querySelector( '.wrap-playback' ).append( btnPlayPause.render() );

		this._frameIndex = 0;

		if( this._numFrames <= 2 ) {
			node.querySelector( '.actions' ).remove();
		}
		else {
			this._slider = node.querySelector( 'input[type="range"]' );
			this._slider.addEventListener( 'change', ev => {
				let diff = ev.target.valueAsNumber - 1 - this._frameIndex;
				this._controlGoto( diff );
			} );

			btnPrev.on( 'click', _ev => {
				this._controlGoto( -1 );
			} );

			btnNext.on( 'click', _ev => {
				this._controlGoto( 1 );
			} );

			const selectSpeed = node.querySelector( 'select.speed' );
			selectSpeed.addEventListener( 'change', _ev => {
				this._frameTime = Number( selectSpeed.value );
			} );

			btnPlayPause.on( 'click', _ev => {
				// Start playback
				if( !this._timer ) {
					btnPlayPause.update( { text: '⏸' } );
					this._playback( this._slider );
				}
				// Pause playback
				else {
					btnPlayPause.update( { text: '▶' } );
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
					this._controlGoto( -1 );
				}
				else if( ev.key === 'ArrowRight' ) {
					this._controlGoto( 1 );
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
	 * @param {number} delta
	 */
	_controlGoto( delta ) {
		this._frameIndex = this.showImage( delta );
		this._updateControls();
	}


	/**
	 *
	 * @private
	 * @returns {Promise<void>}
	 */
	async _initViewport(cb) {
		const {
			Enums,
			RenderingEngine,
			setVolumesForViewports,
			volumeLoader,
		} = await import(
			/* webpackChunkName: "cornerstone_core" */
			'@cornerstonejs/core'
		);

		const containerAxial = this.nodeView.querySelector( '.image-container-axial' );
		const containerSagitall = this.nodeView.querySelector( '.image-container-sagittal' );
		const containerCoronal = this.nodeView.querySelector( '.image-container-coronal' );

		const viewportInputArray = [
			{
				viewportId: 'nifti_ortho_axial',
				type: Enums.ViewportType.ORTHOGRAPHIC,
				element: containerAxial,
				defaultOptions: {
					orientation: Enums.OrientationAxis.AXIAL,
				},
			},
			{
				viewportId: 'nifti_ortho_sagittal',
				type: Enums.ViewportType.ORTHOGRAPHIC,
				element: containerSagitall,
				defaultOptions: {
					orientation: Enums.OrientationAxis.SAGITTAL,
				},
			},
			{
				viewportId: 'nifti_ortho_coronal',
				type: Enums.ViewportType.ORTHOGRAPHIC,
				element: containerCoronal,
				defaultOptions: {
					orientation: Enums.OrientationAxis.CORONAL,
				},
			},
		];

		this._renderingEngine = new RenderingEngine();
		this._renderingEngine.setViewports( viewportInputArray );

		let volumeId = 'cornerstoneStreamingImageVolume:' + this.parser._objectURL;
		this._volume = await volumeLoader.createAndCacheVolumeFromImages( volumeId, this._imageIds );

		this._volume.load( async () => {
			await setVolumesForViewports(
				this._renderingEngine,
				[{ volumeId }],
				viewportInputArray.map( v => v.viewportId )
			);

			this._viewports = {
				axial: this._renderingEngine.getViewport( 'nifti_ortho_axial' ),
				sagittal: this._renderingEngine.getViewport( 'nifti_ortho_sagittal' ),
				coronal: this._renderingEngine.getViewport( 'nifti_ortho_coronal' ),
			};
			this._renderingEngine.render();

			cb();
		} );
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
			this._controlGoto( 1 );
			slider.value = this._frameIndex + 1;

			this._timer = 0;
			this._playback( slider );
		}, this._frameTime + delay );
	}


	/**
	 *
	 * @private
	 */
	_updateControls() {
		if( this._counter ) {
			this._counter.textContent = ( this._frameIndex + 1 ) + '/' + this._numFrames;
		}

		if( this._slider ) {
			this._slider.value = this._frameIndex + 1;
		}
	}


	/**
	 *
	 */
	destroy() {
		super.destroy();

		this._renderingEngine?.destroy();
		this._volume?.destroy();

		this._renderingEngine = null;
		this._volume = null;
		this._viewports = null;

		clearTimeout( this._timer );
		document.body.removeEventListener( 'keyup', this._listenerKeyNav );
	}


	/**
	 *
	 * @param {function?} cb
	 */
	load( cb ) {
		this.parser.parse( async ( err, imageIds ) => {
			if( err ) {
				return;
			}

			this._imageIds = imageIds;
			this._numFrames = imageIds.length;

			this.buildMetaNode();
			this._buildControls();
			this._openWindow( {
				destroyOrder: [this, this.parser],
			} );

			cb?.();

			this._initViewport( () => {
				this._frameIndex = this._viewports.axial.getCurrentImageIdIndex();
				this._updateControls();
			} );
		} );
	}


	/**
	 *
	 * @param {number} delta
	 * @returns {number}
	 */
	showImage( delta ) {
		let newIndex = this._frameIndex + delta;

		if( newIndex >= this._numFrames ) {
			newIndex -= this._numFrames;
			delta -= this._numFrames;
		}
		else if( newIndex < 0 ) {
			newIndex += this._numFrames;
			delta += this._numFrames;
		}

		for( const key in this._viewports ) {
			const viewport = this._viewports[key];
			viewport.scroll( delta );
			viewport.render();
		}

		return newIndex;
	}


};
