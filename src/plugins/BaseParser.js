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
	 * @return {string?}
	 */
	detectLanguage() {
		const ext = FileHandler.getFileExt( this.file );

		const extIsType = [
			'c', 'cc', 'cpp',
			'cmake',
			'css', 'scss',
			'dart',
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
			'yaml', 'yml',
			'zone',
		];

		if( extIsType.includes( ext ) ) {
			return ext;
		}

		const extMap = {
			'arb': 'json',
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

		if( ['.gitconfig', '.gitmodules'].includes( name ) ) {
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
