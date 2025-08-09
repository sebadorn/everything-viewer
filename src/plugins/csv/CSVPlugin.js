import { Plugin, Priority } from '../Plugin.js';


export class CSVPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.ext === 'csv' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<CSVParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { CSVParser } = await import(
			/* webpackChunkName: "csvparser" */
			'./CSVParser.js'
		);

		this._parser = new CSVParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<CSVView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { CSVView } = await import(
			/* webpackChunkName: "csvview" */
			'./CSVView.js'
		);

		this._view = new CSVView( await this.getParser() );

		return this._view;
	}


};
