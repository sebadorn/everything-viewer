'use strict';


{

class GIFView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.GIFParser} parser
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
	 * @param {function} cb
	 */
	_buildSlideshow( cb ) {
		const numFrames = this._gifReader.numFrames();

		const node = Evy.UI.buildHTML( `
			<div class="frame-container"></div>
			<div class="actions">
				<input type="range" min="1" max="${numFrames}" value="1" />
				<div class="line">
					<button class="frame-prev">&larr;</button>
					<span class="counter"></span>
					<button class="frame-next">&rarr;</button>
				</div>
			</div>
		` );

		this._frameIndex = 0;

		this._generateFrames( () => {
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
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.parse( ( _err, gifReader ) => {
			this._gifReader = gifReader;

			this.mdAdd( 'Dimensions', gifReader.width + '×' + gifReader.height + ' px' );
			this.mdAdd( 'Frames', gifReader.numFrames() );
			this.buildMetaNode();

			this._buildSlideshow( node => {
				this.nodeView.append( node );
				this.showFrame( this._frameIndex );
				cb();
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


}


Evy.UI.GIFView = GIFView;

}
