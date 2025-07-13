import { UI } from '../UI';
import { Component } from './Component';


export class InfoOverlay extends Component {


	/**
	 *
	 * @param {object?} config
	 * @param {string?} config.classes
	 */
	constructor( config ) {
		super();
		this._config = config || {};
	}


	/**
	 *
	 */
	destroy() {
		this._node?.remove();
	}


	/**
	 *
	 */
	hide() {
		this._node.style.display = 'none';
	}


	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 */
	moveTo( x, y ) {
		const rect = this._node.getBoundingClientRect();
		this._node.style.left = Math.round( x - rect.width / 2 ) + 'px';
		this._node.style.top = ( y - rect.height ) + 'px';
	}


	/**
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		super.render();

		this._node = UI.build( '<div class="info-overlay"></div>' );

		if( typeof this._config?.classes === 'string' ) {
			this._node.classList.add( ...this._config.classes.split( ' ' ) );
		}

		return this._node;
	}


	/**
	 *
	 */
	show() {
		this._node.style.display = 'block';
	}


	/**
	 *
	 * @param {string} value
	 */
	set value( value ) {
		this._node.textContent = value;
	}


}