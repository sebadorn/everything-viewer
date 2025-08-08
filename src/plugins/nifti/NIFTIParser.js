import { BaseParser } from '../BaseParser.js';
import { DICOMParser } from '../dicom/DICOMParser.js';


export class NIFTIParser extends BaseParser {


	static numInstances = 0;


	/**
	 *
	 * @param {import('../Registry.js').ImportData} data
	 */
	constructor( data ) {
		super( data, !!data.dir );
		this.file = data.dir || data.file;

		NIFTIParser.numInstances++;
	}


	/**
	 *
	 */
	destroy() {
		URL.revokeObjectURL( this._objectURL );

		if( NIFTIParser.numInstances + DICOMParser.numInstances === 1 ) {
			console.log( '[NIFTIParser.destroy] Purging cornerstone caches.' );

			try {
				this.cache.purgeCache();
			}
			catch( err ) {
				console.error( '[NIFTIParser.destroy]', err );
			}
		}

		NIFTIParser.numInstances--;
	}


	/**
	 *
	 * @returns {Promise<void>}
	 */
	async parse() {
		const core = await import(
			/* webpackChunkName: "cornerstone_core" */
			'@cornerstonejs/core'
		);
		const niftiLoader = await import(
			/* webpackChunkName: "cornerstone_nifti-volume-loader" */
			'@cornerstonejs/nifti-volume-loader'
		);

		core.init();
		niftiLoader.init();
		core.imageLoader.registerImageLoader( 'nifti', niftiLoader.cornerstoneNiftiImageLoader );

		this.cache = core.cache;

		this._objectURL = URL.createObjectURL( this.file );
		let imageIds = await niftiLoader.createNiftiImageIdsAndCacheMetadata( { url: this._objectURL } );

		return imageIds;
	}


};
