import { Plugin, Priority } from '../Plugin.js';


export class CFBPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType === 'application/x-cfb' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<CFBParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { CFBParser } = await import(
			/* webpackChunkName: "cfbparser" */
			'./CFBParser.js'
		);

		this._parser = new CFBParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<CFBView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { CFBView } = await import(
			/* webpackChunkName: "cfbview" */
			'./CFBView.js'
		);

		this._view = new CFBView( await this.getParser() );

		return this._view;
	}


};
