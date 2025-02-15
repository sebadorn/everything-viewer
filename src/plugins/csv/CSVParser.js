import { BaseParser } from '../BaseParser.js';


export class CSVParser extends BaseParser {


	/**
	 *
	 * @param {import('../plugins/Registry.js').ImportData} data
	 */
	constructor( data ) {
		super( data );
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
