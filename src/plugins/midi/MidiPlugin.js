import { MidiView } from './MidiView.js';
import { Plugin, Priority } from '../Plugin.js';


export class MidiPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		return fileInfo.mimeType === 'audio/midi' ? Priority.HIGH : Priority.NONE;
	}


	/**
	 * 
	 * @override
	 * @returns {MidiView}
	 */
	getView() {
		this._view ??= new MidiView( this.getParser() );
		return this._view;
	}


};
