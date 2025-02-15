import { AudioView } from './AudioView.js';
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
	 * @returns {AudioView}
	 */
	getView() {
		this._view ??= new AudioView( this.getParser() );
		return this._view;
	}


};
