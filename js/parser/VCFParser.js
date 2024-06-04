'use strict';


Evy.VCFParser = class extends Evy.BaseParser {


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
	 * @param  {object} data
	 * @return {?string[]}
	 */
	_getTypes( data ) {
		if( !Array.isArray( data.type ) || data.type.length === 0 ) {
			return null;
		}

		let types = data.type.find( t => t.startsWith( 'TYPE#' ) );

		// If no entries are marked as "TYPE", assume all are.
		if( !types ) {
			return data.type;
		}

		types = types.substring( 'TYPE#'.length );

		return types.split( ',' );
	}


	/**
	 *
	 * @param  {array}  data
	 * @param  {string} text
	 * @return {?HTMLDocument}
	 */
	buildHTML( data, text ) {
		console.log( data ); // TODO: remove

		const card = document.createElement( 'div' );
		card.className = 'vcard';

		const name = document.createElement( 'h3' );
		name.className = 'name';
		name.textContent = data.fn;
		card.append( name );

		if( data.title ) {
			const title = document.createElement( 'h4' );
			title.className = 'title';
			title.textContent = data.title.join( ', ' );
			card.append( title );
		}

		const table = document.createElement( 'table' );

		if( data.n['honorific-prefix'] ) {
			const value = data.n['honorific-prefix'].join( ' ' );
			const row = Evy.UI.buildTableRow( 'Name prefix', value );
			table.append( row );
		}

		if( data.n['given-name'] ) {
			const value = data.n['given-name'].join( ' ' );
			const row = Evy.UI.buildTableRow( 'Given name', value );
			table.append( row );
		}

		if( data.n['family-name'] ) {
			const value = data.n['family-name'].join( ' ' );
			const row = Evy.UI.buildTableRow( 'Family name', value );
			table.append( row );
		}

		if( data.photo ) {
			const row = Evy.UI.buildTableRow( 'Photo', data.photo );

			// Check for embedded base64 image data.
			const match = text.match(/\nPHOTO.+[\r]?\n/);
			let typeBase64 = null;

			if( match ) {
				let line = match[0];

				// v4.0
				if(
					line.startsWith( 'PHOTO:data:' ) &&
					line.includes( 'base64' )
				) {
					typeBase64 = line.substring( 'PHOTO:data:'.length, line.indexOf( ';base64' ) );
				}
				// v3.0
				else if( line.includes( 'ENCODING=b') ) {
					const type = line.match( /;TYPE=([a-z0-9\/]+)[;:]/i );

					if( type && type.length >= 2 ) {
						typeBase64 = type[0];
					}
				}
				// v2.1
				else if( line.includes( 'ENCODING=BASE64' ) ) {
					const type = line.match( /;([a-z0-9\/]+)[;:]/i );

					if( type && type.length >= 2 ) {
						typeBase64 = type[0];
					}
				}

				if( typeBase64 ) {
					typeBase64 = typeBase64.toLowerCase();

					if( !typeBase64.startsWith( 'image/' ) ) {
						typeBase64 = 'image/' + typeBase64;
					}
				}
			}

			if( typeBase64 ) {
				const td = row.querySelector( 'td' );
				td.innerHTML = `<img src="data:${typeBase64};base64,${data.photo}" />`;
			}
			else if( data.photo.includes( '://' ) ) {
				const td = row.querySelector( 'td' );
				td.innerHTML = `<a href="${data.photo}">${data.photo}</a>`;
			}

			table.append( row );
		}

		if( data.adr ) {
			data.adr.forEach( adr => {
				let name = 'Adr.';
				const types = this._getTypes( adr );

				if( types ) {
					name += ` (${types.join( ', ' )})`;
				}

				const row = Evy.UI.buildTableRow( name, adr.value );
				table.append( row );
			} );
		}

		if( data.org ) {
			data.org.forEach( org => {
				let value = org['organization-name'];

				if( org['organization-unit'] ) {
					value += ', ' + org['organization-unit'];
				}

				const row = Evy.UI.buildTableRow( 'Organization', value );
				table.append( row );
			} );
		}

		if( data.email ) {
			data.email.forEach( email => {
				let name = 'Email';
				const types = this._getTypes( email );

				if( types ) {
					name += ` (${types.join( ', ' )})`;
				}

				const row = Evy.UI.buildTableRow( name, email.value );

				if( email.value.includes( '@' ) ) {
					const td = row.querySelector( 'td' );
					td.innerHTML = `<a href="mailto:${email.value}">${email.value}</a>`;
				}

				table.append( row );
			} );
		}

		if( data.tel ) {
			data.tel.forEach( tel => {
				let name = 'Tel.';
				const types = this._getTypes( tel );

				if( types ) {
					name += ` (${types.join( ', ' )})`;
				}

				const row = Evy.UI.buildTableRow( name, tel.value );

				if( tel.value.startsWith( 'tel:' ) ) {
					const noPrefix = tel.value.substring( 4 );
					const value = tel.value.replaceAll( /-/g, '' );

					const td = row.querySelector( 'td' );
					td.innerHTML = `<a href="${value}">${noPrefix}</a>`;
				}

				table.append( row );
			} );
		}

		card.append( table );

		return card;
	}


	/**
	 *
	 * @param {function} cb
	 */
	getHTML( cb ) {
		this.getText( ( _err, text ) => {
			const numCards = ( text.match( /BEGIN:VCARD[\r]?\n/g ) || [] ).length;
			let i = 0;

			const container = document.createElement( 'div' );
			container.className = 'container';

			this.parse( text, data => {
				i++;

				const card = this.buildHTML( data, text );
				container.append( card );

				if( i === numCards ) {
					cb( null, container );
				}
			} );
		} );
	}


	/**
	 *
	 * @param {string}   text
	 * @param {function} cb
	 */
	parse( text, cb ) {
		Evy.ensureScript( 'vcf', () => {
			// The callback is called for every
			// vcard inside the file.
			VCF.parse( text, cb );
		} );
	}


}