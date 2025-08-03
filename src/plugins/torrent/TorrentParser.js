import { BaseParser } from '../BaseParser.js';


export class TorrentParser extends BaseParser {


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
	 * @returns {object}
	 */
	async parse() {
		const parseTorrent = ( await import(
			/* webpackChunkName: "parse-torrent" */
			'parse-torrent'
		) ).default;

		let arrayBuffer = null;

		try {
			arrayBuffer = await this.getArrayBuffer();
		}
		catch( err ) {
			console.error( '[TorrentParser.parse]', err );
			throw err;
		}

		return parseTorrent( new Uint8Array( arrayBuffer ) );
	}


}