import { Plugin, Priority } from '../Plugin.js';


export class AudioPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType?.startsWith( 'audio/' ) ? Priority.GENERIC : Priority.NONE;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<AudioView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { AudioView } = await import(
			/* webpackChunkName: "audioview" */
			'./AudioView.js'
		);

		this._view = new AudioView( await this.getParser() );

		return this._view;
	}


};
