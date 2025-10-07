export const Utils = {


	/**
	 * Get the value for the given key. Comparisons of strings are **case-insensitive**.
	 * @param {object} o
	 * @param {string} key
	 * @returns {*}
	 */
	getValueForKey( o, key ) {
		key = String( key ).toLowerCase();

		const keys = Object.keys( o );

		for( let i = 0; i < keys.length; i++ ) {
			const k = keys[i];

			if( k.toLowerCase() === key ) {
				return o[k];
			}
		}

		return undefined;
	},


};