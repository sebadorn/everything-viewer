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
		this.parser.getHTML( ( _err, html, tableData ) => {
			this.metaData.Columns = tableData.length > 0 ? tableData[0].length : 0;
			this.metaData.Rows = tableData.length;
			this.buildMetaNode();

			this.nodeView.append( html );

			cb();
		} );
	}


}


Evy.UI.CSVView = CSVView;

}
