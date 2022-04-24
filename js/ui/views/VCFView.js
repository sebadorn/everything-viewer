'use strict';


{

class VCFView extends Evy.UI.BaseView {


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


Evy.UI.VCFView = VCFView;

}
