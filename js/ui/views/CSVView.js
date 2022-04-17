'use strict';


{

class CSVView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.CSVParser} parser
	 */
	constructor( parser ) {
		super( parser, 'csv' );
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


Evy.UI.CSVView = CSVView;

}
