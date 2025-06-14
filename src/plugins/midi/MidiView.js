import { BaseView } from '../BaseView.js';


export class MidiView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'midi' );
		this.synths = [];
	}


	/**
	 *
	 */
	destroy() {
		this.pause();

		// Dispose the synth and make a new one
		while( this.synths.length ) {
			const synth = synths.shift();
			synth.dispose();
		}

		super.destroy();
	}


	/**
	 *
	 */
	pause() {
		Tone.getTransport().pause();
	}


	/**
	 *
	 */
	play() {
		if( this.synths.length > 0 ) {
			Tone.getTransport().start();
			return;
		}
	}


	/**
	 *
	 * @param {function?} cb
	 */
	load( cb ) {
		this.parser.parse( ( _err, midiData, synths ) => {
			this.synths = synths;

			// TODO: add meta info
			this.buildMetaNode();

			// TODO: build audio player UI

			this._openWindow();
			cb?.();
		} );
	}


};
