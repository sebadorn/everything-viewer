import { Button } from '../../ui/components/Button.js';
import { ButtonGroup } from '../../ui/components/ButtonGroup.js';
import { Icons } from '../../ui/Icons.js';
import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class GIFView extends BaseView {


	/**
	 *
	 * @param {GIFParser} parser
	 */
	constructor( parser ) {
		super( parser, 'gif' );

		this._currentCanvas = null;
		this._frameIndex = 0;
		this._frames = [];
		this._gifReader = null;
		this._listenerKeyNav = null;
	}


	/**
	 *
	 * @private
	 * @returns {HTMLElement}
	 */
	_buildActions() {
		const header = new ButtonGroup( [
			new Button( {
				text: 'Image',
				onClick: () => {
					const frames = this.nodeView.querySelector( '.content-frames' );
					frames.style.display = 'none';

					const image = this.nodeView.querySelector( '.content-image' );
					image.style.display = '';
				},
			} ),
			new Button( {
				text: 'Frames',
				classes: 'selected',
				onClick: () => {
					const frames = this.nodeView.querySelector( '.content-frames' );
					frames.style.display = '';

					const image = this.nodeView.querySelector( '.content-image' );
					image.style.display = 'none';
				},
			} ),
		] );

		return header.render();
	}


	/**
	 *
	 * @private
	 * @returns {HTMLElement}
	 */
	_buildImage() {
		const image = new Image();

		image.onerror = err => {
			console.error( '[GIFView._buildImage]', err );
		};

		this.parser.getBase64( ( _err, src ) => {
			image.src = src;
		} );

		const node = UI.build( '<div class="content-image"></div>' );
		node.style.display = 'none';
		node.append( image );

		return node;
	}


	/**
	 *
	 * @private
	 * @param {function} cb
	 */
	_buildSlideshow( cb ) {
		const numFrames = this._gifReader.numFrames();

		const node = UI.build( `
			<div class="content-frames">
				<div class="frame-container"></div>
				<div class="actions">
					<input type="range" min="1" max="${numFrames}" value="1" />
					<div class="line"></div>
				</div>
			</div>
		` );

		const btnPrev = new Button( {
			classes: 'frame-prev',
			icon: Icons.arrow_prev,
		} );

		const btnNext = new Button( {
			classes: 'frame-next',
			icon: Icons.arrow_next,
		} );

		node.querySelector( '.line' ).append(
			btnPrev.render(),
			UI.build( '<span class="counter"></span>' ),
			btnNext.render(),
		);

		this._frameIndex = 0;

		this._generateFrames( () => {
			const slider = node.querySelector( 'input[type="range"]' );
			slider.addEventListener( 'input', ev => {
				this._frameIndex = ev.target.valueAsNumber - 1;
				this.showFrame( this._frameIndex );
			} );

			btnPrev.on( 'click', _ev => {
				this.showFrame( --this._frameIndex );
				slider.value = this._frameIndex + 1;
			} );

			btnNext.on( 'click', _ev => {
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

			cb( node );
		} );
	}


	/**
	 * Generate a frame. Make sure to generate them in order
	 * because of the "disposal" handling of frames.
	 * @private
	 * @param {number}   index
	 * @param {function} cb
	 */
	_generateFrame( index, cb ) {
		const imgWidth = this._gifReader.width;
		const imgHeight = this._gifReader.height;

		const newCanvas = document.createElement( 'canvas' );
		newCanvas.width = imgWidth;
		newCanvas.height = imgHeight;
		newCanvas.style.width = imgWidth + 'px';
		newCanvas.style.height = imgHeight + 'px';

		const newCtx = newCanvas.getContext( '2d' );

		// First frame.
		if( index === 0 ) {
			const imgData = new ImageData( imgWidth, imgHeight );
			this._lastNonDisposedImgData = imgData;
			this._gifReader.decodeAndBlitFrameRGBA( index, imgData.data );

			newCtx.putImageData( imgData, 0, 0 );
			cb( newCanvas );

			return;
		}

		const prevInfo = this._gifReader.frameInfo( index - 1 );
		let imgData = null;

		// 1: Draw over previous canvas.
		// 3: Use the last canvas before the "disposal=3" frames.
		if( prevInfo.disposal <= 1 || prevInfo.disposal === 3 ) {
			const data = Uint8ClampedArray.from( this._lastNonDisposedImgData.data );
			imgData = new ImageData( data, imgWidth, imgHeight );
		}
		// 2: Clear before drawing. => Start with a clear canvas.
		// 4-7: undefined behaviour
		else {
			imgData = new ImageData( imgWidth, imgHeight );
		}

		this._gifReader.decodeAndBlitFrameRGBA( index, imgData.data );

		const info = this._gifReader.frameInfo( index );

		if( info.disposal <= 1 ) {
			this._lastNonDisposedImgData = imgData;
		}

		newCtx.putImageData( imgData, 0, 0 );

		cb( newCanvas );
	}


	/**
	 *
	 * @private
	 * @param {function} cb
	 */
	_generateFrames( cb ) {
		const numFrames = this._gifReader.numFrames();

		const next = i => {
			if( i >= numFrames ) {
				cb();
				return;
			}

			this._generateFrame( i, frame => {
				this._frames.push( frame );
				next( i + 1 );
			} );
		};

		next( 0 );
	}


	/**
	 *
	 */
	destroy() {
		super.destroy();

		document.body.removeEventListener( 'keyup', this._listenerKeyNav );
	}


	/**
	 *
	 * @param {function?} cb
	 */
	load( cb ) {
		this.parser.parse( ( _err, gifReader ) => {
			this._gifReader = gifReader;

			this.mdAdd( 'Dimensions', gifReader.width + '×' + gifReader.height + ' px' );
			this.mdAdd( 'Frames', gifReader.numFrames() );
			this.buildMetaNode();

			this._buildSlideshow( node => {
				this.nodeView.append(
					this._buildActions(),
					this._buildImage(),
					node,
				);

				this.showFrame( this._frameIndex );
				this._openWindow();

				cb?.();
			} );
		} );
	}


	/**
	 *
	 * @param {number} index
	 */
	showFrame( index ) {
		const numFrames = this._gifReader.numFrames();

		if( index >= numFrames ) {
			index = 0;
		}
		else if( index < 0 ) {
			index = numFrames - 1;
		}

		if( this._currentCanvas ) {
			this._currentCanvas.remove();
		}

		this._frameIndex = index;
		this._currentCanvas = this._frames[index];

		const container = this.nodeView.querySelector( '.frame-container' );
		container.append( this._currentCanvas );

		this._counter.textContent = ( index + 1 ) + '/' + numFrames;
	}


};
