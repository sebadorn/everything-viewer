export const Language = {


	/** @type {string?} */
	current: null,

	fallback: 'en',

	supported: [
		'de',
		'en',
	],

	/** @type {object?} */
	_language: null,

	_storageKey: 'everythingviewer.language.selected',


	/**
	 *
	 */
	apply() {
		// TODO:
	},


	/**
	 *
	 * @returns {string}
	 */
	getBrowserLanguage() {
		let lang = window.navigator.language;
		lang = lang.split( '-' )[0];
		lang = lang.toLowerCase();

		console.debug( '[Language.getBrowserLanguage] Language detected as:', lang );

		return lang;
	},


	/**
	 *
	 * @returns {string?}
	 */
	getSaved() {
		return localStorage.getItem( this._storageKey );
	},


	/**
	 *
	 * @param {string?} langCode
	 */
	async load( langCode ) {
		if( !langCode ) {
			langCode = this.getSaved();

			if( !langCode ) {
				langCode = this.getBrowserLanguage();
			}
		}
		else {
			langCode = langCode.toLowerCase();
		}

		if( !this.supported.includes( langCode ) ) {
			console.warn( '[Language.load] Unsupported language:', langCode );
			langCode = this.fallback;
		}

		if( langCode === this.current ) {
			return;
		}

		try {
			const response = await fetch( `/language/${langCode}.json` );
			this._language = await response.json();
			this.current = langCode;
			this.saveCurrent();

			console.debug( '[Language.load] Loaded:', langCode );
		}
		catch( err ) {
			console.error( '[Language.load]', err );
		}
	},


	/**
	 *
	 */
	saveCurrent() {
		localStorage.setItem( this._storageKey, this.current );
	},


};


/**
 *
 * @param {string} key
 * @param {string?} fallback
 * @returns {string}
 */
export function t( key, fallback ) {
	return Language._language?.[key] || fallback || key;
};
