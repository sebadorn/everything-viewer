import { BaseParser } from './BaseParser.js';
import { BaseView } from './BaseView.js';


export const Priority = {
	NONE: 0,
	LOW: 1,
	GENERIC: 50,
	HIGH: 100,
};


export class Plugin {


	/** @type {import('./Registry.js').ImportData?} */
	_importData = null;

	_parser = null;
	_view = null;


	/**
	 *
	 * @param {import('./Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return Priority.LOW;
	}


	/**
	 *
	 * @returns {Promise<BaseParser>}
	 */
	async getParser() {
		this._parser ??= new BaseParser( this._importData, !!this._importData?.dir );
		return this._parser;
	}


	/**
	 *
	 * @returns {Promise<BaseView>}
	 */
	async getView() {
		this._view ??= new BaseView( await this.getParser() );
		return this._view;
	}


	/**
	 *
	 * @param {import('./Registry.js').ImportData} data
	 */
	setImportData( data ) {
		this._parser = null;
		this._view = null;

		this._importData = data;
	}


};
