import { t } from '../../ui/Language.js';
import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class VideoView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'video' );

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
	 * @override
	 * @returns {Promise<void>}
	 */
	async load() {
		this._objectURL = URL.createObjectURL( this.parser.file );

		const video = document.createElement( 'video' );
		video.setAttribute( 'controls', '' );
		video.setAttribute( 'preload', 'metadata' );
		video.volume = 0.25;

		if( !video.canPlayType( this.parser.mimeType ) ) {
			const note = document.createElement( 'p' );
			note.className = 'note';
			note.textContent = t( 'video.notSupported' ).replace( '%s', this.parser.mimeType );

			this.buildMetaNode();

			this.nodeView.append( note );
		}
		else {
			video.addEventListener( 'loadedmetadata', () => {
				if( video.videoHeight ) {
					video.height = video.videoHeight;
				}

				video.width = video.videoWidth || 900;

				this.mdAdd( t( 'dimensions' ), video.width + '×' + video.height + ' px' );
				this.mdAdd( t( 'duration' ), UI.formatDuration( video.duration * 1000 ) );
				this.buildMetaNode();

				this.nodeView.append( video );
				this._openWindow();
			} );

			video.src = this._objectURL;
		}
	}


};
