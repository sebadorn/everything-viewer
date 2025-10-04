import { BaseParser } from '../BaseParser.js';


export class CFBParser extends BaseParser {


	/**
	 *
	 * @param {import('../plugins/Registry.js').ImportData} data
	 */
	constructor( data ) {
		super( data );

		this._msg = null;
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
	 * @param {FieldsData} attachment
	 * @returns {HTMLElement?}
	 */
	getImage( attachment ) {
		if( !attachment || !String( attachment.attachMimeTag ).startsWith( 'image/' ) ) {
			return null;
		}

		const image = new Image();
		image.loading = 'lazy';
		image.onerror = err => console.error( '[CFBParser.getImage]', err );
		image.src = this.getObjectURL( attachment );

		return image;
	}


	/**
	 *
	 * @param {FieldsData} attachment 
	 * @returns {string}
	 */
	getObjectURL( attachment ) {
		const key = attachment.dataId;

		if( this._objectURLs[key] ) {
			return this._objectURLs[key];
		}

		const data = this._msg.getAttachment( attachment );

		return this._objectURLs[key] = URL.createObjectURL(
			new Blob( [data.content], { type: attachment.attachMimeTag } )
		);
	}


	/**
	 *
	 * @returns {Promise<MsgReader>}
	 */
	async parse() {
		const MsgReader = ( await import(
			/* webpackChunkName: "msgreader" */
			'@kenjiuno/msgreader'
		) ).default;

		const arrayBuffer = await this.getArrayBuffer();
		this._msg = new MsgReader( arrayBuffer );

		return this._msg;
	}


};
