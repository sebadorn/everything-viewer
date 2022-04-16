'use strict';


{

class AudioView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.BaseParser} parser
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

		audio.addEventListener( 'loadedmetadata', () => {
			this.metaData.Duration = Evy.UI.formatDuration( audio.duration * 1000 );
			this.buildMetaNode();

			this.nodeView.appendChild( audio );
			cb();
		} );

		audio.src = this._objectURL;
	}


}


Evy.UI.AudioView = AudioView;

}
