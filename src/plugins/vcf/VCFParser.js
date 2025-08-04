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
	 * @param {string} value
	 * @returns {HTMLElement}
	 */
	_buildItemDateTime( attr, meta, value ) {
		// TODO:
		return this._buildItemText( attr, meta, value );
	}


	/**
	 *
	 * @private
	 * @param {string} attr
	 * @param {object} meta
	 * @param {string} meta.encoding - e.g. "b"
	 * @param {string} meta.type - e.g. "JPEG"
	 * @param {string} value
	 * @returns {HTMLElement}
	 */
	_buildItemImage( attr, meta, value ) {
		const name = this._getName( attr, meta );
		const row = UI.buildTableRow( name, value );

		if( meta.encoding === 'b' ) {
			const type = String( meta.type ).toLowerCase();
			const td = row.querySelector( 'td' );
			td.innerHTML = `<img src="data:image/${type};base64,${value}" />`;
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
	 * @param {string} value
	 * @returns {HTMLElement}
	 */
	_buildItemPhone( attr, meta, value ) {
		return this._buildItemText( attr, meta, value );
	}


	/**
	 *
	 * @private
	 * @param {string} attr
	 * @param {object} meta
	 * @param {string} value
	 * @returns {HTMLElement}
	 */
	_buildItemText( attr, meta, value ) {
		const name = this._getName( attr, meta );
		const options = {};

		if( Array.isArray( value ) ) {
			const nonEmpty = value.filter( ele => ele && ele.length > 0 );

			if( attr === 'adr' ) {
				value = nonEmpty.join( '\n' );
			}
			else {
				value = nonEmpty.join( ' ' );
			}
		}

		if( value.includes( '\n' ) ) {
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

		if( data.find( ele => ele[0] === 'fn' ) ) {
			list.push( 'n' );
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
			bday: 'Birthday',
			email: {
				HOME: 'Email (Home)',
				WORK: 'Email (Work)',
				default: 'Email',
			},
			fn: 'Name',
			label: {
				HOME: 'Address (Home)',
				WORK: 'Address (Work)',
				default: 'Address',
			},
			n: 'Name',
			org: 'Organization',
			photo: 'Photo',
			rev: 'Last updated',
			tel: {
				HOME: 'Phone (Home)',
				WORK: 'Phone (Work)',
				default: 'Phone',
			},
			title: 'Title',
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

		return item[type] || item.default || attr;
	}


	/**
	 *
	 * @param  {array} data
	 * @return {HTMLDocument?}
	 */
	build( data ) {
		const card = document.createElement( 'div' );
		card.className = 'vcard';

		const imgTypes = [
			'bmp',
			'gif',
			'jpeg',
			'jpg',
			'png',
		];

		for( let i = 0; i < data.length; i++ ) {
			const vCardData = data[i];

			if( !Array.isArray( vCardData ) ) {
				continue;
			}

			const ignoreAttr = this._getAttributesToIgnore( vCardData );

			const table = document.createElement( 'table' );
			card.append( table );

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
						if( imgTypes.includes( String( meta.type ).toLowerCase() ) ) {
							item = this._buildItemImage( attr, meta, value );
						}
						break;

					case 'date':
					case 'date-time':
						item = this._buildItemDateTime( attr, meta, value );
						break;

					case 'phone-number':
						item = this._buildItemPhone( attr, meta, value );
						break;

					case 'text':
						item = this._buildItemText( attr, meta, value );
						break;
				}

				if( item ) {
					table.append( item );
				}
			}
		}

		return card;


		// const name = document.createElement( 'h3' );
		// name.className = 'name';
		// name.textContent = data.fn;
		// card.append( name );

		// if( data.title ) {
		// 	const title = document.createElement( 'h4' );
		// 	title.className = 'title';
		// 	title.textContent = data.title.join( ', ' );
		// 	card.append( title );
		// }

		// const table = document.createElement( 'table' );

		// if( data.n['honorific-prefix'] ) {
		// 	const value = data.n['honorific-prefix'].join( ' ' );
		// 	const row = UI.buildTableRow( 'Name prefix', value );
		// 	table.append( row );
		// }

		// if( data.n['given-name'] ) {
		// 	const value = data.n['given-name'].join( ' ' );
		// 	const row = UI.buildTableRow( 'Given name', value );
		// 	table.append( row );
		// }

		// if( data.n['family-name'] ) {
		// 	const value = data.n['family-name'].join( ' ' );
		// 	const row = UI.buildTableRow( 'Family name', value );
		// 	table.append( row );
		// }

		// if( data.photo ) {
		// 	const row = UI.buildTableRow( 'Photo', data.photo );

		// 	// Check for embedded base64 image data.
		// 	const match = text.match(/\nPHOTO.+[\r]?\n/);
		// 	let typeBase64 = null;

		// 	if( match ) {
		// 		let line = match[0];

		// 		// v4.0
		// 		if(
		// 			line.startsWith( 'PHOTO:data:' ) &&
		// 			line.includes( 'base64' )
		// 		) {
		// 			typeBase64 = line.substring( 'PHOTO:data:'.length, line.indexOf( ';base64' ) );
		// 		}
		// 		// v3.0
		// 		else if( line.includes( 'ENCODING=b') ) {
		// 			const type = line.match( /;TYPE=([a-z0-9\/]+)[;:]/i );

		// 			if( type && type.length >= 2 ) {
		// 				typeBase64 = type[0];
		// 			}
		// 		}
		// 		// v2.1
		// 		else if( line.includes( 'ENCODING=BASE64' ) ) {
		// 			const type = line.match( /;([a-z0-9\/]+)[;:]/i );

		// 			if( type && type.length >= 2 ) {
		// 				typeBase64 = type[0];
		// 			}
		// 		}

		// 		if( typeBase64 ) {
		// 			typeBase64 = typeBase64.toLowerCase();

		// 			if( !typeBase64.startsWith( 'image/' ) ) {
		// 				typeBase64 = 'image/' + typeBase64;
		// 			}
		// 		}
		// 	}

		// 	if( typeBase64 ) {
		// 		const td = row.querySelector( 'td' );
		// 		td.innerHTML = `<img src="data:${typeBase64};base64,${data.photo}" />`;
		// 	}
		// 	else if( data.photo.includes( '://' ) ) {
		// 		const td = row.querySelector( 'td' );
		// 		td.innerHTML = `<a href="${data.photo}">${data.photo}</a>`;
		// 	}

		// 	table.append( row );
		// }

		// if( data.adr ) {
		// 	const buildAdr = adr => {
		// 		let name = 'Adr.';
		// 		const types = this._getTypes( adr );

		// 		if( types ) {
		// 			name += ` (${types.join( ', ' )})`;
		// 		}

		// 		let value = adr.value.split( ';' )
		// 			.filter( line => line.length > 0 )
		// 			.map( line => line + '<br>' )
		// 			.join( '' );

		// 		const row = UI.buildTableRow( name, value, { valueAsHTML: true } );
		// 		table.append( row );
		// 	};

		// 	if( Array.isArray( data.adr ) ) {
		// 		data.adr.forEach( adr => buildAdr( adr ) );
		// 	}
		// 	else {
		// 		buildAdr( data.adr );
		// 	}
		// }

		// if( data.org ) {
		// 	data.org.forEach( org => {
		// 		let value = org['organization-name'];

		// 		if( org['organization-unit'] ) {
		// 			value += ', ' + org['organization-unit'];
		// 		}

		// 		const row = UI.buildTableRow( 'Organization', value );
		// 		table.append( row );
		// 	} );
		// }

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

		// card.append( table );

		// return card;
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

		for( let i = 0; i < lines.length; i++ ) {
			let line = lines[i];

			// if( line.startsWith( 'PHOTO;' ) ) {
			// 	if( line.includes( '://' ) ) {
			// 		continue;
			// 	}
			// }

			line = line.replace( /^([A-Z0-9]+);TYPE#/, '$1;TYPE=' );

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
