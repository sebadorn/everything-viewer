import { Model3DParser } from './Model3DParser.js';
import { Model3DView } from './Model3DView.js';
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
	 * @returns {Model3DParser}
	 */
	getParser() {
		this._parser ??= new Model3DParser( this._importData );
		return this._parser;
	}


	/**
	 * 
	 * @override
	 * @returns {Model3DView}
	 */
	getView() {
		this._view ??= new Model3DView( this.getParser() );
		return this._view;
	}


};
