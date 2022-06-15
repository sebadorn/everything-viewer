'use strict';


{

class DICOMView extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.DICOMParser} parser
	 */
	constructor( parser ) {
		super( parser, 'dicom' );
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		this.parser.parse( ( _err, buffer ) => {
			Evy.ensureScript( 'xtk', () => {
				this.buildMetaNode();
				cb();

				const r = new X.renderer3D();
				r.container = this.nodeView;
				r.init();

				const volume = new X.volume();
				volume.file = this.parser.file.name;
				volume.filedata = buffer;

				r.add( volume );
				r.render();
			} );
		} );
	}


}


Evy.UI.DICOMView = DICOMView;

}
