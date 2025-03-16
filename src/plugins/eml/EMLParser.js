import { DocumentUtils } from '../../DocumentUtils.js';
import { BaseParser } from '../BaseParser.js';


export class EMLParser extends BaseParser {


	/**
	 *
	 * @param {import('../plugins/Registry.js').ImportData} data
	 */
	constructor( data ) {
		super( data );

		this._lastParsed = null;
	}


	/**
	 *
	 * @param {object[]} headers
	 * @return {HTMLElement}
	 */
	buildHeadersHTML( headers ) {
		const table = document.createElement( 'table' );

		headers.forEach( header => {
			const name = document.createElement( 'th' );
			name.className = 'header-name';
			name.textContent = header.name;

			const value = document.createElement( 'td' );
			value.className = 'header-value';
			value.textContent = header.value;

			const row = document.createElement( 'tr' );
			row.append( name, value );

			table.append( row );
		} );

		const container = document.createElement( 'div' );
		container.className = 'headers';
		container.append( table );

		return container;
	}


	/**
	 *
	 * @param {object}   options
	 * @param {boolean} [options.remove_external = true]
	 * @param {function} cb
	 */
	getBodyDOM( options, cb ) {
		if( !options ) {
			options = {};
		}

		if( typeof options.remove_external !== 'boolean' ) {
			options.remove_external = true;
		}

		if( this._lastParsed ) {
			let body = DocumentUtils.decodeContent( this._lastParsed.body );
			let doc = null;

			let contentType = this.getHeader( this._lastParsed.headers, 'content-type' ) || '';
			contentType = contentType.toLowerCase();

			let type = 'plaintext';

			if( contentType.startsWith( 'text/html' ) ) {
				doc = DocumentUtils.buildDocument( body );
				type = 'html';
			}
			else {
				doc = DocumentUtils.buildDocument( `<pre>${body}</pre>` );
			}

			if( doc && options.remove_external ) {
				DocumentUtils.removeExternalResources( doc );
			}

			cb( null, doc, type );
		}
		else {
			this.getText( ( _err, text ) => {
				this.parse( text );

				if( this._lastParsed ) {
					this.getBodyDOM( options, cb );
				}
				else {
					cb( new Error( 'Failed to parse' ), null, null );
				}
			} );
		}
	}


	/**
	 * 
	 * @param {object[]} headers 
	 * @param {string}   key 
	 * @returns {string?}
	 */
	getHeader( headers, key ) {
		headers = headers || {};

		for( const header of headers ) {
			if( header.name.toLowerCase() === key ) {
				return header.value;
			}
		}

		return null;
	}


	/**
	 *
	 * @param {function} cb
	 */
	getHeadersHTML( cb ) {
		if( this._lastParsed ) {
			const html = this.buildHeadersHTML( this._lastParsed.headers );

			cb( null, html );
		}
		else {
			this.getText( ( _err, text ) => {
				const data = this.parse( text );
				const html = this.buildHeadersHTML( data.headers );

				cb( null, html );
			} );
		}
	}


	/**
	 *
	 * @param  {string} text
	 * @return {object?}
	 */
	parse( text ) {
		this._lastParsed = null;

		text = text.trimStart();
		let textParts = text.split( '\r\n\r\n' );

		if( textParts.length !== 2 ) {
			textParts = text.split( '\n\n' );
		}

		if( textParts.length < 2 ) {
			return null;
		}

		const textHeaders = textParts.splice( 0, 1 )[0].trim();
		const textBody = textParts.join( '\n\n' );

		const data = {
			headers: [],
			body: textBody
		};

		let currentKey = null;
		let currentValue = null;
		let startNewPair = true;

		let lines = textHeaders.split( '\r\n' );

		if( lines.length === 1 ) {
			lines = textHeaders.split( '\n' );
		}

		for( const line of lines ) {
			// Continuing a multi-line value.
			if(
				line.startsWith( ' ' ) ||
				line.startsWith( '\t' )
			) {
				currentValue += line.trimStart();
				startNewPair = false;
			}
			// Key and value have been set.
			else if( currentKey ) {
				data.headers.push( {
					name: currentKey,
					value: currentValue
				} );

				startNewPair = true;
			}

			// Starting a new key-value pair.
			if( startNewPair ) {
				const parts = line.split( ': ' );
				currentKey = parts[0];
				currentValue = parts.slice( 1 ).join( ': ' );
			}
		}

		if( currentKey ) {
			data.headers.push( {
				name: currentKey,
				value: currentValue
			} );
		}

		this._lastParsed = data;

		return data;
	}


};
