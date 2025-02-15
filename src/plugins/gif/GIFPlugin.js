import { GIFParser } from './GIFParser.js';
import { GIFView } from './GIFView.js';
import { Plugin, Priority } from '../Plugin.js';


export class GIFPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType === 'image/gif' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {GIFParser}
	 */
	getParser() {
		this._parser ??= new GIFParser( this._importData );
		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {GIFView}
	 */
	getView() {
		this._view ??= new GIFView( this.getParser() );
		return this._view;
	}


};
