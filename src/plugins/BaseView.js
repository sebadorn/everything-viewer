import { Window } from '../ui/components/Window.js';
import { UI } from '../ui/UI.js';


export class BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 * @param {string}     [type = 'base']
	 */
	constructor( parser, type = 'base' ) {
		this.parser = parser;
		this.type = type;

		this.metaData = [
			{ name: 'Filename', value: this.parser.file.name },
			{ name: 'Type', value: this.parser.mimeType },
			{ name: 'Filesize', value: UI.formatSize( this.parser.file.size ) }
		];

		this.nodeView = document.createElement( 'div' );
		this.nodeView.className = 'view view-' + this.type;

		this.nodeMeta = null;
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

			if( md.options?.valueAsHTML === true ) {
				itemValue.innerHTML = value;
			}
			else {
				itemValue.textContent = value;
			}

			if( value === null || typeof value === 'undefined' || String( value ).length === 0 ) {
				itemValue.classList.add( 'empty' );
			}

			row.classList.add( 'item' );
			row.append( itemName, itemValue );
		}

		return row;
	}


	/**
	 *
	 * @private
	 * @param {object?} config
	 * @returns {Window}
	 */
	_openWindow( config ) {
		let content = [this.nodeView];

		if( this.nodeMeta ) {
			const wrap = UI.build( '<div class="layout"></div>' );
			wrap.append( this.nodeMeta, this.nodeView );
			content = [wrap];
		}

		config = config || {};
		config.title ??= UI.escapeHTML( this.parser.file.name );
		config.content ??= content;

		this.window = new Window( config );

		this.window.on( 'close', () => {
			if( config.destroyOrder ) {
				config.destroyOrder.forEach( item => item.destroy() );
			}
			else {
				this.parser?.destroy();
				this.destroy();
			}
		} );

		document.body.append( this.window.render() );
		setTimeout( () => this.window?.center(), 0 );

		return this.window;
	}


	/**
	 *
	 * @param {object?}  options
	 * @param {boolean?} options.toggleForEmpty
	 */
	buildMetaNode( options = {} ) {
		if( Object.keys( this.metaData ).length === 0 ) {
			return;
		}

		let toggleEmptyState = false;

		if( this.nodeMeta ) {
			toggleEmptyState = !!this.nodeMeta.querySelector( '#metadata-toggle-empty' )?.checked;
			UI.removeAllChildren( this.nodeMeta );
		}
		else {
			this.nodeMeta = document.createElement( 'div' );
		}

		this.nodeMeta.className = 'meta meta-' + this.type;

		this.nodeMeta.querySelector( '.meta-table' )?.remove();
		this.nodeMeta.querySelector( '.option-toggle-empty' )?.remove();

		if( options.toggleForEmpty ) {
			const line = UI.build(
				'<div class="option option-toggle-empty">' +
					'<input type="checkbox" id="metadata-toggle-empty" value="1" />' +
					'<label for="metadata-toggle-empty">Omit empty entries</label>' +
				'</div>'
			);

			const input = line.querySelector( 'input' );
			input.checked = toggleEmptyState;
			input.addEventListener( 'change', _ev => this.toggleEmptyMetaData( input.checked ) );

			if( toggleEmptyState ) {
				setTimeout( () => this.toggleEmptyMetaData( toggleEmptyState ), 0 );
			}

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
	 * @param {function?} cb
	 */
	load( cb ) {
		const note = document.createElement( 'p' );
		note.className = 'note';
		note.textContent = `No parser found for file of type: "${this.parser.mimeType}"`;

		this.buildMetaNode();

		this.nodeView.append( note );
		this._openWindow();

		cb?.();
	}


	/**
	 * Add item to meta data.
	 * @param {string}   name
	 * @param {string}   value
	 * @param {object?}  options
	 * @param {boolean?} options.valueAsHTML
	 */
	mdAdd( name, value, options ) {
		this.metaData.push( { name, value, options } );
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
