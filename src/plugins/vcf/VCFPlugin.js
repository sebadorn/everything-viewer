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
	 * @returns {Promise<VCFParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { VCFParser } = await import(
			/* webpackChunkName: "vcfparser" */
			'./VCFParser.js'
		);

		this._parser = new VCFParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<VCFView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { VCFView } = await import(
			/* webpackChunkName: "vcfview" */
			'./VCFView.js'
		);

		this._view = new VCFView( await this.getParser() );

		return this._view;
	}


};
