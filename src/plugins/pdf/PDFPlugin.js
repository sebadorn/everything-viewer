import { Plugin, Priority } from '../Plugin.js';


export class PDFPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType === 'application/pdf' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<PDFView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { PDFView } = await import(
			/* webpackChunkName: "pdfview" */
			'./PDFView.js'
		);

		this._view = new PDFView( await this.getParser() );

		return this._view;
	}


};
