import { Plugin, Priority } from '../Plugin.js';


export class EMLPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.ext === 'eml' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<EMLParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { EMLParser } = await import(
			/* webpackChunkName: "emlparser" */
			'./EMLParser.js'
		);

		this._parser = new EMLParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<EMLView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { EMLView } = await import(
			/* webpackChunkName: "emlview" */
			'./EMLView.js'
		);

		this._view = new EMLView( await this.getParser() );

		return this._view;
	}


};
