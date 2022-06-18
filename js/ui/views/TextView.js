'use strict';


{

class TextView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'text' );
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		const block = document.createElement( 'div' );
		block.className = 'code';

		this.nodeView.appendChild( block );

		this.parser.getText( ( _err, text ) => {
			block.textContent = text;

			Evy.ensureScript( 'hljs', () => {
				const lang = this.parser.detectLanguage();

				if( lang ) {
					block.className += ' language-' + lang;
					hljs.highlightElement( block );
				}

				this.mdAdd( 'Lines', ( text.match( /\n/g ) || [] ).length );
				this.buildMetaNode();

				cb();
			} );
		} );
	}


}


Evy.UI.TextView = TextView;

}
