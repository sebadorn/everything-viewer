import { Plugin, Priority } from '../Plugin.js';


export class AIPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return [
			'application/x-gguf',
			'application/x-safetensors',
		].includes( fileInfo.mimeType ) ? Priority.HIGH : Priority.NONE;
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


/**
 * @typedef {object} AIModelInfo
 * @property {string} type
 * @property {number?} version
 * @property {number?} tensor_count
 * @property {number?} metadata_kv_count
 * @property {object?} metadata
 * @property {object[]?} tensors
 */
