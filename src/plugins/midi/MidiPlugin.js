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
	 * @returns {Promise<MidiParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { MidiParser } = await import(
			/* webpackChunkName: "midiparser" */
			'./MidiParser.js'
		);

		this._parser = new MidiParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<MidiView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { MidiView } = await import(
			/* webpackChunkName: "midiview" */
			'./MidiView.js'
		);

		this._view = new MidiView( await this.getParser() );

		return this._view;
	}


	/**
	 *
	 * @param {import('./Registry.js').ImportData} data
	 */
	setImportData( data ) {
		// MidiPlugin only supports single instances. Due to the current
		// way Tone.js is used, only a single Midi file can be played.
		this._parser?.destroy();
		this._view?.window?.close();
		this._view?.destroy();

		this._parser = null;
		this._view = null;

		this._importData = data;
	}


};
