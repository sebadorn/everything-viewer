'use strict';


Evy.UI.PDFView = class extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'pdf' );

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
		this._objectURL = URL.createObjectURL( this.parser.file );

		const iframe = document.createElement( 'iframe' );
		iframe.src = this._objectURL;

		this.buildMetaNode();

		this.nodeView.appendChild( iframe );

		cb();
	}


}