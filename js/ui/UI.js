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
		this._registerDrop();
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

			view.load( () => this.update( view ) );
		} );
	},


	/**
	 *
	 * @private
	 * @param {?Evy.UI.BaseView} view
	 */
	_updateMetaInfo( view ) {
		const meta = document.querySelector( '.app .meta-container' );
		meta.appendChild( view.nodeMeta );
	},


	/**
	 *
	 * @private
	 * @param {?Evy.UI.BaseView} view
	 */
	_updateViewer( view ) {
		const viewer = document.querySelector( 'main .viewer' );
		const note = viewer.querySelector( '.note-dragdrop' );

		if( !view ) {
			note.style.display = '';
			return;
		}

		note.style.display = 'none';

		viewer.appendChild( view.nodeView );
	},


	/**
	 *
	 * @param  {number} value - Duration in milliseconds.
	 * @return {string}
	 */
	formatDuration( value ) {
		let duration = Number( value );

		if( isNaN( duration ) ) {
			return value;
		}

		let units = ['sec', 'min', 'h'];
		let unit = 'ms';
		let i = 0;

		if( duration >= 1000 ) {
			duration /= 1000;
			unit = units[i];
			i++;
		}

		while( duration >= 60 && i < units.length ) {
			duration /= 60;
			unit = units[i];
			i++;
		}

		let result = Math.floor( duration ) + unit;

		if( unit !== 'ms' ) {
			let remainder = duration - Math.floor( duration );
			remainder *= 60;

			if( remainder > 0 ) {
				result += ' ' + Math.floor( remainder ) + units[i - 2];
			}
		}

		return result;
	},


	/**
	 *
	 * @param  {number}   value
	 * @param  {boolean} [useBinary=false]
	 * @return {string}
	 */
	formatSize( value, useBinary = false ) {
		let size = Number( value );

		if( isNaN( size ) ) {
			return value;
		}

		const unitsBinary = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
		const unitsDecimal = ['kB', 'MB', 'GB', 'TB', 'PB'];

		let step = useBinary ? 1024 : 1000;
		let units = useBinary ? unitsBinary : unitsDecimal;
		let unit = 'B';
		let i = 0;

		while( size >= step && i < units.length ) {
			size /= step;
			unit = units[i];
			i++;
		}

		return size.toFixed( 1 ) + ' ' + unit;
	},


	/**
	 *
	 * @param {?Evy.UI.BaseView} view
	 */
	update( view ) {
		if( Evy.currentView ) {
			Evy.currentView.destroy();
		}

		Evy.currentView = view;

		this._updateMetaInfo( view );
		this._updateViewer( view );
	}


};
