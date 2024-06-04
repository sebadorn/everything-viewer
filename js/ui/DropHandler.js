'use strict';


Evy.UI.DropHandler = class {


	/**
	 *
	 * @constructor
	 * @param {HTMLElement}
	 */
	constructor( area ) {
		this._events = {};

		area.addEventListener( 'dragover', ev => {
			ev.preventDefault();
		} );

		area.addEventListener( 'drop', ev => {
			ev.preventDefault();
			this._handleDropped( ev.dataTransfer );
		} );
	}


	/**
	 *
	 * @private
	 * @param {FileSystemDirectoryEntry} entry
	 */
	_handleDirectory( entry ) {
		console.log( '[Evy.UI.DropHandler._handleDirectory]' +
			' Directory dropped: ' + entry.name );

		const listeners = this._events.directory;

		if( Array.isArray( listeners ) ) {
			listeners.forEach( cb => cb( entry ) );
		}
	}


	/**
	 *
	 * @private
	 * @param {DataTransfer} dataTransfer
	 */
	_handleDropped( dataTransfer ) {
		if( dataTransfer.items ) {
			const first = dataTransfer.items[0];

			if( first && first.kind === 'file' ) {
				if( typeof first.webkitGetAsEntry === 'function' ) {
					const entry = first.webkitGetAsEntry();

					if( entry.isFile ) {
						this._handleFile( first.getAsFile() );
					}
					else if( entry.isDirectory ) {
						this._handleDirectory( entry );
					}
				}
				else {
					console.warn( '[Evy.UI.DropHandler._handleDropped]' +
						' Method "webkitGetAsEntry" not supported by browser.' +
						' Cannot support directories.' );
					this._handleFile( first.getAsFile() );
				}
			}
		}
		else if( dataTransfer.files ) {
			console.warn( '[Evy.UI.DropHandler._handleDropped]' +
				' DataTransfer has no attribute "items", using fallback on "files".' );
			const first = dataTransfer.files[0];

			if( first ) {
				this._handleFile( first );
			}
		}
		else {
			console.error( '[Evy.UI.DropHandler._handleDropped]' +
				' DataTransfer has neither "items" nor "files" attribute.', dataTransfer );
		}
	}


	/**
	 *
	 * @private
	 * @param {File} file
	 */
	_handleFile( file ) {
		console.log( '[Evy.UI.DropHandler._handleFile] File dropped: ' + file.name );

		const listeners = this._events.file;

		if( Array.isArray( listeners ) ) {
			listeners.forEach( cb => cb( file ) );
		}
	}


	/**
	 *
	 * @param {string}   name
	 * @param {function} cb
	 */
	on( name, cb ) {
		this._events[name] = this._events[name] || [];
		this._events[name].push( cb );
	}


}