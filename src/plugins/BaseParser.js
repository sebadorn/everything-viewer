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
	 * @returns {Promise<ArrayBuffer>}
	 */
	getArrayBuffer() {
		return this.file.arrayBuffer();
	}


	/**
	 *
	 * @returns {Promise<string>}
	 */
	getBase64() {
		const reader = new FileReader();

		return new Promise( ( resolve, reject ) => {
			reader.onload = () => resolve( reader.result );

			reader.onerror = err => {
				console.error( '[BaseParser.getBase64]', err );
				reject( err );
			};

			reader.readAsDataURL( this.file );
		} );
	}


	/**
	 *
	 * @returns {Promise<string>}
	 */
	getText() {
		return this.file.text();
	}


};
