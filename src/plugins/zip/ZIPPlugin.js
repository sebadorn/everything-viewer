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
	 * @returns {Promise<ZIPParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { ZIPParser } = await import(
			/* webpackChunkName: "zipparser" */
			'./ZIPParser.js'
		);

		this._parser = new ZIPParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<ZIPView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { ZIPView } = await import(
			/* webpackChunkName: "zipview" */
			'./ZIPView.js'
		);

		this._view = new ZIPView( await this.getParser() );

		return this._view;
	}


};
