import { UI } from '../UI.js';
import { Component } from './Component.js';


export class Button extends Component {


	/**
	 *
	 * @param {object}  config
	 * @param {string?} config.classes
	 * @param {string?} config.icon
	 * @param {string?} config.text
	 * @param {string?} config.title
	 */
	constructor( config ) {
		super();

		this._config = config;
	}


	/**
	 * Disable the button.
	 */
	disable() {
		if( !this._node ) {
			window.Logger.warn( '[Button.disable] Button has not been rendered yet.' );
			return;
		}

		this._node.disabled = true;
	}


	/**
	 * Enable the button.
	 */
	enable() {
		if( !this._node ) {
			window.Logger.warn( '[Button.enable] Button has not been rendered yet.' );
			return;
		}

		this._node.disabled = false;
	}


	/**
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		super.render();

		const hasIcon = typeof this._config.icon === 'string';
		const hasText = typeof this._config.text === 'string';

		this._node = document.createElement( 'button' );
		this._node.classList.add( 'btn' );

		if( typeof this._config.classes === 'string' ) {
			this._node.classList.add( ...this._config.classes.split( ' ' ) );
		}

		if( hasIcon ) {
			this._node.innerHTML = `<span class="icon">${this._config.icon}</span>`;
		}

		if( hasText ) {
			const text = UI.escapeHTML( this._config.text );
			this._node.innerHTML += `<span class="text">${text}</span>`;
		}

		if( ( hasIcon && hasText ) || this._config.iconWithBorder === true ) {
			this._node.classList.add( 'btn-icon-text' );

			if( this._config.iconWithBorder ) {
				this._node.classList.add( 'btn-icon-border' );
			}
		}
		else if( hasIcon ) {
			this._node.classList.add( 'btn-icon' );
		}
		else if( hasText ) {
			this._node.classList.add( 'btn-text' );
		}

		if( typeof this._config.title === 'string' ) {
			this._node.setAttribute( 'title', this._config.title );
		}

		this._node.addEventListener( 'click', ev => {
			if( this._node.disabled ) {
				return;
			}

			this.fire( 'click', ev );
		} );

		return this._node;
	}


}