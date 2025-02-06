import { Component } from './Component.js';
import { Button } from './Button.js';
import { UI } from '../UI.js';


export class ButtonGroup extends Component {


	/**
	 *
	 * @param {Button[]} buttons
	 */
	constructor( buttons ) {
		super();
		this._buttons = buttons;
	}


	/**
	 *
	 * @private
	 * @param {Button} button
	 */
	_toggle( button ) {
		this._buttons.forEach( btn => btn._node.classList.remove( 'selected' ) );
		button._node.classList.add( 'selected' );
	}


	/**
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		super.render();

		this._node = UI.build( `<div class="button-group"></div>` );

		for( let i = 0; i < this._buttons.length; i++ ) {
			const button = this._buttons[i];
			button.on( 'click', () => this._toggle( button ) );

			this._node.append( button.render() );
	 	}

		return this._node;
	}


}
