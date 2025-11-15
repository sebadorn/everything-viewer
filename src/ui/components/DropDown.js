import { UI } from '../UI';
import { Component } from './Component';


export class DropDown extends Component {


	/**
	 *
	 * @param {DropDownItem[]} items
	 * @param {DropDownOptions?} options
	 */
	constructor( items, options ) {
		super();

		this._items = items;
		this._options = options || {};
		this._lastValue = null;
	}


	/**
	 *
	 * @private
	 * @param {DropDownItem} item
	 * @returns {HTMLElement}
	 */
	_buildItem( item ) {
		const node = document.createElement( 'option' );
		node.setAttribute( 'value', UI.escapeHTML( item.value ) );
		node.textContent = item.text;

		if( this._options.selected == item.value ) {
			this._lastValue = String( item.value );
			node.selected = true;
		}

		return node;
	}


	/**
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		super.render();

		this._node = document.createElement( 'select' );
		this._node.classList.add( 'dropdown' );

		if( typeof this._options.classes === 'string' ) {
			this._node.classList.add( ...this._options.classes.split( ' ' ) );
		}

		for( let i = 0; i < this._items.length; i++ ) {
			const item = this._items[i];
			this._node.append( this._buildItem( item ) );
		}

		this._node.addEventListener( 'change', ev => {
			/** @type {DropDownChangeEvent} */
			const changeEvent = new CustomEvent(
				'change',
				{
					detail: {
						oldValue: this._lastValue,
						value: ev.target?.value,
					},
				}
			);

			this._lastValue = changeEvent.value;

			this.fire( 'change', changeEvent );
		} );

		return this._node;
	}


}


/**
 * @typedef {object} DropDownItem
 * @property {string} value
 * @property {string} text
 */

/**
 * @typedef {object} DropDownOptions
 * @property {string?} classes
 * @property {string?} selected
 */

/**
 * @typedef {CustomEvent} DropDownChangeEvent
 * @property {string} type
 * @property {string?} oldValue
 * @property {string?} value
 */
