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
		video.volume = 0.5;

		video.addEventListener( 'loadedmetadata', () => {
			video.height = video.videoHeight;
			video.width = video.videoWidth;

			this.metaData = {
				Filename: this.parser.file.name,
				Type: this.parser.file.type,
				Filesize: Evy.UI.formatSize( this.parser.file.size ),
				Dimensions: video.width + '×' + video.height,
				Duration: Evy.UI.formatDuration( video.duration * 1000 )
			};
			this.buildMetaNode();

			this.nodeView.appendChild( video );
			cb();
		} );

		video.src = this._objectURL;
	}


}


Evy.UI.VideoView = VideoView;

}
