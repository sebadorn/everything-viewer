'use strict';


{

class DICOMParser extends Evy.BaseParser {


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
	 * @param {function} cb
	 */
	parse( cb ) {
		this.getArrayBuffer( ( _err, buffer ) => {
			cb( null, buffer );
		} );
	}


}


Evy.DICOMParser = DICOMParser;

}
