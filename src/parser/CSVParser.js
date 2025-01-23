import { BaseParser } from './BaseParser.js';
import { parse as csvParse } from '@vanillaes/csv';


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
			const tableData = csvParse( text );
			cb( null, tableData );
		} );
	}


};
