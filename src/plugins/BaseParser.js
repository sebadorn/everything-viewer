import { FileHandler } from '../FileHandler.js';


export class BaseParser {


	/**
	 *
	 * @param {import('./Registry.js').ImportData} data
	 * @param {boolean} [isDir = false]
	 */
	constructor( data, isDir = false ) {
		this.file = data.file || data.fileList;
		this.mimeType = data.mimeType;
		this.isDir = isDir;
	}


	/**
	 *
	 */
	destroy() {}


	/**
	 *
	 * @param {function} cb
	 */
	getArrayBuffer( cb ) {
		const promise = this.file.arrayBuffer();

		promise
			.then( arrayBuffer => cb( null, arrayBuffer ) )
			.catch( err => {
				console.error( err );
				cb( err, null );
			} );
	}


	/**
	 *
	 * @param {function} cb
	 */
	getText( cb ) {
		const promise = this.file.text();

		promise
			.then( text => cb( null, text ) )
			.catch( err => {
				console.error( err );
				cb( err, null );
			} );
	}


};
