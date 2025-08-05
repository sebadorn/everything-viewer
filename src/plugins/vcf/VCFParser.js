import { UI } from '../../ui/UI.js';
import { BaseParser } from '../BaseParser.js';


export class VCFParser extends BaseParser {


	/**
	 *
	 * @param {File}   file
	 * @param {string} mimeType
	 */
	constructor( file, mimeType ) {
		super( file, mimeType );
	}


	/**
	 *
	 * @private
	 * @param {string} attr
	 * @param {object} meta
	 * @param {string} type
	 * @param {string} value
	 * @returns {HTMLElement}
	 */
	_buildItemDateTime( attr, meta, type, value ) {
		return this._buildItemText( attr, meta, type, value );
	}


	/**
	 *
	 * @private
	 * @param {string} attr
	 * @param {object} meta
	 * @param {string} meta.encoding - e.g. "b"
	 * @param {string} meta.type - e.g. "JPEG"
	 * @param {string} type
	 * @param {string} value
	 * @returns {HTMLElement}
	 */
	_buildItemImage( attr, meta, type, value ) {
		const name = this._getName( attr, meta );
		const row = UI.buildTableRow( name, value );

		if( meta.encoding === 'b' ) {
			const imgType = String( meta.type ).toLowerCase();
			const td = row.querySelector( 'td' );
			td.innerHTML = `<img src="data:image/${imgType};base64,${value}" />`;
		}

		if( value.includes( '://' ) ) {
			const td = row.querySelector( 'td' );
			td.innerHTML = `<a href="${value}">${value}</a>`;
		}

		return row;
	}


	/**
	 *
	 * @private
	 * @param {string} attr
	 * @param {object} meta
	 * @param {string} type
	 * @param {string} value
	 * @returns {HTMLElement}
	 */
	_buildItemPhone( attr, meta, type, value ) {
		return this._buildItemText( attr, meta, type, value );
	}


	/**
	 *
	 * @private
	 * @param {string} attr
	 * @param {object} meta
	 * @param {string} type
	 * @param {*}      value
	 * @returns {HTMLElement}
	 */
	_buildItemText( attr, meta, type, value ) {
		const name = this._getName( attr, meta );
		const options = {};

		if( Array.isArray( value ) ) {
			const nonEmpty = value.filter( ele => ele && ele.length > 0 );

			if( attr === 'adr' ) {
				value = nonEmpty.join( '\n' );
			}
			else if( attr === 'n' ) {
				let honorificPrefix = value[3] || '';
				let honorificSuffix = value[4] || '';
				let firstName = value[1] || '';
				let middleName = value[2] || '';
				let lastName = value[0] || '';

				value = '';

				if( honorificPrefix.length > 0 ) {
					value += honorificPrefix + ' ';
				}

				if( firstName.length > 0 ) {
					value += firstName + ' ';
				}

				if( middleName.length > 0 ) {
					value += middleName + ' ';
				}

				if( lastName.length > 0 ) {
					value += lastName + ' ';
				}

				if( honorificSuffix.length > 0 ) {
					if( value.length > 0 ) {
						value += ', ';
					}

					value += honorificSuffix + ' ';
				}

				value = value.trim();
			}
			else {
				value = nonEmpty.join( ' ' );
			}
		}

		// Make sure we really have a String.
		value = String( value );

		if( type === 'uri' && value.includes( '://' ) ) {
			value = `<a href="${value}">${value}</a>`;
			options.valueAsHTML = true;
		}
		else if( value.includes( '\n' ) ) {
			value = UI.escapeHTML( value );
			value = value.replaceAll( '\n', '<br>' );

			options.valueAsHTML = true;
		}

		const row = UI.buildTableRow( name, value, options );

		return row;
	}


	/**
	 *
	 * @private
	 * @param {Array} data
	 * @returns {string[]} 
	 */
	_getAttributesToIgnore( data ) {
		const list = [
			'version',
		];

		if( data.find( ele => ele[0] === 'label' ) ) {
			list.push( 'adr' );
		}

		return list;
	}


	/**
	 *
	 * @private
	 * @param {string} attr
	 * @param {object} meta
	 * @returns {string}
	 */
	_getName( attr, meta ) {
		const map = {
			adr: {
				HOME: 'Address (Home)',
				WORK: 'Address (Work)',
				default: 'Address',
			},
			anniversary: 'Anniversary',
			bday: 'Birthday',
			categories: 'Categories',
			email: {
				HOME: 'Email (Home)',
				WORK: 'Email (Work)',
				default: 'Email',
			},
			fn: 'Display Name',
			gender: 'Gender',
			geo: 'Geo.',
			impp: 'Instant Messaging',
			key: 'Key',
			label: {
				HOME: 'Address (Home)',
				WORK: 'Address (Work)',
				default: 'Address',
			},
			lang: 'Language',
			logo: 'Logo',
			member: 'Member',
			n: 'Name',
			nickname: 'Nickname',
			note: 'Note',
			org: 'Organization',
			photo: 'Photo',
			prodid: 'Created with',
			related: 'Relation',
			rev: 'Last updated',
			role: 'Role',
			sound: 'Sound',
			tel: {
				HOME: 'Phone (Home)',
				WORK: 'Phone (Work)',
				default: 'Phone',
			},
			title: 'Title',
			tz: 'Time zone',
			url: 'URL',
			version: 'Version',
		};

		const item = map[attr];

		if( !item ) {
			return attr;
		}

		if( typeof item === 'string' ) {
			return item;
		}

		let type = meta?.type;

		if( Array.isArray( type ) ) {
			for( let i = 0; i < type.length; i++ ) {
				const t = type[i];

				if( item[t] ) {
					type = t;
					break;
				}
			}
		}

		if( typeof type === 'string' ) {
			type = type.toUpperCase();
		}

		return item[type] || item.default || attr;
	}


