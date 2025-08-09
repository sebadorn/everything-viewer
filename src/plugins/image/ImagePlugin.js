import { Plugin, Priority } from '../Plugin.js';


export class ImagePlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType?.startsWith( 'image/' ) ? Priority.GENERIC : Priority.NONE;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<ImageView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { ImageView } = await import(
			/* webpackChunkName: "imageview" */
			'./ImageView.js'
		);

		this._view = new ImageView( await this.getParser() );

		return this._view;
	}


};
