'use strict';


/**
 * @namespace Evy.FileHandler
 */
Evy.FileHandler = {


	/**
	 *
	 * @param  {File} file
	 * @return {Evy.BaseParser}
	 */
	getParser( file ) {
		return new Evy.BaseParser( file );
	},


	/**
	 *
	 * @param  {Evy.BaseParser} parser
	 * @return {Evy.UI.BaseView}
	 */
	getView( parser ) {
		const ext = parser.getFileExt();
		const type = parser.file.type.toLowerCase();

		if( type.startsWith( 'image/' ) ) {
			return new Evy.UI.ImageView( parser );
		}
		else if(
			type.startsWith( 'text/' ) ||
			(
				ext === 'bat' &&
				type === 'application/x-msdos-program'
			)
		) {
			return new Evy.UI.TextView( parser );
		}

		return new Evy.UI.BaseView( parser );
	}


};
