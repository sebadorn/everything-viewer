import { VideoView } from './VideoView.js';
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
	 * @returns {VideoView}
	 */
	getView() {
		this._view ??= new VideoView( this.getParser() );
		return this._view;
	}


};
