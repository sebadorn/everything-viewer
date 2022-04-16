'use strict';


{

class VideoView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.BaseParser} parser
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
	 * @param {function} cb
	 */
	load( cb ) {
		this._objectURL = URL.createObjectURL( this.parser.file );

		const video = document.createElement( 'video' );
		video.setAttribute( 'controls', '' );
		video.setAttribute( 'preload', 'metadata' );
		video.volume = 0.25;

		video.addEventListener( 'loadedmetadata', () => {
			if( video.videoHeight ) {
				video.height = video.videoHeight;
			}

			video.width = video.videoWidth || 900;

			this.metaData.Dimensions = video.width + '×' + video.height + ' px';
			this.metaData.Duration = Evy.UI.formatDuration( video.duration * 1000 );
			this.buildMetaNode();

			this.nodeView.appendChild( video );
			cb();
		} );

		video.src = this._objectURL;
	}


}


Evy.UI.VideoView = VideoView;

}