	/**
	 *
	 * @private
	 * @param {string} type
	 * @returns {boolean}
	 */
	_isImageType( type ) {
		const imgTypes = [
			'bmp',
			'gif',
			'jpeg',
			'jpg',
			'png',
		];

		type = String( type ).toLowerCase();

		const parts = type.split( '/' );
		type = parts[parts.length - 1];

		return imgTypes.includes( type );
	}


	/**
	 *
	 * @param  {array} data
	 * @return {HTMLDocument?}
	 */
	build( data ) {
		const card = document.createElement( 'div' );
		card.className = 'vcard';

		for( let i = 0; i < data.length; i++ ) {
			const vCardData = data[i];

			if( !Array.isArray( vCardData ) ) {
				continue;
			}

			const ignoreAttr = this._getAttributesToIgnore( vCardData );

			const table = document.createElement( 'table' );
			let hasTableItems = false;

			for( let j = 0; j < vCardData.length; j++ ) {
				const entry = vCardData[j];

				if( !Array.isArray( entry ) || entry.length < 4 ) {
					continue;
				}

				const attr = entry[0];
				const meta = entry[1] || {};
				const type = String( entry[2] ).toLowerCase();
				const value = entry[3];

				if( ignoreAttr.includes( attr ) ) {
					continue;
				}

				let item = null;

				switch( type ) {
					case 'binary':
						if( this._isImageType( meta.type ) ) {
							item = this._buildItemImage( attr, meta, type, value );
						}
						else {
							item = this._buildItemText( attr, meta, type, value );
						}
						break;

					case 'date':
					case 'date-and-or-time':
					case 'date-time':
					case 'time':
					case 'timestamp':
						item = this._buildItemDateTime( attr, meta, type, value );
						break;

					case 'phone-number':
						item = this._buildItemPhone( attr, meta, type, value );
						break;

					// 'text', 'uri' ...
					default:
						item = this._buildItemText( attr, meta, type, value );
						break;
				}

				if( item ) {
					hasTableItems = true;
					table.append( item );
				}
			}

			if( hasTableItems ) {
				card.append( table );
			}
		}

		return card;

		// if( data.email ) {
		// 	data.email.forEach( email => {
		// 		let name = 'Email';
		// 		const types = this._getTypes( email );

		// 		if( types ) {
		// 			name += ` (${types.join( ', ' )})`;
		// 		}

		// 		const row = UI.buildTableRow( name, email.value );

		// 		if( email.value.includes( '@' ) ) {
		// 			const td = row.querySelector( 'td' );
		// 			td.innerHTML = `<a href="mailto:${email.value}">${email.value}</a>`;
		// 		}

		// 		table.append( row );
		// 	} );
		// }

		// if( data.tel ) {
		// 	data.tel.forEach( tel => {
		// 		let name = 'Tel.';
		// 		const types = this._getTypes( tel );

		// 		if( types ) {
		// 			name += ` (${types.join( ', ' )})`;
		// 		}

		// 		const row = UI.buildTableRow( name, tel.value );

		// 		if( tel.value.startsWith( 'tel:' ) ) {
		// 			const noPrefix = tel.value.substring( 4 );
		// 			const value = tel.value.replaceAll( /-/g, '' );

		// 			const td = row.querySelector( 'td' );
		// 			td.innerHTML = `<a href="${value}">${noPrefix}</a>`;
		// 		}

		// 		table.append( row );
		// 	} );
		// }
	}


	/**
	 *
	 * @param {function} cb
	 */
	getHTML( cb ) {
		this.getText( ( _err, text ) => {
			const container = document.createElement( 'div' );
			container.className = 'container';

			this.parse( text, data => {
				const card = this.build( data );
				container.append( card );

				cb( null, container );
			} );
		} );
	}


	/**
	 *
	 * @private
	 * @param {string} text
	 * @returns {string}
	 */
	_checkAndFixText( text ) {
		const lines = text.trim().split( '\n' );
		const newLines = [];

		let version = lines.find( line => line.startsWith( 'VERSION:' ) );

		if( version ) {
			version = version.substring( 'VERSION:'.length );
		}

		const needsMoreFixing = !version || version === '2.1';

		for( let i = 0; i < lines.length; i++ ) {
			let line = lines[i];

			const parts = line.split( ':' );
			parts[0] = parts[0].replaceAll( '#', '=' );

			const rest = parts.splice( 1 ).join( ':' );

			// ical.js does not support version 2.1.
			// Try to make the input compatible.
			if( needsMoreFixing ) {
				const firstProp = String( parts[0].split( ';' )[0] );

				if( firstProp.length < parts[0].length ) {
					// const props = parts[0].split( ';' );
					let otherProps = parts[0].substring( firstProp.length + 1 );
					otherProps = 'TYPE=' + otherProps.replaceAll( ';', ',' );

					line = firstProp + ';' + otherProps + ':' + rest;
				}
			}
			else {
				if( parts.length > 1 ) {
					line = parts[0] + ':' + rest;
				}
			}

			newLines.push( line );
		}

		return newLines.join( '\n' );
	}


	/**
	 *
	 * @param {string}   text
	 * @param {function} cb
	 */
	parse( text, cb ) {
		text = this._checkAndFixText( text );

		import( /* webpackChunkName: "ical.js" */ 'ical.js' ).then( module => {
			this.ICAL = module.default;

			let data = null;

			try {
				data = this.ICAL.parse( text );
				console.debug( '[VFCParser.parse]', data );
			}
			catch( err ) {
				console.debug( text );
				console.error( '[VCFParser.parse]', err );
			}

			cb( data );
		} );
	}


};
