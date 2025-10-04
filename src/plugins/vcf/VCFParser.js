import { BaseParser } from '../BaseParser.js';


export class VCFParser extends BaseParser {


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
	 * @param {string} text
	 * @returns {string}
	 */
	static checkAndFixText( text ) {
		const lines = text.trim().split( '\n' );
		const newLines = [];

		let version = lines.find( line => line.startsWith( 'VERSION:' ) );

		if( version ) {
			version = version.substring( 'VERSION:'.length );
		}

		const needsMoreFixing = !version || version === '2.1';

		for( let i = 0; i < lines.length; i++ ) {
			let line = lines[i];

			const parts = line.split( ':' );
			parts[0] = parts[0].replaceAll( '#', '=' );

			const rest = parts.slice( 1 ).join( ':' );

			// ical.js does not support version 2.1.
			// Try to make the input compatible.
			if( needsMoreFixing ) {
				const firstProp = String( parts[0].split( ';' )[0] );

				if( firstProp.length < parts[0].length ) {
					let otherProps = parts[0].substring( firstProp.length + 1 );
					otherProps = 'TYPE=' + otherProps.replaceAll( ';', ',' );

					line = firstProp + ';' + otherProps + ':' + rest;
				}
			}
			else {
				if( parts.length > 1 ) {
					line = parts[0] + ':' + rest;
				}
			}

			newLines.push( line );
		}

		return newLines.join( '\n' );
	}


	/**
	 *
	 * @param {string} text
	 * @returns {Promise<any[]?>}
	 */
	async parse( text ) {
		text = VCFParser.checkAndFixText( text );

		const icaljs = ( await import(
			/* webpackChunkName: "ical.js" */
			'ical.js'
		) ).default;

		let data = null;

		try {
			data = icaljs.parse( text );
			console.debug( '[VFCParser.parse]', data );
		}
		catch( err ) {
			console.debug( text );
			console.error( '[VCFParser.parse]', err );
		}

		return data;
	}


};
