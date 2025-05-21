import MidiPlayer from 'midi-player-js';
import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class MidiView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'midi' );
	}


	/**
	 *
	 */
	destroy() {
		super.destroy();
	}


	/**
	 *
	 * @param {function?} cb
	 */
	load( cb ) {
		this.parser.getArrayBuffer( ( err, buffer ) => {
			this._player = new MidiPlayer.Player( ev => {
				console.debug( '[MidiView.load]', ev );
			} );

			this._player.on( 'fileLoaded', () => {
				console.log( '[MidiView.load] MidiPlayer: fileLoaded' );
				this.buildMetaNode();
				this._openWindow();
				cb?.();

				this._player.play();
			} );

			// TODO: meta info
			// TODO: lyrics
			// TODO: play sounds
			// TODO: control elements for play/pause

			this._player.loadArrayBuffer( buffer );
		} );

		// const audio = document.createElement( 'audio' );
		// audio.setAttribute( 'controls', '' );
		// audio.setAttribute( 'preload', 'metadata' );
		// audio.volume = 0.5;

		// audio.addEventListener( 'loadedmetadata', () => {
		// 	this.mdAdd( 'Duration', UI.formatDuration( audio.duration * 1000 ) );
		// 	this.buildMetaNode();

		// 	this.nodeView.appendChild( audio );
		// 	this._openWindow();

		// 	cb?.();
		// } );

		// audio.src = this._objectURL;
	}


};
