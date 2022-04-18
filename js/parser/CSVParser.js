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
	getHTML( cb ) {
		this.getText( ( _err, text ) => {
			this.parse( text, table => {
				const html = this.buildHTML( table );
				cb( null, html );
			} );
		} );
	}


	/**
	 *
	 * @param {string}   text
	 * @param {function} cb
	 */
	parse( text, cb ) {
		Evy.ensureScript( 'csv', () => {
			const table = CSV.parse( text );
			cb( table );
		} );
	}


}


Evy.CSVParser = CSVParser;

}
