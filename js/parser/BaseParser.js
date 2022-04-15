'use strict';


{

class BaseParser {


	/**
	 *
	 * @constructor
	 * @param {File} file
	 */
	constructor( file ) {
		this.file = file;
	}


	/**
	 *
	 * @return {?string}
	 */
	detectLanguage() {
		const ext = this.getFileExt();

		const extIsType = [
			'c', 'cpp',
			'css', 'scss',
			'diff',
			'htm', 'html',
			'java',
			'js', 'json',
			'less',
			'php',
			'sh',
			'vb',
			'xml'
		];

		if( extIsType.includes( ext ) ) {
			return ext;
		}

		const extMap = {
			'h': 'cpp',
			'md': 'markdown',
			'py': 'python',
			'ts': 'typescript',
			'tsx': 'typescript'
		};

		if( extMap[ext] ) {
			return extMap[ext];
		}

		// Special cases
		const name = this.file.name.toLowerCase();

		if( name === 'cmakelists.txt' ) {
			return 'cmake';
		}

		return null;
	}


	/**
	 *
	 * @param {function} cb
	 */
	getArrayBuffer( cb ) {
		const promise = this.file.arrayBuffer();

		promise
			.then( arrayBuffer => cb( arrayBuffer ) )
			.catch( err => console.error( err ) );
	}


	/**
	 *
	 * @return {string}
	 */
	getFileExt() {
		return this.file.name.split( '.' ).pop().toLowerCase();
	}


	/**
	 *
	 * @param {function} cb
	 */
	getText( cb ) {
		const promise = this.file.text();

		promise
			.then( text => cb( text ) )
			.catch( err => console.error( err ) );
	}


}


Evy.BaseParser = BaseParser;

}
