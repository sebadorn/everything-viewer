'use strict';


Evy.UI.VCFView = class extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'vcf' );
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.getHTML( ( _err, html ) => {
			this.buildMetaNode();

			this.nodeView.append( html );

			cb();
		} );
	}


}