import { PDFView } from './PDFView.js';
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
	 * @returns {PDFView}
	 */
	getView() {
		this._view ??= new PDFView( this.getParser() );
		return this._view;
	}


};
