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
	 * @returns {Promise<any[]>}
	 */
	async parse() {
		const text = await this.getText();

		const { parse } = await import(
			/* webpackChunkName: "csv" */
			'@vanillaes/csv'
		);

		return parse( text );
	}


};
