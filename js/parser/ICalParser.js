'use strict';


{

class ICalParser extends Evy.BaseParser {


	/**
	 *
	 * @constructor
	 * @param {File}   file
	 * @param {string} mimeType
	 */
	constructor( file, mimeType ) {
		super( file, mimeType );
	}


	/**
	 *
	 * @private
	 * @param  {string} name
	 * @param  {string} value
	 * @return {HTMLElement}
	 */
	_buildHTMLTableRow( name, value ) {
		const th = document.createElement( 'th' );
		th.textContent = name;

		const td = document.createElement( 'td' );
		td.textContent = value;

		const row = document.createElement( 'tr' );
		row.append( th, td );

		return row;
	}


	/**
	 *
	 * @private
	 * @param  {ICAL.Event} vevent
	 * @return {HTMLElement}
	 */
	_buildHTMLVEvent( vevent ) {
		const summary = document.createElement( 'h2' );
		summary.className = 'summary';
		summary.textContent = vevent.summary;

		if( vevent.color ) {
			summary.style.backgroundColor = vevent.color;
		}

		const description = document.createElement( 'div' );
		description.className = 'description';
		description.textContent = vevent.description;

		const startTimeUTC = Evy.UI.formatDateTime( vevent.startDate.toJSDate() );
		const rowStart = this._buildHTMLTableRow( 'Start', startTimeUTC );
		rowStart.className = 'start';

		const endimeUTC = Evy.UI.formatDateTime( vevent.endDate.toJSDate() );
		const rowEnd = this._buildHTMLTableRow( 'End', endimeUTC );
		rowEnd.className = 'end';

		const table = document.createElement( 'table' );
		table.append( rowStart, rowEnd );

		if( vevent.location ) {
			const row = this._buildHTMLTableRow( 'Location', vevent.location );
			row.className = 'location';
			table.append( row );
		}

		if( vevent.organizer ) {
			const row = this._buildHTMLTableRow( 'Organizer', vevent.organizer );
			row.className = 'organizer';
			table.append( row );
		}

		if(
			Array.isArray( vevent.attendes ) &&
			vevent.attendes.length > 0
		) {
			// TODO:
		}

		const item = document.createElement( 'div' );
		item.className = 'vevent';
		item.append( summary, description, table );

		return item;
	}


	/**
	 *
	 * @param  {array} data
	 * @return {HTMLElement}
	 */
	buildHTML( data ) {
		const node = document.createElement( 'div' );
		node.className = 'ical';

		const comp = new ICAL.Component( data );
		const vevents = comp.getAllSubcomponents( 'vevent' );

		vevents.forEach( veventData => {
			const vevent = new ICAL.Event( veventData );
			const item = this._buildHTMLVEvent( vevent );
			node.append( item );
		} );

		return node;
	}


	/**
	 *
	 * @param {function} cb
	 */
	getHTML( cb ) {
		this.getText( ( _err, text ) => {
			this.parse( text, data => {
				const html = this.buildHTML( data );
				cb( null, html, data );
			} );
		} );
	}


	/**
	 *
	 * @param {string}   text
	 * @param {function} cb
	 */
	parse( text, cb ) {
		Evy.ensureScript( 'ical', () => {
			const data = ICAL.parse( text );
			cb( data );
		} );
	}


}


Evy.ICalParser = ICalParser;

}
