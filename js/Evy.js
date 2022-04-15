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
	},


	/**
	 *
	 * @private
	 * @param {function} cb
	 */
	_loadScripts( cb ) {
		const scripts = [
			'FileHandler.js',
			'parser/BaseParser.js',
			'ui/UI.js',
			'ui/DropHandler.js',
			'ui/views/BaseView.js',
			'ui/views/ImageView.js',
			'ui/views/TextView.js',
			'ui/views/VideoView.js'
		];

		const next = i => {
			if( i >= scripts.length ) {
				cb();
				return;
			}

			const tag = document.createElement( 'script' );
			tag.onload = () => next( i + 1 );
			tag.src = 'js/' + scripts[i];

			document.head.appendChild( tag );
		};

		next( 0 );
	}


};
