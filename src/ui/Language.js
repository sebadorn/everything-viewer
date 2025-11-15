export const Language = {


	supported: [
		'de',
		'en',
	],

	/** @type {string?} */
	_current: null,

	/**
	 *
	 * @returns {string?}
	 */
	get current() {
		return this._current ?? this._fallback;
	},

	_fallback: 'en',

	/** @type {object} */
	_languages: {},

	_storageKey: 'everythingviewer.language.selected',


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
	 * @param {string} langNow
	 * @param {string} langNext
	 * @returns {string}
	 */
	getConfirmMessage( langNow, langNext ) {
		const txtNow = this._languages[langNow]?.['language.reload'];
		const txtNext = this._languages[langNext]?.['language.reload'];

		let txt = '';

		if( txtNow ) {
			txt += txtNow;
		}

		if( txtNext ) {
			if( txtNow ) {
				txt += '\n\n';
			}

			txt += txtNext;
		}

		return txt;
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
	 * @returns {Promise<boolean>}
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
			console.warn( `[Language.load] Unsupported language: ${langCode}` );
			langCode = this._fallback;
		}

		if( langCode === this._current ) {
			console.debug( `[Language.load] Language did not change, nothing to do: ${langCode}` );
			return false;
		}

		try {
			const response = await fetch( `/language/${langCode}.json` );
			this._languages[langCode] = await response.json();
			this._current = langCode;
			this.saveCurrent();

			console.debug( `[Language.load] Loaded: ${langCode}` );
		}
		catch( err ) {
			console.error( '[Language.load]', err );
			return false;
		}

		return true;
	},


	/**
	 *
	 */
	saveCurrent() {
		localStorage.setItem( this._storageKey, this._current );
	},


};


/**
 *
 * @param {string} key
 * @param {string?} fallback
 * @returns {string}
 */
export function t( key, fallback ) {
	return Language._languages[Language._current]?.[key] || fallback || key;
};
