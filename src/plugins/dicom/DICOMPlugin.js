import { DICOMParser } from './DICOMParser.js';
import { DICOMView } from './DICOMView.js';
import { Plugin, Priority } from '../Plugin.js';
import { FileHandler } from '../../FileHandler.js';


export class DICOMPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('./Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType === 'application/dicom' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {DICOMParser}
	 */
	getParser() {
		this._parser ??= new DICOMParser( this._importData );
		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {DICOMView}
	 */
	getView() {
		this._view ??= new DICOMView( this.getParser() );
		return this._view;
	}


	/**
	 *
	 * @param {FileSystemEntry[]} entries
	 * @return {boolean}
	 */
	static containsDICOMDIRFile( entries ) {
		const match = entries.find( entry => {
			return (
				entry.isFile &&
				entry.name.toLowerCase() === 'dicomdir'
			);
		} );

		return !!match;
	}


	/**
	 *
	 * @param {FileSystemEntry[]} entries
	 * @returns {Promise<boolean>}
	 */
	static async containsDICOMFiles( entries ) {
		let num = 0;

		for( let i = 0; i < entries.length; i++ ) {
			const entry = entries[i];

			if( await this.isDICOMFile( entry ) ) {
				num++;

				if( num > 1 ) {
					return true;
				}
			}
		}

		return false;
	}


	/**
	 *
	 * @param {FileSystemFileEntry} entry
	 * @returns {Promise<boolean>}
	 */
	static isDICOMFile( entry ) {
		if( !entry?.isFile ) {
			return new Promise( ( resolve, _reject ) => resolve( false ) );
		}

		if( entry.name.toLocaleLowerCase().endsWith( '.dcm' ) ) {
			return new Promise( ( resolve, _reject ) => resolve( true ) );
		}

		return new Promise( ( resolve, _reject ) => {
			entry.file(
				async file => {
					const mimeType = await FileHandler.getMimeType( file );
					resolve( mimeType === 'application/dicom' );
				},
				err => {
					console.error( '[DICOMPlugin.isDICOMFile]', err );
					resolve( false );
				}
			);
		} );
	}


};
