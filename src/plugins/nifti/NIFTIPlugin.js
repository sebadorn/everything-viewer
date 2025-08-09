import { Plugin, Priority } from '../Plugin.js';


export class NIFTIPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('./Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType === 'application/x-nifti' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<NIFTIParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { NIFTIParser } = await import(
			/* webpackChunkName: "niftiparser" */
			'./NIFTIParser.js'
		);

		this._parser = new NIFTIParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<NIFTIView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { NIFTIView } = await import(
			/* webpackChunkName: "niftiview" */
			'./NIFTIView.js'
		);

		this._view = new NIFTIView( await this.getParser() );

		return this._view;
	}


};
