'use strict';


/**
 * @namespace Evy.FileHandler
 */
Evy.FileHandler = {


	/**
	 *
	 * @param  {File}
	 * @return {string}
	 */
	getFileExt( file ) {
		return file.name.split( '.' ).pop().toLowerCase();
	},


	/**
	 *
	 * @param {File}     file
	 * @param {function} cb
	 */
	getMimeType( file, cb ) {
		const promise = file.slice( 0, 4 ).arrayBuffer();

		promise
			.then( arrayBuffer => {
				const arr = new Uint8Array( arrayBuffer );
				const header = arr.reduce( ( prev, current ) => prev + current.toString( 16 ), '' );
				const type = this.headerToMimeType( header, file.type );

				cb( null, type );
			} )
			.catch( err => {
				console.error( err );
				cb( err, file.type );
			} );
	},


	/**
	 *
	 * @param {File}     file
	 * @param {function} cb
	 */
	getParser( file, cb ) {
		const ext = this.getFileExt( file );

		this.getMimeType( file, ( _err, mimeType ) => {
			let parser = null;

			if( ext === 'csv' ) {
				parser = new Evy.CSVParser( file, mimeType );
			}
			else if( ext === 'eml' ) {
				parser = new Evy.EMLParser( file, mimeType );
			}
			else if( mimeType === 'application/zip' ) {
				parser = new Evy.ZIPParser( file, mimeType );
			}
			else {
				parser = new Evy.BaseParser( file, mimeType );
			}

			cb( null, parser );
		} );
	},


	/**
	 *
	 * @param  {Evy.BaseParser} parser
	 * @return {Evy.UI.BaseView}
	 */
	getView( parser ) {
		if( parser.mimeType || parser.file.size > 0 ) {
			const ext = this.getFileExt( parser.file );
			const type = parser.mimeType.toLowerCase();
			const name = parser.file.name.toLowerCase();

			if( type === 'application/pdf' ) {
				return new Evy.UI.PDFView( parser );
			}
			else if( type.startsWith( 'audio/' ) ) {
				return new Evy.UI.AudioView( parser );
			}
			else if( parser instanceof Evy.CSVParser ) {
				return new Evy.UI.CSVView( parser );
			}
			else if( parser instanceof Evy.EMLParser ) {
				return new Evy.UI.EMLView( parser );
			}
			else if( parser instanceof Evy.ZIPParser ) {
				return new Evy.UI.ZIPView( parser );
			}
			else if( type.startsWith( 'image/' ) ) {
				return new Evy.UI.ImageView( parser );
			}
			else if( type.startsWith( 'video/' ) ) {
				return new Evy.UI.VideoView( parser );
			}
			else if( this.isTypeText( type, ext, name ) ) {
				return new Evy.UI.TextView( parser );
			}
		}

		return new Evy.UI.BaseView( parser );
	},


	/**
	 *
	 * @param  {string}  header
	 * @param  {?string} typeFromExt
	 * @return {?string}
	 */
	headerToMimeType( header, typeFromExt = null ) {
		let type = null;

		switch( header ) {
			case '47494638':
				type = 'image/gif';
				break;

			case '89504e47':
				type = 'image/png';
				break;

			case 'ffd8ffe0':
			case 'ffd8ffe1':
			case 'ffd8ffe2':
			case 'ffd8ffe3':
			case 'ffd8ffe8':
				type = 'image/jpeg';
				break;
		}

		if( !type ) {
			if( typeFromExt ) {
				type = typeFromExt;
				console.log( `[Evy.FileHandler.headerToMimeType] Using "${type}" based on extension.` );
			}
			else {
				// Starts with "#!"
				if( header.startsWith( '2321' ) ) {
					type = 'application/x-shellscript';
				}
				// Byte order mark
				else if(
					header.startsWith( 'efbbbf' ) ||
					header.startsWith( 'feff' ) ||
					header.startsWith( 'fffe' ) ||
					header.startsWith( '0000feff' ) ||
					header.startsWith( '2b2f7638' ) ||
					header.startsWith( '2b2f7639' ) ||
					header.startsWith( '2b2f762b' ) ||
					header.startsWith( '2b2f762f' )
				) {
					type = 'text/plain';
				}

				if( type ) {
					console.log( `[Evy.FileHandler.headerToMimeType] Guessing "${header}" -> ${type}` );
				}
			}
		}
		else {
			console.log( `[Evy.FileHandler.headerToMimeType] "${header}" -> ${type}` );
		}

		if( !type ) {
			console.log( `[Evy.FileHandler.headerToMimeType] Failed to find MIME type for header "${header}".` );
		}

		return type;
	},


	/**
	 *
	 * @param  {string} type - File type in lowercase.
	 * @param  {string} ext  - File extension in lowercase.
	 * @param  {string} name - Filename in lowercase including extension.
	 * @return {boolean}
	 */
	isTypeText( type, ext, name ) {
		// Generic types
		if(
			type.startsWith( 'text/' ) ||
			type.startsWith( 'message/' )
		) {
			return true;
		}

		// Full types
		const knownTypes = [
			'application/json',
			'application/x-javascript',
			'application/x-php',
			'application/x-python',
			'application/x-shellscript',
			'application/x-yaml'
		];

		if( knownTypes.includes( type ) ) {
			return true;
		}

		// Names
		const knownNames = [
			'authors',
			'changelog',
			'contributors',
			'copying',
			'install',
			'license',
			'makefile',
			'readme',
			'todo'
		];

		if( knownNames.includes( name ) ) {
			return true;
		}

		// Extensions
		const knownExts = [
			'cfg',
			'dart',
			'frag',
			'glsl',
			'in',
			'ini',
			'less',
			'proto',
			'vert'
		];

		if( knownExts.includes( ext ) ) {
			return true;
		}

		// Special cases
		if( ext === 'bat' && type === 'application/x-msdos-program' ) {
			return true;
		}
		else if( name.length > 1 && name.startsWith( '.' ) ) {
			return true;
		}

		return false;
	}


};
