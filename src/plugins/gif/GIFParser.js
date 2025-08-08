import { BaseParser } from '../BaseParser.js';


export class GIFParser extends BaseParser {


	/**
	 *
	 * @param {import('../plugins/Registry.js').ImportData} data
	 */
	constructor( data ) {
		super( data );
	}


	/**
	 *
	 * @returns {Promise<GifReader>}
	 */
	async parse() {
		const arrayBuffer = await this.getArrayBuffer();
		const { GifReader } = await import(
			/* webpackChunkName: "omggif" */
			'omggif'
		);
		let gifReader = null;

		try {
			const uint8Buffer = new Uint8Array( arrayBuffer );
			gifReader = new GifReader( uint8Buffer );
		}
		catch( err ) {
			console.error( '[GIFParser.parse]', err );
			throw err;
		}

		return gifReader;
	}


};
