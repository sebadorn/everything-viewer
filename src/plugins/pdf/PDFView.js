import { BaseView } from '../BaseView.js';


export class PDFView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'pdf' );

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
	 */
	async load() {
		this._objectURL = URL.createObjectURL( this.parser.file );

		const iframe = document.createElement( 'iframe' );
		iframe.src = this._objectURL;

		this.buildMetaNode();

		this.nodeView.appendChild( iframe );
		this._openWindow();
	}


};
