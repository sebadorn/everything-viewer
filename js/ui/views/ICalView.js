'use strict';


{

class ICalView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.ICalParser} parser
	 */
	constructor( parser ) {
		super( parser, 'ical' );
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.getHTML( ( _err, html, data ) => {
			this.metaData.Events = data[2].length;
			this.buildMetaNode();

			this.nodeView.append( html );

			cb();
		} );
	}


}


Evy.UI.ICalView = ICalView;

}
