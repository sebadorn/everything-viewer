import { FileHandler } from '../FileHandler.js';
import { Plugin } from './Plugin.js';

import { AudioPlugin } from './audio/AudioPlugin.js';
import { CFBPlugin } from './cfb/CFBPlugin.js';
import { CSVPlugin } from './csv/CSVPlugin.js';
import { DICOMPlugin } from './dicom/DICOMPlugin.js';
import { EMLPlugin } from './eml/EMLPlugin.js';
import { GIFPlugin } from './gif/GIFPlugin.js';
import { ICalPlugin } from './ical/ICalPlugin.js';
import { ImagePlugin } from './image/ImagePlugin.js';
import { Model3DPlugin } from './model3d/Model3DPlugin.js';
import { NIFTIPlugin } from './nifti/NIFTIPlugin.js';
import { PDFPlugin } from './pdf/PDFPlugin.js';
import { TextPlugin } from './text/TextPlugin.js';
import { VCFPlugin } from './vcf/VCFPlugin.js';
import { VideoPlugin } from './video/VideoPlugin.js';
import { ZIPPlugin } from './zip/ZIPPlugin.js';


export const Registry = {


	_basePlugin: new Plugin(),

	/** @type {Plugin[]} */
	_plugins: [],


	/**
	 *
	 */
	init() {
		this._plugins = [
			this._basePlugin,
			new AudioPlugin(),
			new CFBPlugin(),
			new CSVPlugin(),
			new DICOMPlugin(),
			new EMLPlugin(),
			new GIFPlugin(),
			new ICalPlugin(),
			new ImagePlugin(),
			new Model3DPlugin(),
			new NIFTIPlugin(),
			new PDFPlugin(),
			new TextPlugin(),
			new VCFPlugin(),
			new VideoPlugin(),
			new ZIPPlugin(),
		];
	},


	/**
	 *
	 * @param {File} file
	 * @returns {Promise<ImportData>}
	 */
	async _getImportDataForFile( file ) {
		return {
			file: file,
			dir: null,
			fileList: null,
			ext: FileHandler.getFileExt( file ),
			mimeType: await FileHandler.getMimeType( file ),
		};
	},


	/**
	 *
	 * @param {FileSystemDirectoryEntry} dir
	 * @returns {Promise<Plugin>}
	 */
	async _getPluginForDirectoryImport( dir ) {
		const dirReader = dir.createReader();

		return new Promise( ( resolve, reject ) => {
			dirReader.readEntries(
				async entries => {
					let plugin = this._basePlugin;
					let fileList = null;

					if( DICOMPlugin.containsDICOMDIRFile( entries ) ) {
						fileList = entries;
					}
					else if( await DICOMPlugin.containsDICOMFiles( entries ) ) {
						fileList = entries
							.filter( async entry => await DICOMPlugin.isDICOMFile( entry ) )
							.sort( ( a, b ) => a.name.localeCompare( b.name, { numeric: true } ) );
					}
					else {
						const err = new Error( `No fitting parser for directory entries in ${dir.name} found.` );
						console.error( err );
					}

					if( fileList ) {
						plugin = this._plugins.find( p => p instanceof DICOMPlugin ) || plugin;
						plugin.setImportData( {
							file: null,
							dir: dir,
							fileList: fileList,
							ext: null,
							mimeType: 'application/dicom',
						} );
					}

					resolve( plugin );
				},
				err => {
					console.error( err );
					resolve( this._basePlugin );
				}
			);
		} );
	},


	/**
	 *
	 * @param {File|FileSystemDirectoryEntry} fileOrDir
	 * @returns {Promise<Plugin>}
	 */
	async getPluginForImport( fileOrDir ) {
		if( fileOrDir instanceof FileSystemDirectoryEntry ) {
			return await this._getPluginForDirectoryImport( fileOrDir );
		}

		const importData = await this._getImportDataForFile( fileOrDir );
		const matches = [];

		this._plugins.forEach( plugin => {
			const priority = plugin.canHandleImport( importData );

			if( priority > 0 ) {
				matches.push( {
					priority: priority,
					plugin: plugin,
				} );
			}
		} );

		matches.sort( ( a, b ) => b.priority - a.priority );

		/** @type {Plugin} */
		const plugin = matches[0]?.plugin || this._basePlugin;
		plugin.setImportData( importData );

		return plugin;
	},


};


/**
 * @typedef {object} ImportData
 * @property {File?} file
 * @property {FileSystemDirectoryEntry?} dir
 * @property {FileSystemEntry[]?} fileList
 * @property {string?} ext
 * @property {string?} mimeType
 */
