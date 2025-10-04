import { Plugin, Priority } from '../Plugin.js';


export class Model3DPlugin extends Plugin {


	/**
	 *
	 * @override
	 * @param {import('../Registry.js').ImportData} fileInfo
	 * @returns {number}
	 */
	canHandleImport( fileInfo ) {
		const formats = [
			'glb',
			// 'gltf',
			'obj',
			'ply',
			'splat',
			'stl',
		];

		return formats.includes( fileInfo.ext ) ? Priority.HIGH : Priority.NONE;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<Model3DParser>}
	 */
	async getParser() {
		if( this._parser ) {
			return this._parser;
		}

		const { Model3DParser } = await import(
			/* webpackChunkName: "model3dparser" */
			'./Model3DParser.js'
		);

		this._parser = new Model3DParser( this._importData );

		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Promise<Model3DView>}
	 */
	async getView() {
		if( this._view ) {
			return this._view;
		}

		const { Model3DView } = await import(
			/* webpackChunkName: "model3dview" */
			'./Model3DView.js'
		);

		this._view = new Model3DView( await this.getParser() );

		return this._view;
	}


};
