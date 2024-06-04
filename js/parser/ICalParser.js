'use strict';


Evy.ICalParser = class extends Evy.BaseParser {


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
	 * @param  {ICAL.Event} vevent
	 * @return {HTMLElement}
	 */
	_buildHTMLComponent( vevent ) {
		const item = document.createElement( 'div' );
		item.className = 'container';

		const table = document.createElement( 'table' );


		// Header

		const summaryText = vevent.summary || '(no summary)';

		const summary = document.createElement( 'h2' );
		summary.className = 'summary';
		summary.textContent = summaryText;

		if( vevent.color ) {
			summary.style.backgroundColor = vevent.color;
		}

		const status = this._getParameterValue( vevent, 'status' );

		if( status ) {
			const state = document.createElement( 'span' );
			state.className = 'state';
			state.textContent = status;

			summary.append( state );
		}

		const cls = this._getParameterValue( vevent, 'class' );

		if( cls ) {
			const state = document.createElement( 'span' );
			state.className = 'state';
			state.textContent = cls;

			summary.append( state );
		}

		item.append( summary );

		if( vevent.description ) {
			const description = document.createElement( 'div' );
			description.className = 'description';
			description.innerHTML = vevent.description.replaceAll( /\n/g, '<br>' );

			item.append( description );
		}


		// Times and Dates

		if( vevent.startDate ) {
			const rowStart = this._buildHTMLTableRowTime( 'Start', vevent.startDate );
			table.append( rowStart );

			if( vevent.endDate ) {
				const rowEnd = this._buildHTMLTableRowTime( 'End', vevent.endDate );
				table.append( rowEnd );
			}

			if( vevent.duration ) {
				const value = vevent.duration.toSeconds() * 1000;
				const row = Evy.UI.buildTableRow( 'Duration', Evy.UI.formatDuration( value ) );
				table.append( row );
			}
		}

		const freebusy = vevent.component.jCal[1].filter( a => a[0] === 'freebusy' );

		if( freebusy.length > 0 ) {
			freebusy.forEach( fb => {
				const dateTime = fb[3];

				const start = ICAL.Time.fromDateTimeString( dateTime[0] );
				const nodeStart = this._buildTimeSelect( start );

				let nodeEnd = null;
				let sep = '';

				if( dateTime[1].length >= 16 ) {
					const value = ICAL.Time.fromDateTimeString( dateTime[1] );
					nodeEnd = this._buildTimeSelect( value );
					sep = ' – ';
				}
				else {
					nodeEnd = dateTime[1];
					sep = ' / ';
				}

				const row = Evy.UI.buildTableRow( 'Period', '' );
				const cell = row.querySelector( 'td' );
				cell.innerHTML = '';
				cell.append( nodeStart, sep, nodeEnd );

				table.append( row );
			} );
		}

		const due = this._getParameterValue( vevent, 'due' );

		if( due ) {
			const dueTime = ICAL.Time.fromDateTimeString( due );
			const row = this._buildHTMLTableRowTime( 'Due', dueTime );
			table.append( row );
		}


		// Location

		if( vevent.location ) {
			const row = Evy.UI.buildTableRow( 'Location', vevent.location );
			row.className = 'location';
			table.append( row );
		}


		// People or organizations

		if( vevent.organizer ) {
			const orgData = vevent.component.jCal[1].find( item => item[0] === 'organizer' );
			let orgName = vevent.organizer.replace( /^mailto:/, '' );

			if( orgData && Evy.isObject( orgData[1] ) && orgData[1].cn ) {
				orgName = orgData[1].cn;
			}

			const row = Evy.UI.buildTableRow( 'Organizer', orgName );
			row.className = 'organizer';

			if( vevent.organizer.startsWith( 'mailto:' ) ) {
				const link = document.createElement( 'a' );
				link.href = vevent.organizer;
				link.textContent = orgName;

				const cell = row.querySelector( 'td' );
				cell.innerHTML = '';
				cell.append( link );
			}

			table.append( row );
		}

		if(
			Array.isArray( vevent.attendees ) &&
			vevent.attendees.length > 0
		) {
			const row = Evy.UI.buildTableRow( 'Attendees', '' );
			row.className = 'attendees';

			const list = document.createElement( 'ul' );
			vevent.attendees.forEach( attendee => {
				const link = document.createElement( 'a' );
				link.href = attendee.getFirstValue();
				link.textContent = attendee.getParameter( 'cn' ) || link.href.replace( /^mailto:/, '' );

				const item = document.createElement( 'li' );
				item.append( link );

				if( attendee.getParameter( 'partstat' ) ) {
					const state = document.createElement( 'span' );
					state.className = 'state';
					state.textContent = attendee.getParameter( 'partstat' );

					item.append( state );
				}

				list.append( item );
			} );

			const cell = row.querySelector( 'td' );
			cell.append( list );

			table.append( row );
		}


		// Various

		const comment = this._getParameterValue( vevent, 'comment' );

		if( comment ) {
			const row = Evy.UI.buildTableRow( 'Comment', comment );
			table.append( row );
		}

		const url = this._getParameterValue( vevent, 'url' );

		if( url ) {
			const row = Evy.UI.buildTableRow( 'URL', url );

			const link = document.createElement( 'a' );
			link.href = url;
			link.textContent = url;

			const cell = row.querySelector( 'td' );
			cell.innerHTML = '';
			cell.append( link );

			table.append( row );
		}


		item.append( table );


		// Alarms

		const alarms = this._buildHTMLVAlarms( vevent );

		if( alarms ) {
			item.append( alarms );
		}


		return item;
	}


	/**
	 *
	 * @private
	 * @param  {string}    name
	 * @param  {ICAL.Time} icalTime
	 * @return {HTMLElement}
	 */
	_buildHTMLTableRowTime( name, icalTime ) {
		const select = this._buildTimeSelect( icalTime );

		const row = Evy.UI.buildTableRow( name, '' );
		row.className = name.toLowerCase();
		row.querySelector( 'td' ).append( select );

		return row;
	}


	/**
	 *
	 * @private
	 * @param  {array} alarm
	 * @return {?HTMLElement}
	 */
	_buildHTMLVAlarm( alarm ) {
		if( !Array.isArray( alarm ) ) {
			return null;
		}

		const item = document.createElement( 'div' );
		item.className = 'valarm';

		const description = alarm.find( a => a[0] === 'description' );

		if( description && description[3] ) {
			const entry = document.createElement( 'div' );
			entry.className = 'alarm-description';
			entry.textContent = description[3];

			item.append( entry );
		}

		const table = document.createElement( 'table' );

		const trigger = alarm.find( a => a[0] === 'trigger' );

		if( trigger && trigger[3] ) {
			const row = Evy.UI.buildTableRow( 'Trigger', trigger[3] );
			table.append( row );
		}

		const duration = alarm.find( a => a[0] === 'duration' );

		if( duration && duration[3] ) {
			const row = Evy.UI.buildTableRow( 'Duration', duration[3] );
			table.append( row );
		}

		const repeat = alarm.find( a => a[0] === 'repeat' );

		if( repeat && repeat[3] ) {
			const row = Evy.UI.buildTableRow( 'Repeat', repeat[3] );
			table.append( row );
		}

		const action = alarm.find( a => a[0] === 'action' );

		if( action && action[3] ) {
			const row = Evy.UI.buildTableRow( 'Action', action[3] );
			table.append( row );
		}

		const attach = alarm.find( a => a[0] === 'attach' );

		if( attach && attach[3] ) {
			const row = Evy.UI.buildTableRow( 'Attach', attach[3] );
			table.append( row );
		}

		item.append( table );

		return item;
	}


	/**
	 *
	 * @private
	 * @param  {ICAL.Event} vevent
	 * @return {?HTMLElement}
	 */
	_buildHTMLVAlarms( vevent ) {
		const data = vevent.component.jCal[2];

		if( !Array.isArray( data ) ) {
			return null;
		}

		const alarms = data.filter( a => a[0] === 'valarm' );

		if( alarms.length === 0 ) {
			return null;
		}

		const node = document.createElement( 'div' );
		node.className = 'valarms';

		alarms.forEach( alarm => {
			const item = this._buildHTMLVAlarm( alarm[1] );

			if( item ) {
				node.append( item );
			}
		} );

		return node;
	}


	/**
	 *
	 * @private
	 * @param  {ICAL.Time} icalTime
	 * @return {HTMLElement}
	 */
	_buildTimeSelect( icalTime ) {
		const formats = {
			UTC: Evy.UI.formatDateTime( icalTime.toJSDate() ),
			ICAL: icalTime.toString(),
			Unix: icalTime.toUnixTime()
		};

		if( icalTime.timezone ) {
			formats.ICAL += ` (${icalTime.timezone})`;
		}

		const select = document.createElement( 'select' );

		for( const key in formats ) {
			const value = formats[key];

			const option = document.createElement( 'option' );
			option.value = key;
			option.textContent = value + ` [${key}]`;

			select.append( option );
		}

		return select;
	}


	/**
	 *
	 * @private
	 * @param  {ICAL.Event} vevent
	 * @param  {string}     key
	 * @return {?string}
	 */
	_getParameterValue( vevent, key ) {
		const data = vevent.component.jCal;

		if(
			!Array.isArray( data ) ||
			!Array.isArray( data[1] )
		) {
			return null;
		}

		const param = data[1].find( a => a[0] === key );

		if( !Array.isArray( param ) ) {
			return null;
		}

		return param[3];
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

		const events = comp.getAllSubcomponents( 'vevent' );
		const todos = comp.getAllSubcomponents( 'vtodo' );
		const journals = comp.getAllSubcomponents( 'vjournal' );
		const freebusy = comp.getAllSubcomponents( 'vfreebusy' );

		const all = events.concat( todos ).concat( journals ).concat( freebusy );

		all.forEach( data => {
			const vevent = new ICAL.Event( data );
			const item = this._buildHTMLComponent( vevent );
			item.className += ' ' + data.jCal[0];

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
				cb( null, html );
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