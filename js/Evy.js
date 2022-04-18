'use strict';


/**
 * @namespace Evy
 */
const Evy = {


	/**
	 * @type {?Evy.UI.BaseView}
	 */
	currentView: null,


	/**
	 *
	 */
	init() {
		this._loadScripts( () => {
			Evy.UI.init();
		} );
	},


	/**
	 *
	 * @private
	 * @param {function} cb
	 */
	_loadScripts( cb ) {
		const scripts = [
			'FileHandler.js',
			'parser/BaseParser.js', // Include first of the parsers.
			'parser/CSVParser.js',
			'parser/EMLParser.js',
			'ui/UI.js',
			'ui/DropHandler.js',
			'ui/Window.js',
			'ui/views/BaseView.js', // Include first of the views.
			'ui/views/AudioView.js',
			'ui/views/CSVView.js',
			'ui/views/EMLView.js',
			'ui/views/ImageView.js',
			'ui/views/PDFView.js',
			'ui/views/TextView.js',
			'ui/views/VideoView.js'
		];

		const next = i => {
			if( i >= scripts.length ) {
				cb();
				return;
			}

			const node = document.createElement( 'script' );
			node.onload = () => next( i + 1 );
			node.src = 'js/' + scripts[i];

			document.head.append( node );
		};

		next( 0 );
	},


	/**
	 *
	 * @param {string}   key
	 * @param {function} cb
	 */
	ensureScript( key, cb ) {
		key = key.toLowerCase();

		const map = {
			csv: {
				path: 'lib/csv.min.js',
				testLoaded: () => typeof CSV !== 'undefined'
			},
			hljs: {
				path: 'lib/highlight.min.js',
				testLoaded: () => typeof hljs !== 'undefined'
			}
		};

		const item = map[key];

		if( !item ) {
			console.error( '[Evy.ensureScript] No item for key: ' + key );
			return;
		}

		if( item.testLoaded() ) {
			cb();
			return;
		}

		const node = document.createElement( 'script' );
		node.onload = () => {
			console.log( '[Evy.ensureScript] Loaded script: ' + item.path );
			cb();
		};
		node.src = 'js/' + item.path;

		document.head.append( node );
	},


	/**
	 *
	 * @param  {*} value
	 * @return {boolean}
	 */
	isNumber( value ) {
		return typeof value === 'number' && !isNaN( value );
	},


	/**
	 *
	 * @param  {*} value
	 * @return {boolean}
	 */
	isObject( value ) {
		return typeof value === 'object' && value !== null;
	}


};
