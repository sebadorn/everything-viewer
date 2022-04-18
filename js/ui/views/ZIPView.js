'use strict';


{

class ZIPView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.ZIPParser} parser
	 */
	constructor( parser ) {
		super( parser, 'zip' );
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.getHTML( ( err, html ) => {
			if( err ) {
				html = document.createElement( 'p' );
				html.className = 'note';
				html.textContent = err.message;
			}

			this.buildMetaNode();

			this.nodeView.append( html );

			cb();
		} );
	}


}


Evy.UI.ZIPView = ZIPView;

}
