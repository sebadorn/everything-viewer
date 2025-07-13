import { UI } from '../UI';
import { Component } from './Component';


export class LinearSlider extends Component {


	/** @type {number} */
	_currentValue = 0;

	/** @type {HTMLElement} */
	_innerBar = null;

	/** @type {HTMLElement?} */
	_valueDisplay = null;


	/**
	 *
	 * @param {object} config
	 * @param {string?} config.classes
	 * @param {number} [config.min = 0]
	 * @param {number} [config.max = 100]
	 * @param {boolean} [config.showValue = true]
	 * @param {function?} config.formatValue - Optional function to use to format the displayed value.
	 * @param {boolean} [config.canInteract = true]
	 * @param {function?} config.onChange
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

		this._currentValue = this._config.min;
	}


	/**
	 *
	 * @private
	 * @param {number} abs
	 * @returns {number}
	 */
	_absToRel( abs ) {
		return ( abs - this._config.min ) / ( this._config.max - this._config.min );
	}


	/**
	 *
	 * @private
	 * @param {number} rel
	 * @returns {number}
	 */
	_relToAbs( rel ) {
		return this._config.min + rel * ( this._config.max - this._config.min );
	}


	/**
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		super.render();

		this._node = UI.build( '<div class="linear-slider"></div>' );

		this._innerBar = UI.build( '<div class="inner-bar"></div>' );
		this._node.append( this._innerBar );

		if( this._config.showValue ) {
			this._valueDisplay = UI.build( '<div class="value-display"></div>' );
			this._node.append( this._valueDisplay );
		}
	
		if( typeof this._config.classes === 'string' ) {
			this._node.classList.add( ...this._config.classes.split( ' ' ) );
		}

		if( this._config.canInteract ) {
			this._node.addEventListener( 'click', ev => {
				const rect = this._node.getBoundingClientRect();
				const percent = ev.offsetX / rect.width;
				this._config.onChange?.( percent, this._relToAbs( percent ) );
			} );
		}

		return this._node;
	}


	/**
	 *
	 * @returns {number}
	 */
	get value() {
		return this._currentValue;
	}


	/**
	 *
	 * @param {number} value - Value between configured min and max value.
	 */
	set value( value ) {
		let newValue = Math.min( this._config.max, Math.max( this._config.min, value ) );

		if( newValue !== this._currentValue && !isNaN( newValue ) ) {
			this._currentValue = newValue;
			this._innerBar.style.width = Math.round( this.valueProgress * 100 ) + '%';
		}
	}


	/**
	 *
	 * @returns {number} Current value as progress [0.0, 1.0].
	 */
	get valueProgress() {
		return this._absToRel( this._currentValue );
	}


	/**
	 *
	 * @param {number} progress - Value as percentual progress [0.0, 1.0] between the configured min/max values.
	 */
	set valueProgress( progress ) {
		progress = Math.min( 1, Math.max( 0, progress ) );
		progress = this._config.min + progress * ( this._config.max - this._config.min );
		this.value = progress;
	}


}