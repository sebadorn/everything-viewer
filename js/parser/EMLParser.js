'use strict';


{

class EMLParser extends Evy.BaseParser {


	/**
	 *
	 * @constructor
	 * @param {File}   file
	 * @param {string} mimeType
	 */
	constructor( file, mimeType ) {
		super( file, mimeType );

		this._lastParsed = null;
	}


	/**
	 *
	 * @param  {string}   body
	 * @param  {object}   options
	 * @param  {boolean} [options.remove_external = true]
	 * @return {?HTMLDocument}
	 */
	buildBodyDOM( body, options ) {
		if( !body ) {
			return null;
		}

		if( !options ) {
			options = {};
		}

		if( typeof options.remove_external !== 'boolean' ) {
			options.remove_external = true;
		}

		let html = body;
		html = html.replaceAll( /=[\r]?\n/g, '' );
		html = html.replaceAll( /(=[0-9A-Z]{2})+/g, match => {
			try {
				return decodeURIComponent( match.replaceAll( '=', '%' ) );
			}
			catch( err ) {
				console.error( err, match );
				return match;
			}
		} );

		const domParser = new DOMParser();
		const doc = domParser.parseFromString( html, 'text/html' );

		// Try to remove or disable everything that loads external resources.
		if( options.remove_external ) {
			// Remove src of images, except if the data is inlined.
			const images = doc.querySelectorAll( 'img' );
			images.forEach( img => {
				const src = img.getAttribute( 'src' ) || '';

				if( !src.startsWith( 'data:' ) ) {
					img.removeAttribute( 'src' );
				}
			} );

			// Remove certain elements completely.
			const toRemove = doc.querySelectorAll( [
				'audio[src]',
				'embed',
				'iframe',
				'link[rel="stylesheet"]',
				'object',
				'script',
				'source',
				'video[src]'
			].join( ',' ) );
			toRemove.forEach( node => node.remove() );

			// Remove certain attributes.
			const attr = doc.querySelectorAll( '[background]' );
			attr.forEach( node => {
				const value = node.getAttribute( 'background' ) || '';

				if( value.includes( '//' ) ) {
					node.removeAttribute( 'background' );
				}
			} );

			// Styles
			const styles = doc.querySelectorAll( 'style' );
			styles.forEach( node => {
				let style = node.textContent;
				style = style.replaceAll( /url[ \t]*\([ \t]*.+[ \t]*\)/gi, 'url()' );
				node.textContent = style;
			} );
		}

		return doc;
	}


	/**
	 *
	 * @param  {object[]} headers
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
		if( this._lastParsed ) {
			const dom = this.buildBodyDOM( this._lastParsed.body, options );

			cb( null, dom );
		}
		else {
			this.getText( ( _err, text ) => {
				const data = this.parse( text );
				const dom = this.buildBodyDOM( data.body, options );

				cb( null, dom );
			} );
		}
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
	 * @return {?object}
	 */
	parse( text ) {
		text = text.trimStart();
		let textParts = text.split( '\r\n\r\n' );

		if( textParts.length !== 2 ) {
			textParts = text.split( '\n\n' );
		}

		if( textParts.length !== 2 ) {
			return null;
		}

		const textHeaders = textParts[0].trim();
		const textBody = textParts[1];

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


}


Evy.EMLParser = EMLParser;

}
