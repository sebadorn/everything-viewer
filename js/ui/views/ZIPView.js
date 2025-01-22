import { BaseView } from './BaseView.js';


export class ZIPView extends BaseView {


	/**
	 *
	 * @param {ZIPParser} parser
	 */
	constructor( parser ) {
		super( parser, 'zip' );
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.getHTML( ( err, html ) => {
			if( err ) {
				html = document.createElement( 'p' );
				html.className = 'note';
				html.textContent = err.message;
			}

			this.buildMetaNode();

			const wrap = document.createElement( 'div' );
			wrap.className = 'wrap';
			wrap.append( html );

			this.nodeView.append( wrap );

			cb();
		} );
	}


};
