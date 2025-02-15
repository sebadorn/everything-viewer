import { VCFParser } from './VCFParser.js';
import { VCFView } from './VCFView.js';
import { Plugin, Priority } from '../Plugin.js';


export class VCFPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		if( fileInfo.ext === 'vcf' || fileInfo.mimeType === 'text/vcard' ) {
			return Priority.HIGH;
		}

		return Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {VCFParser}
	 */
	getParser() {
		this._parser ??= new VCFParser( this._importData );
		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {VCFView}
	 */
	getView() {
		this._view ??= new VCFView( this.getParser() );
		return this._view;
	}


};
