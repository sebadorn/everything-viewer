import { Plugin, Priority } from '../Plugin.js';


export class TorrentPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		if( fileInfo.ext === 'torrent' || fileInfo.mimeType === 'application/x-bittorrent' ) {
			return Priority.HIGH;
		}

		return Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<TorrentParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { TorrentParser } = await import(
			/* webpackChunkName: "torrentparser" */
			'./TorrentParser.js'
		);

		this._parser = new TorrentParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<TorrentView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { TorrentView } = await import(
			/* webpackChunkName: "torrentview" */
			'./TorrentView.js'
		);

		this._view = new TorrentView( await this.getParser() );

		return this._view;
	}


}