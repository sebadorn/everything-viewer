import { DocumentUtils } from '../DocumentUtils.js';
import { Registry } from '../plugins/Registry.js';


export const UI = {


	/**
	 *
	 * @private
	 * @param {BaseView?} view
	 */
	_updateMetaInfo( view ) {
		const meta = document.querySelector( '#meta-container' );

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
	 * @param {BaseView?} view
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
	 * @param {string} html
	 * @returns {HTMLElement}
	 */
	build( html ) {
		const doc = DocumentUtils.buildDocument( html.trim() );
		let node = null;

		if( doc.body.childElementCount > 1 ) {
			node = document.createDocumentFragment();
			node.append( ...doc.body.children );
		}
		else {
			// Remove from DOM tree, otherwise the parentElement/parentNode
			// would be "body", but we want a "free floating" element.
			node = doc.body.firstChild;
			node.remove();
		}

		return node;
	},


	/**
	 *
	 * @param  {string}  name
	 * @param  {string}  value
	 * @param  {object?} options
	 * @param  {bool}    [options.valueAsHTML = false]
	 * @return {HTMLElement}
	 */
	buildTableRow( name, value, options = {} ) {
		const th = document.createElement( 'th' );
		th.textContent = name;

		const td = document.createElement( 'td' );

		if( options.valueAsHTML === true ) {
			td.innerHTML = value;
		}
		else {
			td.textContent = value;
		}

		const row = document.createElement( 'tr' );
		row.append( th, td );

		return row;
	},


	/**
	 *
	 * @param {string} value
	 * @returns {string}
	 */
	escapeHTML( value ) {
		value = String( value );
		value = value.replaceAll( '&', '&amp;' );
		value = value.replaceAll( '<', '&lt;' );
		value = value.replaceAll( '>', '&gt;' );
		value = value.replaceAll( '"', '&quot;' );
		value = value.replaceAll( "'", '&#039;' );

		return value;
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
	 * @param {HTMLImageElement} image
	 * @param {function} cb
	 */
	onImageComplete( image, cb ) {
		if( image.complete ) {
			cb();
		}
		else {
			image.onload = cb;
		}
	},


	/**
	 *
	 * @param {File|FileSystemDirectoryEntry} fileOrDir
	 */
	async open( fileOrDir ) {
		if( !fileOrDir ) {
			return;
		}

		const plugin = await Registry.getPluginForImport( fileOrDir );
		const view = plugin.getView();
		view.load();
	},


	/**
	 *
	 * @param {Node} node
	 */
	removeAllChildren( node ) {
		while( node.firstChild ) {
			node.removeChild( node.lastChild );
		}
	},


	/**
	 *
	 * @param {BaseView?} view
	 */
	update( view ) {
		// this._updateMetaInfo( view );
		// this._updateViewer( view );
	},


};
