export const DocumentUtils = {


	_domParser: new DOMParser(),

	get domParser() { return this._domParser; },


	/**
	 *
	 * @param {string} html
	 * @param {string?} [type = 'text/html']
	 * @returns {Document}
	 */
	buildDocument( html, type = 'text/html' ) {
		return this._domParser.parseFromString( html, type );
	},


	/**
	 *
	 * @param {string} content
	 * @returns {string}
	 */
	decodeContent( content ) {
		content = content.replaceAll( /=[\r]?\n/g, '' );
		content = content.replaceAll( /(=[0-9A-Z]{2})+/g, match => {
			try {
				return decodeURIComponent( match.replaceAll( '=', '%' ) );
			}
			catch( err ) {
				console.error( '[DocumentUtils.decodeContent]', err, match );
				return match;
			}
		} );

		return content;
	},


	/**
	 * Try to remove or disable everything that loads external resources.
	 * @param {Document} doc 
	 */
	removeExternalResources( doc ) {
		// Remove src of images, except if the data is inlined.
		const images = doc.querySelectorAll( 'img' );
		images.forEach( img => {
			const src = img.getAttribute( 'src' ) || '';

			if( !src.startsWith( 'data:' ) ) {
				img.removeAttribute( 'src' );
			}
		} );

		// Remove certain elements completely.
		const toRemove = doc.querySelectorAll( [
			'audio[src]',
			'embed',
			'iframe',
			'link[rel="stylesheet"]',
			'object',
			'script',
			'source',
			'video[src]',
		].join( ',' ) );
		toRemove.forEach( node => node.remove() );

		// Remove certain attributes.
		const attr = doc.querySelectorAll( '[background]' );
		attr.forEach( node => {
			const value = node.getAttribute( 'background' ) || '';

			if( value.includes( '//' ) ) {
				node.removeAttribute( 'background' );
			}
		} );

		// Styles
		const styles = doc.querySelectorAll( 'style' );
		styles.forEach( node => {
			let style = node.textContent;
			style = style.replaceAll( /url[ \t]*\([ \t]*.+[ \t]*\)/gi, 'url()' );
			node.textContent = style;
		} );
	},


};
