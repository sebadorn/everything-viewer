import { BaseView } from './BaseView.js';

import hljs from 'highlight.js/lib/core';

import bash from 'highlight.js/lib/languages/bash';
import cmake from 'highlight.js/lib/languages/cmake';
import diff from 'highlight.js/lib/languages/diff';
import dns from 'highlight.js/lib/languages/dns';
import ini from 'highlight.js/lib/languages/ini';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import makefile from 'highlight.js/lib/languages/makefile';
import markdown from 'highlight.js/lib/languages/markdown';
import powershell from 'highlight.js/lib/languages/powershell';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

const languages = [
	{ name: 'bash', lang: bash },
	{ name: 'cmake', lang: cmake },
	{ name: 'diff', lang: diff },
	{ name: 'dns', lang: dns },
	{ name: 'ini', lang: ini }, // also TOML
	{ name: 'javascript', lang: javascript },
	{ name: 'json', lang: json },
	{ name: 'makefile', lang: makefile },
	{ name: 'markdown', lang: markdown },
	{ name: 'powershell', lang: powershell },
	{ name: 'typescript', lang: typescript },
	{ name: 'xml', lang: xml },
	{ name: 'yaml', lang: yaml },
];

languages.forEach( entry => {
	hljs.registerLanguage( entry.name, entry.lang );

	if( entry.lang.aliases ) {
		hljs.registerAliases( entry.lang.aliases, { languageName: entry.name } );
	}

	if( entry.aliases ) {
		hljs.registerAliases( entry.aliases, { languageName: entry.name } );
	}
} );



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
