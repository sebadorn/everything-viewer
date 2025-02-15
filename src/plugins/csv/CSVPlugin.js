import { CSVParser } from './CSVParser.js';
import { CSVView } from './CSVView.js';
import { Plugin, Priority } from '../Plugin.js';


export class CSVPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.ext === 'csv' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {CSVParser}
	 */
	getParser() {
		this._parser ??= new CSVParser( this._importData );
		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {CSVView}
	 */
	getView() {
		this._view ??= new CSVView( this.getParser() );
		return this._view;
	}


};
