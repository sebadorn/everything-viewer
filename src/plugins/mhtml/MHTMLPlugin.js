import { Plugin, Priority } from '../Plugin.js';


export class MHTMLPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		if( ['mht', 'mhtml'].includes( fileInfo.ext ) ) {
			return Priority.HIGH;
		}

		return Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<MHTMLParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { MHTMLParser } = await import(
			/* webpackChunkName: "mhtmlparser" */
			'./MHTMLParser.js'
		);

		this._parser ??= new MHTMLParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<MHTMLView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { MHTMLView } = await import(
			/* webpackChunkName: "mhtmlview" */
			'./MHTMLView.js'
		);

		this._view = new MHTMLView( await this.getParser() );

		return this._view;
	}


};
