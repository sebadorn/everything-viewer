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
	 * @returns {Promise<ICalParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { ICalParser } = await import(
			/* webpackChunkName: "icalparser" */
			'./ICalParser.js'
		);

		this._parser ??= new ICalParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<ICalView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { ICalView } = await import(
			/* webpackChunkName: "icalview" */
			'./ICalView.js'
		);

		this._view = new ICalView( await this.getParser() );

		return this._view;
	}


};
