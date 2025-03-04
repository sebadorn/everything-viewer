import { BaseParser } from '../BaseParser.js';


export class Model3DParser extends BaseParser {


	/**
	 *
	 * @param {import('../plugins/Registry.js').ImportData} data
	 */
	constructor( data ) {
		super( data );
		this.ext = '.' + data.ext;
	}


};
