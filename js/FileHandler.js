'use strict';


/**
 * @namespace Evy.FileHandler
 */
Evy.FileHandler = {


	/**
	 * Some fallback MIME type detection just going by file extension.
	 * But only for a few ones, that some browsers may not report when
	 * importing the file.
	 * @param  {string} ext
	 * @return {?string}
	 */
	extToMimeType( ext ) {
		if( !ext ) {
			return null;
		}

		ext = ext.toLowerCase().trim();

		const map = {
			csv: 'text/csv',
			ical: 'text/calendar',
			ics: 'text/calendar',
			ifb: 'text/calendar',
			vcf: 'text/vcard',
			vcs: 'text/calendar'
		};

		return map[ext] || null;
	},


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
		// Normally it is only the first 4 bytes. But:
		// - DICOM files have 128 bytes before that.
		// - NIFTI files have 344 bytes before that.
		const promise = file.slice( 0, 344 + 4 ).arrayBuffer();

		promise
			.then( arrayBuffer => {
				const arr = new Uint8Array( arrayBuffer );
				const header = arr.reduce(
					( prev, current ) => prev + current.toString( 16 ).padStart( 2, '0' ),
					''
				);
				const fallbackType = file.type || this.extToMimeType( this.getFileExt( file ) );
				const type = this.headerToMimeType( header, fallbackType );

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
			else if( mimeType === 'application/dicom' ) {
				parser = new Evy.DICOMParser( file, mimeType );
			}
			else if( ext === 'eml' ) {
				parser = new Evy.EMLParser( file, mimeType );
			}
			else if(
				mimeType === 'text/calendar' ||
				['ical', 'ics', 'ifb', 'vcs'].includes( ext )
			) {
				parser = new Evy.ICalParser( file, mimeType );
			}
			else if( ext === 'vcf' || mimeType === 'text/vcard' ) {
				parser = new Evy.VCFParser( file, mimeType );
			}
			else if( mimeType === 'application/zip' ) {
				parser = new Evy.ZIPParser( file, mimeType );
			}
			else if( mimeType === 'image/gif' ) {
				parser = new Evy.GIFParser( file, mimeType );
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
		if( parser.isDir ) {
			if( parser instanceof Evy.DICOMParser ) {
				return new Evy.UI.DICOMView( parser );
			}
		}
		else if( parser.mimeType || parser.file.size > 0 ) {
			const ext = this.getFileExt( parser.file );
			const type = String(parser.mimeType).toLowerCase();
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
			else if( parser instanceof Evy.DICOMParser ) {
				return new Evy.UI.DICOMView( parser );
			}
			else if( parser instanceof Evy.EMLParser ) {
				return new Evy.UI.EMLView( parser );
			}
			else if( parser instanceof Evy.ICalParser ) {
				return new Evy.UI.ICalView( parser );
			}
			else if( parser instanceof Evy.ZIPParser ) {
				return new Evy.UI.ZIPView( parser );
			}
			else if( parser instanceof Evy.GIFParser ) {
				return new Evy.UI.GIFView( parser );
			}
			else if( type.startsWith( 'image/' ) ) {
				return new Evy.UI.ImageView( parser );
			}
			else if( parser instanceof Evy.VCFParser ) {
				return new Evy.UI.VCFView( parser );
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
		let header8 = header.substring( 0, 8 );

		switch( header8 ) {
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

		// Files with magic bytes not at the beginning.
		if( !type && header.length > 8 ) {
			// DICOM: Spells out "DICM".
			if( header.substring( 256, 256 + 8 ) === '4449434d' ) {
				header8 = '4449434d';
				type = 'application/dicom';
			}
			// Spells out "n+1" for NIFTI/.nii files.
			else if( header.substring( 688, 688 + 6 ) === '6e2b31' ) {
				header8 = '6e2b3100';
				type = 'application/octet-stream';
			}
		}

		if( !type ) {
			if( typeFromExt ) {
				type = typeFromExt;
				console.log( `[Evy.FileHandler.headerToMimeType] Using "${type}" based on extension.` );
			}
			else {
				// Starts with "#!"
				if( header8.startsWith( '2321' ) ) {
					type = 'application/x-shellscript';
				}
				// Byte order mark
				else if(
					header8.startsWith( 'efbbbf' ) ||
					header8.startsWith( 'feff' ) ||
					header8.startsWith( 'fffe' ) ||
					header8.startsWith( '0000feff' ) ||
					header8.startsWith( '2b2f7638' ) ||
					header8.startsWith( '2b2f7639' ) ||
					header8.startsWith( '2b2f762b' ) ||
					header8.startsWith( '2b2f762f' )
				) {
					type = 'text/plain';
				}
				else if(
					header8.startsWith( '504b34' ) ||
					header8.startsWith( '504b0304' ) ||
					header8.startsWith( '504b0506' )
				) {
					type = 'application/zip';
				}

				if( type ) {
					console.log( `[Evy.FileHandler.headerToMimeType] Guessing "${header8}" -> ${type}` );
				}
			}
		}
		else {
			console.log( `[Evy.FileHandler.headerToMimeType] "${header8}" -> ${type}` );
		}

		if( !type ) {
			console.log( `[Evy.FileHandler.headerToMimeType] Failed to find MIME type for header "${header8}".` );
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
