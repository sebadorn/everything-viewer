import { NIFTIParser } from './NIFTIParser.js';
import { NIFTIView } from './NIFTIView.js';
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
	 * @returns {NIFTIParser}
	 */
	getParser() {
		this._parser ??= new NIFTIParser( this._importData );
		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {NIFTIView}
	 */
	getView() {
		this._view ??= new NIFTIView( this.getParser() );
		return this._view;
	}


};
