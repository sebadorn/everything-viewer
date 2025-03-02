import { BaseView } from '../BaseView.js';


export class VCFView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'vcf' );
	}


	/**
	 *
	 * @param {function?} cb
	 */
	load( cb ) {
		this.parser.getHTML( ( _err, html ) => {
			this.buildMetaNode();

			this.nodeView.append( html );
			this._openWindow();

			cb?.();
		} );
	}


};
