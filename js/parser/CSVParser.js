'use strict';


{

class CSVParser extends Evy.BaseParser {


	/**
	 *
	 * @constructor
	 * @param {File}   file
	 * @param {string} mimeType
	 */
	constructor( file, mimeType ) {
		super( file, mimeType );
	}


	/**
	 *
	 * @param  {array} data
	 * @return {?HTMLDocument}
	 */
	buildHTML( data ) {
		const table = document.createElement( 'table' );

		for( let i = 0; i < data.length; i++ ) {
			const dataRow = data[i];
			const row = document.createElement( 'tr' );
			const tag = i === 0 ? 'th' : 'td';

			for( let j = 0; j < dataRow.length; j++ ) {
				const cell = document.createElement( tag );
				cell.textContent = dataRow[j];

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
	getHTML( cb ) {
		this.getText( ( _err, text ) => {
			const table = this.parse( text );
			const html = this.buildHTML( table );

			cb( null, html );
		} );
	}


	/**
	 *
	 * @param  {string} text
	 * @return {array}
	 */
	parse( text ) {
		const table = CSV.parse( text );

		return table;
	}


}


Evy.CSVParser = CSVParser;

}
