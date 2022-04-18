'use strict';


{

class ZIPParser extends Evy.BaseParser {


	/**
	 *
	 * @constructor
	 * @param {File}   file
	 * @param {string} mimeType
	 */
	constructor( file, mimeType ) {
		super( file, mimeType );
	}


	/**
	 *
	 * @param  {JSZip} zip
	 * @return {?HTMLDocument}
	 */
	buildHTML( zip ) {
		const list = document.createElement( 'ol' );
		list.className = 'zip';

		for( const name in zip.files ) {
			const item = document.createElement( 'li' );
			item.textContent = name;

			list.append( item );
		}

		return list;
	}


	/**
	 *
	 * @param {function} cb
	 */
	getHTML( cb ) {
		this.getArrayBuffer( ( _err, arrayBuffer ) => {
			this.parse( arrayBuffer, ( err, zip ) => {
				if( err ) {
					cb( err );
					return;
				}

				const html = this.buildHTML( zip );
				cb( null, html );
			} );
		} );
	}


	/**
	 *
	 * @param {ArrayBuffer} text
	 * @param {function}    cb
	 */
	parse( arrayBuffer, cb ) {
		Evy.ensureScript( 'JSZip', () => {
			const zip = new JSZip();
			const promise = zip.loadAsync( arrayBuffer );

			promise.then(
				zip => cb( null, zip ),
				err => cb( err, null )
			);
		} );
	}


}


Evy.ZIPParser = ZIPParser;

}
