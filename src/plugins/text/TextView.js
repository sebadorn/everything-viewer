import { BaseView } from '../BaseView.js';


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
	 * @returns {Promise<HLJSApi>}
	 */
	static async initHljs() {
		if( TextView.hljs ) {
			return TextView.hljs;
		}

		TextView.hljs = ( await import(
			/* webpackChunkName: "hljs_core" */
			'highlight.js/lib/core'
		) ).default;

		const imports = {
			'bash': await import(
				/* webpackChunkName: "hljs_l_bash" */
				'highlight.js/lib/languages/bash'
			),
			'cmake': await import(
				/* webpackChunkName: "hljs_l_cmake" */
				'highlight.js/lib/languages/cmake'
			),
			'diff': await import(
				/* webpackChunkName: "hljs_l_diff" */
				'highlight.js/lib/languages/diff'
			),
			'dns': await import(
				/* webpackChunkName: "hljs_l_dns" */
				'highlight.js/lib/languages/dns'
			),
			'ini': await import(
				/* webpackChunkName: "hljs_l_ini" */
				'highlight.js/lib/languages/ini'
			), // also includes TOML
			'javascript': await import(
				/* webpackChunkName: "hljs_l_javascript" */
				'highlight.js/lib/languages/javascript'
			),
			'json': await import(
				/* webpackChunkName: "hljs_l_json" */
				'highlight.js/lib/languages/json'
			),
			'makefile': await import(
				/* webpackChunkName: "hljs_l_makefile" */
				'highlight.js/lib/languages/makefile'
			),
			'markdown': await import(
				/* webpackChunkName: "hljs_l_markdown" */
				'highlight.js/lib/languages/markdown'
			),
			'powershell': await import(
				/* webpackChunkName: "hljs_l_powershell" */
				'highlight.js/lib/languages/powershell'
			),
			'typescript': await import(
				/* webpackChunkName: "hljs_l_typescript" */
				'highlight.js/lib/languages/typescript'
			),
			'xml': await import(
				/* webpackChunkName: "hljs_l_xml" */
				'highlight.js/lib/languages/xml'
			),
			'yaml': await import(
				/* webpackChunkName: "hljs_l_yaml" */
				'highlight.js/lib/languages/yaml'
			),
		};

		for( const key in imports ) {
			const lang = imports[key].default;
			TextView.hljs.registerLanguage( key, lang );
		}

		return TextView.hljs;
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		const block = document.createElement( 'div' );
		block.className = 'code';

		this.nodeView.appendChild( block );

		this.parser.getText( async ( _err, text ) => {
			block.textContent = text;

			const lang = this.parser.detectLanguage();

			if( lang ) {
				const hljs = await TextView.initHljs();

				block.className += ' language-' + lang;
				hljs.highlightElement( block );
			}

			this.mdAdd( 'Lines', ( text.match( /\n/g ) || [] ).length );
			this.buildMetaNode();

			cb();
		} );
	}


};
