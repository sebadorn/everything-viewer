'use strict';


{

class TextView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.BaseParser} parser
	 */
	constructor( parser ) {
		super( parser );
		this.node.className += ' view-text';
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		const block = document.createElement( 'div' );
		block.className = 'code';

		this.node.appendChild( block );

		this.parser.getText( text => {
			block.textContent = text;

			const lang = this.parser.detectLanguage();

			if( lang ) {
				block.className += ' language-' + lang;
				hljs.highlightElement( block );
			}

			cb();
		} );
	}


}


Evy.UI.TextView = TextView;

}
