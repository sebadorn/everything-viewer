import { BaseParser } from './BaseParser.js';


export class CSVParser extends BaseParser {


	/**
	 *
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


};
