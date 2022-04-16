'use strict';


{

class BaseParser {


	/**
	 *
	 * @constructor
	 * @param {File}   file
	 * @param {string} mimeType
	 */
	constructor( file, mimeType ) {
		this.file = file;
		this.mimeType = mimeType;
	}


	/**
	 *
	 * @return {?string}
	 */
	detectLanguage() {
		const ext = this.getFileExt();

		const extIsType = [
			'c', 'cc', 'cpp',
			'cmake',
			'css', 'scss',
			'diff',
			'glsl',
			'htm', 'html',
			'ini',
			'java',
			'js', 'json',
			'less',
			'php',
			'sh',
			'tex',
			'vb',
			'xml',
			'yml'
		];

		if( extIsType.includes( ext ) ) {
			return ext;
		}

		const extMap = {
			'frag': 'glsl',
			'gitignore': 'ini',
			'h': 'cpp',
			'in': 'cpp',
			'jshintrc': 'json',
			'md': 'markdown',
			'py': 'python',
			'ts': 'typescript',
			'tsx': 'typescript',
			'vert': 'glsl'
		};

		if( extMap[ext] ) {
			return extMap[ext];
		}

		// MIME type
		const mimeMap = {
			'application/x-shellscript': 'sh'
		};

		if( mimeMap[this.mimeType] ) {
			return mimeMap[this.mimeType];
		}

		// Special cases
		const name = this.file.name.toLowerCase();

		if( name === '.gitmodules' ) {
			return 'ini';
		}
		else if( name === 'cmakelists.txt' ) {
			return 'cmake';
		}
		else if( name === 'makefile' ) {
			return 'make';
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
			.then( arrayBuffer => cb( null, arrayBuffer ) )
			.catch( err => {
				console.error( err );
				cb( err, null );
			} );
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
			.then( text => cb( null, text ) )
			.catch( err => {
				console.error( err );
				cb( err, null );
			} );
	}


}


Evy.BaseParser = BaseParser;

}
