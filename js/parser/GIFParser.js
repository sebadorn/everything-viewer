import { Evy } from '../Evy.js';
import { BaseParser } from './BaseParser.js';


export class GIFParser extends BaseParser {


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
		this.getArrayBuffer( ( _err, arrayBuffer ) => {
			Evy.ensureScript( 'omggif', () => {
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
		} );
	}


};
