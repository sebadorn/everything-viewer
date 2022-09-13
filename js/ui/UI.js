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
		this._registerWindows();
	},


	/**
	 *
	 * @private
	 */
	_handleButtonOpen() {
		const input = document.createElement( 'input' );
		input.type = 'file';
		input.addEventListener( 'change', _ev => {
			this._onFile( input.files[0] );
		} );
		input.click();
	},


	/**
	 *
	 * @private
	 * @param {FileSystemDirectoryEntry} dir
	 */
	_onDirectory( dir ) {
		if( !dir ) {
			return;
		}

		Evy.DirectoryHandler.getParser( dir, ( _err, parser ) => {
			if( Evy.currentView ) {
				Evy.currentView.destroy();
			}

			const view = Evy.FileHandler.getView( parser );
			view.load( () => this.update( view ) );
		} );
	},


	/**
	 *
	 * @private
	 * @param {File} file
	 */
	_onFile( file ) {
		if( !file ) {
			return;
		}

		Evy.FileHandler.getParser( file, ( _err, parser ) => {
			if( Evy.currentView ) {
				Evy.currentView.destroy();
			}

			const view = Evy.FileHandler.getView( parser );
			view.load( () => this.update( view ) );
		} );
	},


	/**
	 *
	 * @private
	 */
	_registerButtons() {
		const btnOpen = document.querySelector( '#file-open' );
		btnOpen.addEventListener( 'click', () => this._handleButtonOpen() );
	},


	/**
	 *
	 * @private
	 */
	_registerDrop() {
		const area = document.querySelector( 'main .viewer' );
		this._dropHandler = new this.DropHandler( area );
		this._dropHandler.on( 'file', file => this._onFile( file ) );
		this._dropHandler.on( 'directory', ( dir, topLevelEntries ) => this._onDirectory( dir, topLevelEntries ) );
	},


	/**
	 *
	 * @private
	 */
	_registerWindows() {
		const nodes = document.querySelectorAll( 'aside.window' );
		nodes.forEach( node => new Evy.UI.Window( node ) );
	},


	/**
	 *
	 * @private
	 * @param {?Evy.UI.BaseView} view
	 */
	_updateMetaInfo( view ) {
		const meta = document.querySelector( 'aside.meta-container' );

		if( view ) {
			meta.style.display = 'block';
			meta.querySelector( '.content' ).append( view.nodeMeta );
		}
		else {
			meta.style.display = '';
		}
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

		viewer.append( view.nodeView );
	},


	/**
	 *
	 * @param  {string} str
	 * @return {DocumentFragment}
	 */
	buildHTML( str ) {
		const parser = new DOMParser();
		const doc = parser.parseFromString( str.trim(), 'text/html' );
		const fragment = document.createDocumentFragment();
		fragment.append( ...doc.body.children );

		return fragment;
	},


	/**
	 *
	 * @param  {string} name
	 * @param  {string} value
	 * @return {HTMLElement}
	 */
	buildTableRow( name, value ) {
		const th = document.createElement( 'th' );
		th.textContent = name;

		const td = document.createElement( 'td' );
		td.textContent = value;

		const row = document.createElement( 'tr' );
		row.append( th, td );

		return row;
	},


	/**
	 *
	 * @param  {Date} date
	 * @return {string}
	 */
	formatDate( date ) {
		if( !date ) {
			return '';
		}

		let year = date.getUTCFullYear();
		let month = date.getUTCMonth() + 1;
		let day = date.getUTCDate();

		month = String( month ).padStart( 2, '0' );
		day = String( day ).padStart( 2, '0' );

		return `${year}-${month}-${day}`;
	},


	/**
	 *
	 * @param  {Date} date
	 * @return {string}
	 */
	formatDateTime( date ) {
		if( !date ) {
			return '';
		}

		const dateStr = this.formatDate( date );

		let hours = date.getUTCHours();
		let minutes = date.getUTCMinutes();
		let seconds = date.getUTCSeconds();

		hours = String( hours ).padStart( 2, '0' );
		minutes = String( minutes ).padStart( 2, '0' );
		seconds = String( seconds ).padStart( 2, '0' );

		return dateStr + ` ${hours}:${minutes}:${seconds}`;
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

		let i = 0;
		let units = ['ms', 'sec', 'min', 'h'];
		let unit = units[i++];

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

		if( unit !== units[0] ) {
			let remainder = duration - Math.floor( duration );
			remainder *= unit === units[1] ? 1000 : 60;

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
		Evy.currentView = view;

		this._updateMetaInfo( view );
		this._updateViewer( view );
	}


};
