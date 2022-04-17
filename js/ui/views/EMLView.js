'use strict';


{

class EMLView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.EMLParser} parser
	 */
	constructor( parser ) {
		super( parser, 'eml' );
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		const iframe = document.createElement( 'iframe' );
		iframe.setAttribute( 'sandbox', '' );

		this.parser.getBodyDOM( ( _err, dom ) => {
			this.parser.getHeadersHTML( ( _err, headers ) => {
				this.buildMetaNode();

				iframe.setAttribute( 'srcdoc', dom.documentElement.outerHTML );
				this.nodeView.append( headers, iframe );

				cb();
			} );
		} );
	}


}


Evy.UI.EMLView = EMLView;

}
