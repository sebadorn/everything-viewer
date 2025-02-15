import { ICalParser } from './ICalParser.js';
import { ICalView } from './ICalView.js';
import { Plugin, Priority } from '../Plugin.js';


export class ICalPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		if(
			fileInfo.mimeType === 'text/calendar' ||
			['ical', 'ics', 'ifb', 'vcs'].includes( fileInfo.ext )
		) {
			return Priority.HIGH;
		}

		return Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {ICalParser}
	 */
	getParser() {
		this._parser ??= new ICalParser( this._importData );
		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {ICalView}
	 */
	getView() {
		this._view ??= new ICalView( this.getParser() );
		return this._view;
	}


};
