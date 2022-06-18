'use strict';


{

class ImageView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'image' );

		this._objectURL = null;
	}


	/**
	 *
	 */
	destroy() {
		super.destroy();

		if( this._objectURL ) {
			URL.revokeObjectURL( this._objectURL );
		}
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		const image = new Image();

		image.onload = () => {
			image.height = image.naturalHeight;
			image.width = image.naturalWidth;

			this.mdAdd( 'Dimensions', image.naturalWidth + '×' + image.naturalHeight + ' px' );
			this.buildMetaNode();

			this.nodeView.append( image );
			cb();
		};

		image.onerror = () => {
			const note = document.createElement( 'p' );
			note.className = 'note';
			note.textContent = `Image format not supported: "${this.parser.mimeType}"`;

			this.buildMetaNode();

			this.nodeView.append( note );
			cb();
		};

		this._objectURL = URL.createObjectURL( this.parser.file );
		image.src = this._objectURL;
	}


}


Evy.UI.ImageView = ImageView;

}
