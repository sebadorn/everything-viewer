'use strict';


Evy.CSVParser = class extends Evy.BaseParser {


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
	 * @param {function} cb
	 */
	parse( cb ) {
		this.getText( ( _err, text ) => {
			Evy.ensureScript( 'csv', () => {
				const tableData = CSV.parse( text );
				cb( null, tableData );
			} );
		} );
	}


}