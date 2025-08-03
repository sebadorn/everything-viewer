import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class TorrentView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'torrent' );
	}


	/**
	 *
	 * @private
	 * @param {object} info
	 * @returns {HTMLElement}
	 */
	_build( info ) {
		const ignore = [
			'info',
			'infoBuffer',
			'infoHashBuffer',
			'lastPieceLength',
			'pieceLength',
		];

		const list = document.createElement( 'ul' );
		list.classList.add( 'torrent-info' );

		for( const key in info ) {
			if( ignore.includes( key ) ) {
				continue;
			}

			let value = info[key];
			let options = {};

			if( key === 'length' ) {
				const formattedSize = UI.formatSize( value );
				value = `${value} B <span class="icon">arrow_right_alt</span> ${formattedSize}`;
				options.asHTML = true;
			}
			else if( key === 'infoHash' ) {
				value = 'SHA1: ' + value;
			}

			if( Array.isArray( value ) ) {
				if( value.length === 0 ) {
					continue;
				}

				if( key === 'files' ) {
					value = this._buildFileTable( value );
				}
				else if( key === 'pieces' ) {
					const textarea = document.createElement( 'textarea' )
					textarea.setAttribute( 'readonly', 'readonly' );
					textarea.value = value.join( '\n' );
					value = textarea;
				}
				else {
					value = UI.buildListOrdered( value );
				}
			}
			else if( typeof value === 'string' ) {
				if( value.length === 0 ) {
					continue;
				}
			}

			const item = this._buildItem( key, value, options );
			list.append( item );
		}

		return list;
	}


	/**
	 *
	 * @private
	 * @param {object[]} files 
	 * @returns {HTMLElement}
	 */
	_buildFileTable( files ) {
		const table = UI.build( `
			<table class="files">
				<thead>
					<tr>
						<th class="file-name">Name</th>
						<th class="file-path">Path</th>
						<th class="file-size">Size</th>
						<th class="file-offset">Offset</th>
					</tr>
				</thead>
			</table>
		` );

		const body = document.createElement( 'tbody' );

		for( let i = 0; i < files.length; i++ ) {
			const file = files[i];

			const cellName = document.createElement( 'td' );
			cellName.classList.add( 'file-name' );
			cellName.textContent = file.name;

			const cellPath = document.createElement( 'td' );
			cellPath.classList.add( 'file-path' );
			cellPath.textContent = file.path;

			const cellSize = document.createElement( 'td' );
			cellSize.classList.add( 'file-size' );
			cellSize.textContent = UI.formatSize( file.length );
			cellSize.setAttribute( 'title', file.length + ' B' );

			const cellOffset = document.createElement( 'td' );
			cellOffset.classList.add( 'file-offset' );
			cellOffset.textContent = UI.formatSize( file.offset );
			cellOffset.setAttribute( 'title', file.offset + ' B' );

			const row = document.createElement( 'tr' );
			row.append( cellName, cellPath, cellSize, cellOffset );

			body.append( row );
		}

		table.append( body );

		return table;
	}


	/**
	 *
	 * @private
	 * @param {string}             key
	 * @param {string|HTMLElement} value
	 * @param {object}             options
	 * @param {boolean?}           options.asHTML
	 * @returns {HTMLLIElement}
	 */
	_buildItem( key, value, options ) {
		const header = document.createElement( 'div' );
		header.classList.add( 'name' );
		header.textContent = this._getTitle( key );

		const body = document.createElement( 'div' );
		body.classList.add( 'value' );

		if( value instanceof HTMLElement ) {
			body.append( value );
		}
		else if( options.asHTML ) {
			body.innerHTML = value;
		}
		else {
			body.textContent = value;
		}

		const item = document.createElement( 'li' );
		item.classList.add( 'torrent-info-item', `key-${key}` );
		item.append( header, body );

		return item;
	}


	/**
	 *
	 * @private
	 * @param {string} key
	 * @returns {string}
	 */
	_getTitle( key ) {
		const map = {
			announce: 'Announce / Tracker URLs',
			comment: 'Comment',
			created: 'Created',
			createdBy: 'Created By',
			files: 'Files',
			infoHash: 'Info Hash',
			length: 'Size',
			name: 'Name',
			pieces: 'Pieces',
		};

		return map[key] || key;
	}


	/**
	 *
	 * @param {function?} cb
	 */
	async load( cb ) {
		const info = await this.parser.parse();
		console.debug( '[TorrentView.load]', info );

		this.buildMetaNode();
		this.nodeView.append( this._build( info ) );
		this._openWindow();

		cb?.();
	}


};
