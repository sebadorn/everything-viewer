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
	 * @param {function?} cb
	 * @returns {Promise<ArrayBuffer>}
	 */
	getArrayBuffer( cb ) {
		const promise = this.file.arrayBuffer();

		if( typeof cb === 'function' ) {
			promise
				.then( arrayBuffer => cb( null, arrayBuffer ) )
				.catch( err => {
					console.error( err );
					cb( err, null );
				} );
		}

		return promise;
	}


	/**
	 *
	 * @param {function} cb
	 */
	getBase64( cb ) {
		const reader = new FileReader();

		reader.onload = () => cb( null, reader.result );

		reader.onerror = err => {
			console.error( '[BaseParser.getBase64]', err );
			cb( err, null );
		};

		reader.readAsDataURL( this.file );
	}


	/**
	 *
	 * @param {function?} cb
	 * @returns {Promise<string>}
	 */
	getText( cb ) {
		const promise = this.file.text();

		if( typeof cb === 'function' ) {
			promise
				.then( text => cb( null, text ) )
				.catch( err => {
					console.error( err );
					cb( err, null );
				} );
		}

		return promise;
	}


};
