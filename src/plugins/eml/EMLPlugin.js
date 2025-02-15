import { EMLParser } from './EMLParser.js';
import { EMLView } from './EMLView.js';
import { Plugin, Priority } from '../Plugin.js';


export class EMLPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.ext === 'eml' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {EMLParser}
	 */
	getParser() {
		this._parser ??= new EMLParser( this._importData );
		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {EMLView}
	 */
	getView() {
		this._view ??= new EMLView( this.getParser() );
		return this._view;
	}


};
