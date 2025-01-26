import { BaseParser } from './parser/BaseParser.js';
import { CSVParser } from './parser/CSVParser.js';
import { DICOMParser } from './parser/DICOMParser.js';
import { EMLParser } from './parser/EMLParser.js';
import { GIFParser } from './parser/GIFParser.js';
import { ICalParser } from './parser/ICalParser.js';
import { VCFParser } from './parser/VCFParser.js';
import { ZIPParser } from './parser/ZIPParser.js';

import { AudioView } from './ui/views/AudioView.js';
import { BaseView } from './ui/views/BaseView.js';
import { CSVView } from './ui/views/CSVView.js';
import { DICOMView } from './ui/views/DICOMView.js';
import { EMLView } from './ui/views/EMLView.js';
import { GIFView } from './ui/views/GIFView.js';
import { ICalView } from './ui/views/ICalView.js';
import { ImageView } from './ui/views/ImageView.js';
import { PDFView } from './ui/views/PDFView.js';
import { TextView } from './ui/views/TextView.js';
import { VCFView } from './ui/views/VCFView.js';
import { VideoView } from './ui/views/VideoView.js';
import { ZIPView } from './ui/views/ZIPView.js';


export const FileHandler = {


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
			vcs: 'text/calendar',
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
	 * @param   {File} file
	 * @returns {string}
	 */
	async getMimeType( file ) {
		// Normally it is only the first 4 bytes. But:
		// - DICOM files have 128 bytes before that.
		// - NIFTI files have 344 bytes before that.
		const arrayBuffer = await file.slice( 0, 344 + 4 ).arrayBuffer();

		const arr = new Uint8Array( arrayBuffer );
		const header = arr.reduce(
			( prev, current ) => prev + current.toString( 16 ).padStart( 2, '0' ),
			''
		);
		const fallbackType = file.type || this.extToMimeType( this.getFileExt( file ) );
		const type = this.headerToMimeType( header, fallbackType );

		return type;
	},


	/**
	 *
	 * @param {File}     file
	 * @param {function} cb
	 */
	async getParser( file, cb ) {
		const ext = this.getFileExt( file );
		const mimeType = this.getMimeType( file );

		let parser = null;

		if( ext === 'csv' ) {
			parser = new CSVParser( file, mimeType );
		}
		else if( mimeType === 'application/dicom' ) {
			parser = new DICOMParser( { file, mimeType } );
		}
		else if( ext === 'eml' ) {
			parser = new EMLParser( file, mimeType );
		}
		else if(
			mimeType === 'text/calendar' ||
			['ical', 'ics', 'ifb', 'vcs'].includes( ext )
		) {
			parser = new ICalParser( file, mimeType );
		}
		else if( ext === 'vcf' || mimeType === 'text/vcard' ) {
			parser = new VCFParser( file, mimeType );
		}
		else if( mimeType === 'application/zip' ) {
			parser = new ZIPParser( file, mimeType );
		}
		else if( mimeType === 'image/gif' ) {
			parser = new GIFParser( file, mimeType );
		}
		else {
			parser = new BaseParser( file, mimeType );
		}

		cb( null, parser );
	},


	/**
	 *
	 * @param  {BaseParser} parser
	 * @return {BaseView}
	 */
	getView( parser ) {
		if( parser.isDir ) {
			if( parser instanceof DICOMParser ) {
				return new DICOMView( parser );
			}
		}
		else if( parser.mimeType || parser.file.size > 0 ) {
			const ext = this.getFileExt( parser.file );
			const type = String(parser.mimeType).toLowerCase();
			const name = parser.file.name.toLowerCase();

			if( type === 'application/pdf' ) {
				return new PDFView( parser );
			}
			else if( type.startsWith( 'audio/' ) ) {
				return new AudioView( parser );
			}
			else if( parser instanceof CSVParser ) {
				return new CSVView( parser );
			}
			else if( parser instanceof DICOMParser ) {
				return new DICOMView( parser );
			}
			else if( parser instanceof EMLParser ) {
				return new EMLView( parser );
			}
			else if( parser instanceof ICalParser ) {
				return new ICalView( parser );
			}
			else if( parser instanceof ZIPParser ) {
				return new ZIPView( parser );
			}
			else if( parser instanceof GIFParser ) {
				return new GIFView( parser );
			}
			else if( type.startsWith( 'image/' ) ) {
				return new ImageView( parser );
			}
			else if( parser instanceof VCFParser ) {
				return new VCFView( parser );
			}
			else if( type.startsWith( 'video/' ) ) {
				return new VideoView( parser );
			}
			else if( this.isTypeText( type, ext, name ) ) {
				return new TextView( parser );
			}
		}

		return new BaseView( parser );
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
				console.log( `[FileHandler.headerToMimeType] Using "${type}" based on extension.` );
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
					console.log( `[FileHandler.headerToMimeType] Guessing "${header8}" -> ${type}` );
				}
			}
		}
		else {
			console.log( `[FileHandler.headerToMimeType] "${header8}" -> ${type}` );
		}

		if( !type ) {
			console.log( `[FileHandler.headerToMimeType] Failed to find MIME type for header "${header8}".` );
		}

		return type;
	},


	/**
	 *
	 * @param {FileSystemFileEntry} entry
	 * @returns {Promise}
	 */
	isDICOMFile( entry ) {
		if( !entry?.isFile ) {
			return new Promise( ( resolve, _reject ) => resolve( false ) );
		}

		if( entry.name.toLocaleLowerCase().endsWith( '.dcm' ) ) {
			return new Promise( ( resolve, _reject ) => resolve( true ) );
		}

		return new Promise( ( resolve, _reject ) => {
			entry.file(
				file => {
					const mimeType = FileHandler.getMimeType( file );
					resolve( mimeType === 'application/dicom' );
				},
				err => {
					console.error( '[FileHandler.isDICOMFile]', err );
					resolve( false );
				}
			);
		} );
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
			'application/x-yaml',
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
			'todo',
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
			'vert',
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
	},


};
