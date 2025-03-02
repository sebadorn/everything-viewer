import { Button } from '../../ui/components/Button.js';
import { ButtonGroup } from '../../ui/components/ButtonGroup.js';
import { BaseView } from '../BaseView.js';


export class TextView extends BaseView {


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
	 * @returns {Promise<HLJSApi>}
	 */
	static async initHljs() {
		if( TextView.hljs ) {
			return TextView.hljs;
		}

		// Assignment to `window` necessary for `highlightjs-line-numbers` to work.
		TextView.hljs = window.hljs = ( await import(
			/* webpackChunkName: "hljs_core" */
			'highlight.js/lib/core'
		) ).default;

		await import(
			/* webpackChunkName: "hlsjs_line_numbers" */
			'highlightjs-line-numbers.js'
		);

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

		TextView.hljs.initLineNumbersOnLoad( {
			singleLine: true,
		} );

		return TextView.hljs;
	}


	/**
	 *
	 * @param {function?} cb
	 */
	load( cb ) {
		const lang = this.parser.detectLanguage();

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

			const hljs = await TextView.initHljs();

			if( lang ) {
				block.className += ' language-' + lang;
				hljs.highlightElement( block );
			}

			hljs.lineNumbersBlock( block );

			this.mdAdd( 'Lines', ( text.match( /\n/g ) || [] ).length );
			this.buildMetaNode();
			this._openWindow( { width: 1000 } );

			cb?.();
		} );
	}


};
