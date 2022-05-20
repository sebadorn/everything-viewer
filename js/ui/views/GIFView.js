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

		this._canvas = null;
		this._ctx = null;
		this._frameIndex = 0;
		this._gifReader = null;
	}


	/**
	 *
	 * @private
	 * @return {HTMLElement}
	 */
	_buildSlideshow() {
		const node = Evy.UI.buildHTML( `
			<canvas class="frame"></canvas>
			<div class="actions">
				<button class="frame-prev">&larr;</button>
				<span class="counter"></span>
				<button class="frame-next">&rarr;</button>
			</div>
		` );

		this._frameIndex = 0;

		const btnPrev = node.querySelector( 'button.frame-prev' );
		btnPrev.addEventListener( 'click', _ev => this.showFrame( --this._frameIndex ) );

		const btnNext = node.querySelector( 'button.frame-next' );
		btnNext.addEventListener( 'click', _ev => this.showFrame( ++this._frameIndex ) );

		this._canvas = node.querySelector( 'canvas.frame' );
		this._ctx = this._canvas.getContext( '2d' );
		this._counter = node.querySelector( '.counter' );

		const w = this._gifReader.width;
		const h = this._gifReader.height;

		this._canvas.width = w;
		this._canvas.height = h;
		this._canvas.style.width = w + 'px';
		this._canvas.style.height = h + 'px';

		this.showFrame( this._frameIndex );

		return node;
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.parse( ( _err, gifReader ) => {
			this._gifReader = gifReader;

			this.metaData.Dimensions = gifReader.width + '×' + gifReader.height + ' px';
			this.metaData.Frames = gifReader.numFrames();
			this.buildMetaNode();

			const node = this._buildSlideshow( gifReader );
			this.nodeView.append( node );

			cb();
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

		this._frameIndex = index;

		const info = this._gifReader.frameInfo( index );
		const imgData = new ImageData( info.width, info.height );
		this._gifReader.decodeAndBlitFrameRGBA( index, imgData.data );

		console.log(index, info); // TODO: remove

		// TODO: handle "disposal"
		// 0/1: stack each frame, no clearing
		// 2: after showing the frame, clear canvas
		// 3: after showing the frame, restore to the previous canvas state
		// 4: ?
		// 5: ?
		//
		// TODO: this complicates stepping through the frames in reverse order

		const canvas = document.createElement( 'canvas' );
		canvas.width = info.width;
		canvas.height = info.height;

		const ctx = canvas.getContext( '2d' );
		ctx.putImageData( imgData, 0, 0 );

		this._ctx.drawImage( canvas, info.x, info.y );

		this._counter.textContent = ( index + 1 ) + '/' + numFrames;
	}


}


Evy.UI.GIFView = GIFView;

}
