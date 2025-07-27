import { FileHandler } from '../../FileHandler.js';
import { UI } from '../../ui/UI.js';
import { BaseParser } from '../BaseParser.js';


export class ZIPParser extends BaseParser {


	/**
	 *
	 * @param {File}   file
	 * @param {string} mimeType
	 */
	constructor( file, mimeType ) {
		super( file, mimeType );
	}


	/**
	 *
	 * @param  {JSZip} zip
	 * @return {HTMLElement}
	 */
	build( zip ) {
		const table = document.createElement( 'table' );
		table.className = 'zip';

		const name = document.createElement( 'th' );
		name.className = 'name';
		name.textContent = 'Name';

		const size = document.createElement( 'th' );
		size.className = 'size';
		size.textContent = 'Size';

		const date = document.createElement( 'th' );
		date.className = 'date';
		date.textContent = 'Date';

		const headRow = document.createElement( 'tr' );
		headRow.className = 'head';
		headRow.append( name, size, date );

		table.append( headRow );

		this.uncompressedSize = 0;

		for( const key in zip.files ) {
			const file = zip.files[key];

			let fileName = file.name;
			let depth = ( file.name.match( /\//g ) || [] ).length;

			if( file.dir ) {
				depth--;
				fileName = fileName.split( '/' ).slice( -2, -1 ) + '/';
			}
			else {
				fileName = fileName.split( '/' ).pop();
			}

			const levelIndent = '··'.repeat( depth );

			const indent = document.createElement( 'span' );
			indent.className = 'indent';
			indent.textContent = levelIndent;

			const text = document.createElement( 'span' );
			text.className = 'text';
			text.textContent = fileName;

			const name = document.createElement( 'td' );
			name.className = 'name';
			name.append( indent, this.getIconElement( file ), text );

			const size = document.createElement( 'td' );
			size.className = 'size';
			size.textContent = file.dir ? '' : UI.formatSize( file._data.uncompressedSize );

			if( !file.dir && !isNaN( Number( file._data.uncompressedSize ) ) ) {
				this.uncompressedSize += file._data.uncompressedSize;
			}

			const date = document.createElement( 'td' );
			date.className = 'date';
			date.textContent = UI.formatDate( file.date );

			const row = document.createElement( 'tr' );
			row.className = file.dir ? 'zip-dir' : 'zip-file';
			row.append( name, size, date );

			table.append( row );
		}

		return table;
	}


	/**
	 *
	 * @param {function} cb
	 */
	getHTML( cb ) {
		this.getArrayBuffer( ( _err, arrayBuffer ) => {
			this.parse( arrayBuffer, ( err, zip ) => {
				if( err ) {
					cb( err );
					return;
				}

				const html = this.build( zip );
				cb( null, html );
			} );
		} );
	}


	/**
	 *
	 * @param {File} file
	 * @returns {HTMLElement}
	 */
	getIconElement( file ) {
		const icon = document.createElement( 'span' );
		icon.className = 'icon';

		if( file.dir ) {
			icon.textContent = 'folder_open';
		}
		else {
			icon.textContent = 'description';

			const ext = FileHandler.getFileExt( file );

			if( FileHandler.executableExtensions.includes( ext ) ) {
				icon.textContent = 'terminal';
			}
			else if( FileHandler.detectLanguage( file ) !== null ) {
				icon.textContent = 'code';
			}
			else {
				if( FileHandler.imageExtensions.includes( ext ) ) {
					icon.textContent = 'image';
				}
				else if( FileHandler.videoExtensions.includes( ext ) ) {
					icon.textContent = 'movie';
				}
				else if( FileHandler.audioExtensions.includes( ext ) ) {
					icon.textContent = 'music_note';
				}
			}

			icon.classList.add( icon.textContent );
		}

		return icon;
	}


	/**
	 *
	 * @param {ArrayBuffer} arrayBuffer
	 * @param {function}    cb
	 */
	parse( arrayBuffer, cb ) {
		import( /* webpackChunkName: "jszip" */ 'jszip' ).then( module => {
			const JSZip = module.default;

			const zip = new JSZip();
			const promise = zip.loadAsync( arrayBuffer );
	
			promise.then(
				zip => cb( null, zip ),
				err => cb( err, null )
			);
		} );
	}


};
