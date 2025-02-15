import { ImageView } from './ImageView.js';
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
	 * @returns {ImageView}
	 */
	getView() {
		this._view ??= new ImageView( this.getParser() );
		return this._view;
	}


};
