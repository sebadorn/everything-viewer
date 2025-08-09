import { Plugin, Priority } from '../Plugin.js';


export class VideoPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType?.startsWith( 'video/' ) ? Priority.GENERIC : Priority.NONE;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<VideoView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { VideoView } = await import(
			/* webpackChunkName: "videoview" */
			'./VideoView.js'
		);

		this._view = new VideoView( await this.getParser() );

		return this._view;
	}


};
