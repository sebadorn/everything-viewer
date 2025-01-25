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
		this.getText( async ( _err, text ) => {
			const { parse } = await import( /* webpackChunkName: "csv" */ '@vanillaes/csv' );
			const tableData = parse( text );
			cb( null, tableData );
		} );
	}


};
