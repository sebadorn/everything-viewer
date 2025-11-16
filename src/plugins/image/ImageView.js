import { t } from '../../ui/Language.js';
import { BaseView } from '../BaseView.js';


export class ImageView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'image' );

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
		let loaded = false;

		const image = new Image();

		image.onload = () => {
			if( loaded ) {
				return;
			}

			loaded = true;

			image.height = image.naturalHeight;
			image.width = image.naturalWidth;

			this.mdAdd( t( 'dimensions' ), image.naturalWidth + '×' + image.naturalHeight + ' px' );
			this.buildMetaNode();

			this.nodeView.append( image );
			this._openWindow();
		};

		image.onerror = () => {
			const note = document.createElement( 'p' );
			note.className = 'note';
			note.textContent = t( 'image.notSupported' ).replace( '%s', this.parser.mimeType );

			this.buildMetaNode();

			this.nodeView.append( note );
			this._openWindow();
		};

		this._objectURL = URL.createObjectURL( this.parser.file );
		image.src = this._objectURL;
	}


};
