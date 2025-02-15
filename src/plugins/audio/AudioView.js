import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class AudioView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'audio' );

		this._objectURL = null;
	}


	/**
	 *
	 */
	destroy() {
		super.destroy();

		if( this._objectURL ) {
			URL.revokeObjectURL( this._objectURL );
		}
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		this._objectURL = URL.createObjectURL( this.parser.file );

		const audio = document.createElement( 'audio' );
		audio.setAttribute( 'controls', '' );
		audio.setAttribute( 'preload', 'metadata' );
		audio.volume = 0.5;

		if( !audio.canPlayType( this.parser.mimeType ) ) {
			const note = document.createElement( 'p' );
			note.className = 'note';
			note.textContent = `Playback for audio format not supported: "${this.parser.mimeType}"`;

			this.buildMetaNode();

			this.nodeView.append( note );
			cb();
		}
		else {
			audio.addEventListener( 'loadedmetadata', () => {
				this.mdAdd( 'Duration', UI.formatDuration( audio.duration * 1000 ) );
				this.buildMetaNode();

				this.nodeView.appendChild( audio );
				cb();
			} );

			audio.src = this._objectURL;
		}
	}


};
