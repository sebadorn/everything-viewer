'use strict';


/**
 * @namespace Evy.UI
 */
Evy.UI = {


	_dropHandler: null,


	/**
	 *
	 */
	init() {
		this._registerButtons();
		this._registerDrop();
	},


	/**
	 *
	 * @private
	 */
	_registerButtons() {
		// TODO:
	},


	/**
	 *
	 * @private
	 */
	_registerDrop() {
		const area = document.querySelector( 'main .viewer' );
		this._dropHandler = new this.DropHandler( area );

		this._dropHandler.on( 'file', file => {
			const parser = Evy.FileHandler.getParser( file );
			const view = Evy.FileHandler.getView( parser );

			view.load( () => this.updateViewer( view ) );
		} );
	},


	/**
	 *
	 * @param {?Evy.UI.BaseView} view
	 */
	updateViewer( view ) {
		Evy.currentView = view;

		const viewer = document.querySelector( 'main .viewer' );

		const views = viewer.querySelectorAll( '.view' );
		views.forEach( view => viewer.removeChild( view ) );

		const note = viewer.querySelector( '.note-dragdrop' );

		if( !view ) {
			note.style.display = '';
			return;
		}

		note.style.display = 'none';

		viewer.appendChild( view.node );

	}


};
