import { Plugin, Priority } from '../Plugin.js';
import { FileHandler } from '../../FileHandler.js';


export class TextPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		if(
			FileHandler.isTypeText(
				fileInfo.mimeType,
				fileInfo.ext,
				fileInfo.file.name.toLowerCase()
			)
		) {
			return Priority.GENERIC;
		}

		return Priority.NONE;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<TextView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { TextView } = await import(
			/* webpackChunkName: "textview" */
			'./TextView.js'
		);

		this._view = new TextView( await this.getParser() );

		return this._view;
	}


};
