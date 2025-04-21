import { ZIPParser } from './ZIPParser.js';
import { ZIPView } from './ZIPView.js';
import { Plugin, Priority } from '../Plugin.js';


export class ZIPPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		const exts = [
			'apk',
			'xapk',
			'zip',
		];

		return ( fileInfo.mimeType === 'application/zip' || exts.includes( fileInfo.ext ) ) ? Priority.GENERIC : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {ZIPParser}
	 */
	getParser() {
		this._parser ??= new ZIPParser( this._importData );
		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {ZIPView}
	 */
	getView() {
		this._view ??= new ZIPView( this.getParser() );
		return this._view;
	}


};
