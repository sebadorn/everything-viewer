import { BaseView } from './BaseView.js';
import hljs from 'highlight.js';


export class TextView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
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

			const lang = this.parser.detectLanguage();

			if( lang ) {
				block.className += ' language-' + lang;
				hljs.highlightElement( block );
			}

			this.mdAdd( 'Lines', ( text.match( /\n/g ) || [] ).length );
			this.buildMetaNode();

			cb();
		} );
	}


};
