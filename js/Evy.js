export const Evy = {


	/**
	 *
	 * @param {string}    key
	 * @param {?function} cb
	 */
	ensureScript( key, cb ) {
		key = key.toLowerCase();

		const map = {
			omggif: {
				path: 'lib/omggif.js',
				testLoaded: () => typeof GifReader !== 'undefined',
			},
		};

		const item = map[key];

		if( !item ) {
			console.error( '[Evy.ensureScript] No item for key: ' + key );
			return;
		}

		if( item.testLoaded() ) {
			cb && cb();
			return;
		}

		const scripts = Array.isArray( item.path ) ? item.path : [item.path];

		const loadScript = i => {
			if( i >= scripts.length ) {
				cb && cb();
				return;
			}

			const script = scripts[i];

			const node = document.createElement( 'script' );
			node.onload = () => {
				console.log( '[Evy.ensureScript] Loaded script: ' + script );
				loadScript( i + 1 );
			};
			node.src = 'js/' + script;

			document.head.append( node );
		};

		loadScript( 0 );
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


};
