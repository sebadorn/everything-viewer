'use strict';


{

class BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.BaseParser} parser
	 */
	constructor( parser ) {
		this.parser = parser;

		this.node = document.createElement( 'div' );
		this.node.className = 'view';
	}


	/**
	 * Load and build the view's contents.
	 * @param {function} cb
	 */
	load( cb ) {
		const note = document.createElement( 'p' );
		note.textContent = `No parser found for file of type "${this.parser.file.type}".`;

		this.node.className += ' view-base';
		this.node.appendChild( note );

		cb();
	}


}


Evy.UI.BaseView = BaseView;

}
