import { CFBParser } from './CFBParser.js';
import { CFBView } from './CFBView.js';
import { Plugin, Priority } from '../Plugin.js';


export class CFBPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType === 'application/x-cfb' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {CFBParser}
	 */
	getParser() {
		this._parser ??= new CFBParser( this._importData );
		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {CFBView}
	 */
	getView() {
		this._view ??= new CFBView( this.getParser() );
		return this._view;
	}


};
