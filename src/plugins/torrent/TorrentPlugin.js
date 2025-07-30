import { TorrentParser } from './TorrentParser.js';
import { TorrentView } from './TorrentView.js';
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
	 * @returns {TorrentParser}
	 */
	getParser() {
		this._parser ??= new TorrentParser( this._importData );
		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {TorrentView}
	 */
	getView() {
		this._view ??= new TorrentView( this.getParser() );
		return this._view;
	}


}