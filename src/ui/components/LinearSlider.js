import { UI } from '../UI';
import { Component } from './Component';


export const LinearSliderOrientation = {
	horizontal: 1,
	vertical: 2,
};


export class LinearSlider extends Component {


	/** @type {HTMLElement} */
	_innerBar = null;

	/** @type {HTMLElement?} */
	_valueDisplay = null;


	/**
	 *
	 * @param {object} config
	 * @param {number} [config.min = 0]
	 * @param {number} [config.max = 100]
	 * @param {boolean} [config.showValue = true]
	 * @param {function?} config.formatValue - Optional function to use to format the displayed value.
	 * @param {boolean} [config.canInteract = true]
	 * @param {function?} config.onChange
	 * @param {number} [config.orientation = LinearSliderOrientation.horizontal]
	 */
	constructor( config ) {
		super();

		this._config = config;

		if( typeof this._config.min !== 'number' ) {
			this._config.min = 0;
		}

		if( typeof this._config.max !== 'number' ) {
			this._config.max = 100;
		}

		if( typeof this._config.showValue !== 'boolean' ) {
			this._config.showValue = true;
		}

		if( typeof this._config.canInteract !== 'boolean' ) {
			this._config.canInteract = true;
		}
	}


	/**
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		super.render();

		this._innerBar = UI.build( '<div class="inner-bar"></div>' );

		if( this._config.showValue ) {
			this._valueDisplay = UI.build( '<div class="value-display"></div>' );
			this._innerBar.append( this._valueDisplay );
		}

		if( this._config.canInteract ) {
			// TODO: events
			// - mousedown + mousemove: move inner bar, but do not trigger yet
			// - mouseup: trigger onChange
		}

		this._node = UI.build( '<div class="linear-slider"></div>' );
		this._node.append( this._innerBar );

		if( this._config.orientation === LinearSliderOrientation.vertical ) {
			this._node.classList.add( 'orientation-vertical' );
		}
		else {
			this._node.classList.add( 'orientation-horizontal' );
		}

		return this._node;
	}


	/**
	 *
	 * @param {object} update
	 */
	update( update ) {
		// TODO:
	}


}