'use strict';


{

class DropHandler {


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
	 * @param {DataTransfer} dataTransfer
	 */
	_handleDropped( dataTransfer ) {
		if( dataTransfer.items ) {
			const first = dataTransfer.items[0];

			if( first && first.kind === 'file' ) {
				this._handleFile( first.getAsFile() );
			}
		}
		else if( dataTransfer.files ) {
			const first = dataTransfer.files[0];

			if( first ) {
				this._handleFile( first );
			}
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


Evy.UI.DropHandler = DropHandler;

}
