import { DocumentUtils } from '../../DocumentUtils.js';
import { Utils } from '../../Utils.js';
import { BaseParser } from '../BaseParser.js';


export class MHTMLParser extends BaseParser {


	/**
	 *
	 * @param {import('../Registry.js').ImportData} importData
	 */
	constructor( importData ) {
		super( importData );

		this.blobs = {};
	}


	/**
	 *
	 * @private
	 * @param {object} meta
	 * @param {string} body
	 * @returns {*}
	 */
	_parseBodySection( meta, body ) {
		let encoding = Utils.getValueForKey( meta, 'Content-Transfer-Encoding' );

		if( typeof encoding !== 'string' ) {
			return body;
		}

		encoding = encoding.toLowerCase();

		if( encoding === 'quoted-printable' ) {
			return DocumentUtils.decodeContent( body );
		}

		if( encoding === 'base64' ) {
			const binary = window.atob( body.replaceAll( '\r\n', '' ) );
			const buffer = Uint8Array.from( binary, c => c.charCodeAt( 0 ) );

			return buffer;
		}

		return body;
	}


	/**
	 *
	 * @private
	 * @param {string} text
	 * @returns {object}
	 */
	_parseHeader( text ) {
		const boundaryNeedle = 'boundary="';
		const indexBoundaryStart = text.indexOf( boundaryNeedle );
		let boundary = text.substring( indexBoundaryStart + boundaryNeedle.length );
		const indexBoundaryEnd = boundary.indexOf( '"\r\n' );
		boundary = boundary.substring( 0, indexBoundaryEnd );

		const lines = text.substring( 0, indexBoundaryStart + boundaryNeedle.length + indexBoundaryEnd + 1 ).split( '\r\n' );
		const header = this._parseMetaSection( lines );
		header._boundary = boundary;

		return header;
	}


	/**
	 *
	 * @private
	 * @param {string[]} lines
	 * @returns {object}
	 */
	_parseMetaSection( lines ) {
		const meta = {};
		let lastKey = null;

		for( let i = 0; i < lines.length; i++ ) {
			const line = lines[i];

			if( line.trim().length === 0 ) {
				continue;
			}

			if( line.startsWith( '  ' ) || line.startsWith( '\t' ) ) {
				if( lastKey ) {
					meta[lastKey] += ' ' + line.trim();
				}

				continue;
			}

			const parts = line.split( ': ' );
			const key = parts[0];
			const value = parts.slice( 1 ).join( ': ' );

			meta[key] = value;
			lastKey = key;
		}

		return meta;
	}


	/**
	 *
	 */
	destroy() {
		for( const key in this.blobs ) {
			URL.revokeObjectURL( this.blobs[key] );
		}

		this.blobs = {};
	}


	/**
	 *
	 * @returns {Promise<object>}
	 */
	async parse() {
		/** @type {string} */
		const text = await this.file.text();

		const header = this._parseHeader( text );
		const parts = text.split( `--${header._boundary}` );

		const data = [];
		let html = '';

		for( let i = 1; i < parts.length - 1; i++ ) {
			const part = parts[i];
			const index = part.indexOf( '\r\n\r\n' );
			const head = part.substring( 0, index );
			const body = part.substring( index + 4 );

			const entry = {
				meta: this._parseMetaSection( head.split( '\r\n' ) ),
			};
			entry.body = this._parseBodySection( entry.meta, body );

			if( i === 1 ) {
				html = entry.body;
			}

			if( i > 1 ) {
				const location = Utils.getValueForKey( entry.meta, 'Content-Location' );

				if( location ) {
					const contentType = Utils.getValueForKey( entry.meta, 'Content-Type' );
					const blobData = new Blob( [entry.body], contentType ? { type: contentType } : null );

					entry.blob = URL.createObjectURL( blobData );
					this.blobs[location] = entry.blob;
				}
			}

			data.push( entry );
		}

		for( const location in this.blobs ) {
			const blobUrl = this.blobs[location];
			html = html.replaceAll( location, blobUrl );
		}

		const result = {
			meta: header,
			data: data,
			html: html,
		};

		console.debug( '[MHTMLParser.parse]', result );

		return result;
	}


};