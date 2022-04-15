'use strict';


{

class ImageView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.BaseParser} parser
	 */
	constructor( parser ) {
		super( parser );
		this.node.className += ' view-image';
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

			this.node.appendChild( image );
			cb();
		};

		image.src = URL.createObjectURL( this.parser.file );
	}


}


Evy.UI.ImageView = ImageView;

}
