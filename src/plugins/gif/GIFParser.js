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
	 * @param {function} cb
	 */
	parse( cb ) {
		this.getArrayBuffer( async ( _err, arrayBuffer ) => {
			const { GifReader } = await import( /* webpackChunkName: "omggif" */ 'omggif' );
			let gifReader = null;

			try {
				const uint8Buffer = new Uint8Array( arrayBuffer );
				gifReader = new GifReader( uint8Buffer );
			}
			catch( err ) {
				console.error( err );
				cb( err, null );

				return;
			}

			cb( null, gifReader );
		} );
	}


};
