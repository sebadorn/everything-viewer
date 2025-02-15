import { BaseView } from '../BaseView.js';


export class ICalView extends BaseView {


	/**
	 *
	 * @param {ICalParser} parser
	 */
	constructor( parser ) {
		super( parser, 'ical' );
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.getHTML( ( _err, html ) => {
			this.buildMetaNode();

			this.nodeView.append( html );

			cb();
		} );
	}


};
