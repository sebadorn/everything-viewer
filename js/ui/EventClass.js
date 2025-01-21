export class EventClass {


	/**
	 *
	 */
	constructor() {
		/** @type {object} */
		this._events = {};
	}


	/**
	 * Fire an event.
	 * @param {string} eventType
	 * @param {*}      data
	 */
	fire( eventType, data ) {
		const fns = this._events[eventType] || [];
		fns.forEach( cb => cb( data ) );
	}


	/**
	 * Remove all or a specific event listener.
	 * @param {string}    eventType
	 * @param {function?} cb - If set remove that specific callback, otherwise remove all of the type.
	 */
	off( eventType, cb ) {
		if( cb ) {
			const fns = this._events[eventType] || [];
			const index = fns.indexOf( cb );

			if( index > -1 ) {
				fns.splice( index, 1 );
			}
		}
		else {
			this._events[eventType] = [];
		}
	}


	/**
	 * Add an event listener.
	 * @param {string}   eventType
	 * @param {function} cb 
	 */
	on( eventType, cb ) {
		const fns = this._events[eventType] || [];
		fns.push( cb );
		this._events[eventType] = fns;
	}


	/**
	 * Remove all event listeners.
	 */
	removeAllEvents() {
		this._events = {};
	}


}