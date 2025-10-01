import { Plugin, Priority } from '../Plugin.js';


export class AIPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType === 'application/x-gguf' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<AIParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { AIParser } = await import(
			/* webpackChunkName: "aiparser" */
			'./AIParser.js'
		);

		this._parser = new AIParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<AIView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { AIView } = await import(
			/* webpackChunkName: "aiview" */
			'./AIView.js'
		);

		this._view = new AIView( await this.getParser() );

		return this._view;
	}


};
