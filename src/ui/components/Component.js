import { EventClass } from '../EventClass.js';


export class Component extends EventClass {


	/**
	 *
	 */
	constructor() {
		super();

		/** @type {HTMLElement} */
		this._node = null;
	}


	/**
	 *
	 */
	render() {
		if( this._node ) {
			this._node.remove();
		}
	}


}
