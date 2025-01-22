import { UI } from '../UI.js';


export class BaseView {


	/**
	 *
	 * @param {BaseParser}  parser
	 * @param {string}         [type="base"]
	 */
	constructor( parser, type = 'base' ) {
		this.parser = parser;
		this.type = type;

		this.metaData = [
			{ name: 'Filename', value: this.parser.file.name },
			{ name: 'Type', value: this.parser.mimeType },
			{ name: 'Filesize', value: Evy.UI.formatSize( this.parser.file.size ) }
		];

		this.nodeView = document.createElement( 'div' );
		this.nodeView.className = 'view view-' + this.type;

		this.nodeMeta = document.createElement( 'div' );
		this.nodeMeta.className = 'meta meta-' + this.type;
	}


	/**
	 *
	 * @private
	 * @param  {object} md
	 * @return {HTMLElement}
	 */
	_buildMetaDataRow( md ) {
		const row = document.createElement( 'tr' );

		if( md.hr ) {
			const td = document.createElement( 'td' );
			td.colSpan = 2;

			row.classList.add( 'hr' );
			row.append( td );
		}
		else if( typeof md.group === 'string' ) {
			const caption = document.createElement( 'caption' );
			caption.textContent = md.group;

			const table = document.createElement( 'table' );
			table.classList.add( 'group-table' );
			table.append( caption );

			md.items.forEach( item => {
				table.append( this._buildMetaDataRow( item ) );
			} );

			const td = document.createElement( 'td' );
			td.colSpan = 2;
			td.append( table );

			row.classList.add( 'group' );
			row.append( td );
		}
		else {
			const key = md.name;
			const value = md.value;

			const itemName = document.createElement( 'th' );
			itemName.className = 'name';
			itemName.textContent = key + ': ';

			const itemValue = document.createElement( 'td' );
			itemValue.className = 'value';
			itemValue.textContent = value;

			row.classList.add( 'item' );
			row.append( itemName, itemValue );
		}

		return row;
	}


	/**
	 *
	 * @param {?object}  options
	 * @param {?boolean} options.toggleForEmpty
	 */
	buildMetaNode( options = {} ) {
		if( Object.keys( this.metaData ).length === 0 ) {
			return;
		}

		if( this.nodeMeta ) {
			this.nodeMeta.querySelector( '.meta-table' )?.remove();
			this.nodeMeta.querySelector( '.option-toggle-empty' )?.remove();
		}

		if( options.toggleForEmpty ) {
			const line = UI.buildHTML(
				'<div class="option option-toggle-empty">' +
					'<input type="checkbox" id="metadata-toggle-empty" value="1" />' +
					'<label for="metadata-toggle-empty">Omit empty entries</label>' +
				'</div>'
			);

			const input = line.querySelector( 'input' );
			input.addEventListener( 'change', _ev => this.toggleEmptyMetaData( input.checked ) );

			this.nodeMeta.append( line );
		}

		const table = document.createElement( 'table' );
		table.className = 'meta-table';

		this.metaData.forEach( md => {
			const row = this._buildMetaDataRow( md );
			table.append( row );
		} );

		this.nodeMeta.append( table );
	}


	/**
	 *
	 */
	destroy() {
		this.nodeView.remove();
		this.nodeMeta.remove();
	}


	/**
	 * Load and build the view's contents.
	 * @param {function} cb
	 */
	load( cb ) {
		const note = document.createElement( 'p' );
		note.className = 'note';
		note.textContent = `No parser found for file of type: "${this.parser.mimeType}"`;

		this.buildMetaNode();

		this.nodeView.append( note );

		cb();
	}


	/**
	 * Add item to meta data.
	 * @param {string} name
	 * @param {string} value
	 */
	mdAdd( name, value ) {
		this.metaData.push( { name, value } );
	}


	/**
	 * Add a group of items to the meta data.
	 * @param {string}   name
	 * @param {object[]} items
	 */
	mdAddGroup( name, items ) {
		this.metaData.push( { group: name, items } );
	}


	/**
	 * Add a horizontal rule to the meta data.
	 */
	mdHR() {
		this.metaData.push( { hr: 1 } );
	}


	/**
	 *
	 * @param {boolean} hide
	 */
	toggleEmptyMetaData( hide ) {
		if( !hide ) {
			const allHidden = this.nodeMeta.querySelectorAll( 'tr[hidden]' );
			allHidden.forEach( row => row.removeAttribute( 'hidden' ) );
		}
		else {
			// Make sure all still visible horizontal rules
			// are hidden if they are at the beginning or end.
			const handleHR = parent => {
				let changes = 0;

				const notHidden = parent.querySelectorAll( ':scope > tr:not([hidden])' );
				notHidden.forEach( ( row, index ) => {
					if(
						row.classList.contains( 'hr' ) &&
						( index === 0 || index === notHidden.length - 1 )
					) {
						row.setAttribute( 'hidden', '' );
						changes++;
					}
				} );

				if( changes > 0 ) {
					handleHR( parent );
				}
			};

			const handleRows = ( rows, parent ) => {
				let prevWasHR = false;

				rows.forEach( row => {
					if( row.classList.contains( 'hr' ) ) {
						if( prevWasHR ) {
							row.setAttribute( 'hidden', '' );
						}

						prevWasHR = true;
					}
					else {
						const value = row.querySelector( 'td.value' ).innerHTML;

						if( value.length === 0 ) {
							row.setAttribute( 'hidden', '' );
						}
						else {
							prevWasHR = false;
						}
					}
				} );

				handleHR( parent );
			};

			const groups = this.nodeMeta.querySelectorAll( '.meta-table .group-table' );
			groups.forEach( group => {
				const rows = group.querySelectorAll( ':scope > tr.item' );
				handleRows( rows, group );
			} );

			const rows = this.nodeMeta.querySelectorAll( '.meta-table > tr.item' );
			handleRows( rows, this.nodeMeta );
		}
	}


};
