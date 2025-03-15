import { BaseView } from '../BaseView.js';


export class Model3DView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'model3d' );

		this._objectURL = null;
		this._viewer = null;
	}


	/**
	 *
	 */
	destroy() {
		super.destroy();

		if( this._viewer?.source ) {
			URL.revokeObjectURL( this._viewer.source );
		}

		this._viewer?.remove();
	}


	/**
	 *
	 * @param {function?} cb
	 */
	async load( cb ) {
		const babylonjs = await import(
			/* webpackChunkName: "babylonjs_core" */
			'@babylonjs/core'
		);
		const babylonjsViewer = await import(
			/* webpackChunkName: "babylonjs_viewer" */
			'@babylonjs/viewer'
		);

		this._viewer = new babylonjsViewer.HTML3DElement();
		this._viewer.extension = this.parser.ext;
		this._viewer.source = URL.createObjectURL( this.parser.file );

		this._viewer.addEventListener( 'viewerready', _ev => {
			const scene = this._viewer.viewerDetails.scene;

			scene.cameras[0].onViewMatrixChangedObservable.add( ( evData, _evState ) => {
				const camDir = evData.position;
				const lightDir = scene.lights[0]?.direction;
				lightDir?.set( camDir.x, camDir.y, camDir.z );
			} );
		} );

		this.buildMetaNode();
		this.nodeView.append( this._viewer );

		this._openWindow( {
			height: 600,
			width: 760,
		} );

		cb?.();
	}


};
