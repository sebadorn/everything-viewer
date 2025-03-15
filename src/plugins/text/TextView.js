import { FileHandler } from '../../FileHandler.js';
import { Button } from '../../ui/components/Button.js';
import { ButtonGroup } from '../../ui/components/ButtonGroup.js';
import { BaseView } from '../BaseView.js';


export class TextView extends BaseView {


	static _imports = {};


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'text' );

		this._originalText = '';
		this._formatted = null;
	}


	/**
	 *
	 * @private
	 * @param {HTMLElement} block
	 * @returns {ButtonGroup}
	 */
	_buildButtonsJson( block ) {
		return new ButtonGroup( [
			new Button( {
				text: 'Original',
				classes: 'selected',
				onClick: () => {
					delete block.dataset.highlighted;
					block.innerHTML = '';
					block.textContent = this._originalText;
					TextView.hljs.highlightElement( block );
					TextView.hljs.lineNumbersBlock( block );
				},
			} ),
			new Button( {
				text: 'Formatted',
				onClick: () => {
					let formatted = this._originalText;

					if( this._formatted ) {
						formatted = this._formatted;
					}
					else {
						try {
							formatted = JSON.parse( this._originalText );
							formatted = JSON.stringify( formatted, null, 2 );
							this._formatted = formatted;
						}
						catch( err ) {
							console.error( '[TextView._buildButtonsJson]', err.message );
							window.alert( err.message );
						}
					}

					delete block.dataset.highlighted;
					block.innerHTML = '';
					block.textContent = formatted;
					TextView.hljs.highlightElement( block );
					TextView.hljs.lineNumbersBlock( block );
				},
			} ),
		] );
	}


	/**
	 *
	 * @param {string?} lang
	 * @returns {Promise<HLJSApi>}
	 */
	static async initHljs( lang ) {
		if( !TextView.hljs ) {
			// Assignment to `window` necessary for `highlightjs-line-numbers` to work.
			TextView.hljs = window.hljs = ( await import(
				/* webpackChunkName: "hljs_core" */
				'highlight.js/lib/core'
			) ).default;

			await import(
				/* webpackChunkName: "hlsjs_line_numbers" */
				'highlightjs-line-numbers.js'
			);

			TextView.hljs.initLineNumbersOnLoad( {
				singleLine: true,
			} );
		}

		if( lang && !TextView._imports[lang] ) {
			let imp = null;

			switch( lang ) {
				case 'apache':
					imp = await import(
						/* webpackChunkName: "hljs_l_apache" */
						'highlight.js/lib/languages/apache'
					);
					break;

				case 'bash':
					imp = await import(
						/* webpackChunkName: "hljs_l_bash" */
						'highlight.js/lib/languages/bash'
					);
					break;

				case 'c':
					imp = await import(
						/* webpackChunkName: "hljs_l_c" */
						'highlight.js/lib/languages/c'
					);
					break;

				case 'cmake':
					imp = await import(
						/* webpackChunkName: "hljs_l_cmake" */
						'highlight.js/lib/languages/cmake'
					);
					break;

				case 'cpp':
					imp = await import(
						/* webpackChunkName: "hljs_l_cpp" */
						'highlight.js/lib/languages/cpp'
					);
					break;

				case 'csharp':
					imp = await import(
						/* webpackChunkName: "hljs_l_csharp" */
						'highlight.js/lib/languages/csharp'
					);
					break;

				case 'css':
					imp = await import(
						/* webpackChunkName: "hljs_l_css" */
						'highlight.js/lib/languages/css'
					);
					break;

				case 'd':
					imp = await import(
						/* webpackChunkName: "hljs_l_d" */
						'highlight.js/lib/languages/d'
					);
					break;

				case 'dart':
					imp = await import(
						/* webpackChunkName: "hljs_l_dart" */
						'highlight.js/lib/languages/dart'
					);
					break;

				case 'diff':
					imp = await import(
						/* webpackChunkName: "hljs_l_diff" */
						'highlight.js/lib/languages/diff'
					);
					break;

				case 'dns':
				case 'zone':
					imp = await import(
						/* webpackChunkName: "hljs_l_dns" */
						'highlight.js/lib/languages/dns'
					);
					break;

				case 'glsl':
					imp = await import(
						/* webpackChunkName: "hljs_l_glsl" */
						'highlight.js/lib/languages/glsl'
					);
					break;

				case 'ini':
					imp = await import(
						/* webpackChunkName: "hljs_l_ini" */
						'highlight.js/lib/languages/ini'
					); // also includes TOML
					break;

				case 'java':
					imp = await import(
						/* webpackChunkName: "hljs_l_java" */
						'highlight.js/lib/languages/java'
					);
					break;

				case 'javascript':
					imp = await import(
						/* webpackChunkName: "hljs_l_javascript" */
						'highlight.js/lib/languages/javascript'
					);
					break;

				case 'json':
					imp = await import(
						/* webpackChunkName: "hljs_l_json" */
						'highlight.js/lib/languages/json'
					);
					break;

				case 'latex':
					imp = await import(
						/* webpackChunkName: "hljs_l_latex" */
						'highlight.js/lib/languages/latex'
					);
					break;

				case 'less':
					imp = await import(
						/* webpackChunkName: "hljs_l_less" */
						'highlight.js/lib/languages/less'
					);
					break;

				case 'lua':
					imp = await import(
						/* webpackChunkName: "hljs_l_lua" */
						'highlight.js/lib/languages/lua'
					);
					break;

				case 'makefile':
					imp = await import(
						/* webpackChunkName: "hljs_l_makefile" */
						'highlight.js/lib/languages/makefile'
					);
					break;

				case 'markdown':
					imp = await import(
						/* webpackChunkName: "hljs_l_markdown" */
						'highlight.js/lib/languages/markdown'
					);
					break;

				case 'php':
					imp = await import(
						/* webpackChunkName: "hljs_l_php" */
						'highlight.js/lib/languages/php'
					);
					break;

				case 'powershell':
					imp = await import(
						/* webpackChunkName: "hljs_l_powershell" */
						'highlight.js/lib/languages/powershell'
					);
					break;

				case 'properties':
					imp = await import(
						/* webpackChunkName: "hljs_l_properties" */
						'highlight.js/lib/languages/properties'
					);
					break;

				case 'python':
					imp = await import(
						/* webpackChunkName: "hljs_l_python" */
						'highlight.js/lib/languages/python'
					);
					break;

				case 'ruby':
					imp = await import(
						/* webpackChunkName: "hljs_l_ruby" */
						'highlight.js/lib/languages/ruby'
					);
					break;

				case 'rust':
					imp = await import(
						/* webpackChunkName: "hljs_l_rust" */
						'highlight.js/lib/languages/rust'
					);
					break;

				case 'scss':
					imp = await import(
						/* webpackChunkName: "hljs_l_scss" */
						'highlight.js/lib/languages/scss'
					);
					break;

				case 'sql':
					imp = await import(
						/* webpackChunkName: "hljs_l_sql" */
						'highlight.js/lib/languages/sql'
					);
					break;

				case 'typescript':
					imp = await import(
						/* webpackChunkName: "hljs_l_typescript" */
						'highlight.js/lib/languages/typescript'
					);
					break;

				case 'xml':
					imp = await import(
						/* webpackChunkName: "hljs_l_xml" */
						'highlight.js/lib/languages/xml'
					);
					break;

				case 'yaml':
					imp = await import(
						/* webpackChunkName: "hljs_l_yaml" */
						'highlight.js/lib/languages/yaml'
					);
					break;

				default:
					console.warn( '[TextView.initHljs] Language not found: ' + lang );
			}

			if( imp ) {
				TextView._imports[lang] = true;
				TextView.hljs.registerLanguage( lang, imp.default );
			}
		}

		return TextView.hljs;
	}


	/**
	 *
	 * @param {function?} cb
	 */
	load( cb ) {
		const lang = FileHandler.detectLanguage( this.parser.file, this.parser.mimeType );

		const block = document.createElement( 'div' );
		block.className = 'code';

		if( lang === 'json' ) {
			const btnGroup = this._buildButtonsJson( block );
			this.nodeView.appendChild( btnGroup.render() );
		}

		this.nodeView.appendChild( block );

		this.parser.getText( async ( _err, text ) => {
			this._originalText = text;
			block.textContent = text;

			const hljs = await TextView.initHljs( lang );

			if( lang ) {
				block.className += ' language-' + lang;
				hljs.highlightElement( block );

				this.mdAdd( 'Language', lang );
			}

			hljs.lineNumbersBlock( block );

			this.mdAdd( 'Lines', ( text.match( /\n/g ) || [] ).length );
			this.buildMetaNode();
			this._openWindow( { width: 1000 } );

			cb?.();
		} );
	}


};
