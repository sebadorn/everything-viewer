import { DocumentUtils } from '../../DocumentUtils.js';
import { BaseParser } from '../BaseParser.js';


export class EMLParser extends BaseParser {


	/**
	 *
	 * @param {import('../Registry.js').ImportData} data
	 */
	constructor( data ) {
		super( data );

		this._lastParsed = null;
		this._objectURLs = {};
	}


	/**
	 *
	 */
	destroy() {
		for( const dataId in this._objectURLs ) {
			URL.revokeObjectURL( this._objectURLs[dataId] );
		}

		this._objectURLs = {};
	}


	/**
	 *
	 * @param {object}   options
	 * @param {boolean} [options.remove_external = true]
	 * @returns {Promise<object>}
	 */
	async getBodyDOM( options ) {
		if( !options ) {
			options = {};
		}

		if( typeof options.remove_external !== 'boolean' ) {
			options.remove_external = true;
		}

		if( this._lastParsed ) {
			let type = 'plaintext';
			let doc = null;

			if( this._lastParsed.html ) {
				doc = DocumentUtils.buildDocument( this._lastParsed.html );
				type = 'html';
			}
			else {
				doc = DocumentUtils.buildDocument( `<pre>${this._lastParsed.text}</pre>` );
			}

			if( doc && options.remove_external ) {
				DocumentUtils.removeExternalResources( doc );
			}

			return {
				type: type,
				dom: doc,
			};
		}

		await this.parse();

		if( !this._lastParsed ) {
			throw new Error( 'Failed to parse' );
		}

		return this.getBodyDOM( options );
	}


	/**
	 *
	 * @param {import('mailparser').Attachment} attachment
	 * @returns {HTMLElement?}
	 */
	getImage( attachment ) {
		if( !attachment || !String( attachment.contentType ).startsWith( 'image/' ) ) {
			return null;
		}

		const image = new Image();
		image.loading = 'lazy';
		image.onerror = err => console.error( '[EMLParser.getImage]', err );
		image.src = this.getObjectURL( attachment );

		return image;
	}


	/**
	 *
	 * @param {import('mailparser').Attachment} attachment 
	 * @returns {string}
	 */
	getObjectURL( attachment ) {
		const key = attachment.cid;

		if( this._objectURLs[key] ) {
			return this._objectURLs[key];
		}

		return this._objectURLs[key] = URL.createObjectURL(
			new Blob( [attachment.content], { type: attachment.contentType } )
		);
	}


	/**
	 *
	 * @returns {import('mailparser').ParsedMail}
	 */
	async parse() {
		if( this._lastParsed ) {
			return this._lastParsed;
		}

		const simpleParser = ( await import(
			/* webpackChunkName: "mailparser" */
			'mailparser'
		) ).simpleParser;

		this._lastParsed = await simpleParser( await this.getText() );
		console.debug( '[EMLParser.parse]', this._lastParsed );

		return this._lastParsed;
	}


};
