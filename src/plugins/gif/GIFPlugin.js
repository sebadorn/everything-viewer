import { Plugin, Priority } from '../Plugin.js';


export class GIFPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType === 'image/gif' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<GIFParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { GIFParser } = await import(
			/* webpackChunkName: "gifparser" */
			'./GIFParser.js'
		);

		this._parser = new GIFParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<GIFView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { GIFView } = await import(
			/* webpackChunkName: "gifview" */
			'./GIFView.js'
		);

		this._view = new GIFView( await this.getParser() );

		return this._view;
	}


};
