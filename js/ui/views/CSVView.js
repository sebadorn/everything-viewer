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
	 * @param  {array} data
	 * @return {?HTMLDocument}
	 */
	_buildHTML( data ) {
		const table = document.createElement( 'table' );

		for( let i = 0; i < data.length; i++ ) {
			const dataRow = data[i];
			const row = document.createElement( 'tr' );
			const tag = i === 0 ? 'th' : 'td';

			for( let j = 0; j < dataRow.length; j++ ) {
				const span = document.createElement( 'span' );
				span.textContent = dataRow[j];

				const cell = document.createElement( tag );
				cell.append( span );

				row.append( cell );
			}

			table.append( row );
		}

		return table;
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.parse( ( _err, tableData ) => {
			this.metaData.Columns = tableData.length > 0 ? tableData[0].length : 0;
			this.metaData.Rows = tableData.length;
			this.buildMetaNode();

			const html = this._buildHTML( tableData );
			this.nodeView.append( html );

			cb();
		} );
	}


}


Evy.UI.CSVView = CSVView;

}
