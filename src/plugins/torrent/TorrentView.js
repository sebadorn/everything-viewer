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
			'pieces',
		];

		const table = document.createElement( 'table' );
		table.classList.add( 'torrent-info' );

		for( const key in info ) {
			if( ignore.includes( key ) ) {
				continue;
			}

			let name = key;
			let value = info[key];

			if( name === 'length' ) {
				value = UI.formatSize( value ) + ` (${value} B)`;
			}

			if( Array.isArray( value ) ) {
				if( value.length === 0 ) {
					continue;
				}

				if( key === 'files' ) {
					value = this._buildFileTable( value );
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

			table.append( UI.buildTableRow( name, value ) );
		}

		return table;
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
