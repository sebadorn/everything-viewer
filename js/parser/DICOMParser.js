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
		this.getArrayBuffer( ( _err, arrayBuffer ) => {
			Evy.ensureScript( 'dicom', () => {
				// Allow raw files
				const options = { TransferSyntaxUID: '1.2.840.10008.1.2' };
				const dataSet = dicomParser.parseDicom( new Uint8Array( arrayBuffer ), options );

				cb( null, dataSet );
			} );
		} );
	}


}


Evy.DICOMParser = DICOMParser;

}
