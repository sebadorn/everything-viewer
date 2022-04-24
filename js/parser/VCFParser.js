'use strict';


{

class VCFParser extends Evy.BaseParser {


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
		if( !Array.isArray( data.type ) ) {
			return null;
		}

		let types = data.type.find( t => t.startsWith( 'TYPE#' ) );

		if( !types ) {
			return null;
		}

		types = types.substring( 'TYPE#'.length );

		return types.split( ',' );
	}


	/**
	 *
	 * @param  {array} data
	 * @return {?HTMLDocument}
	 */
	buildHTML( data ) {
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

			if( data.photo.includes( '://' ) ) {
				const td = row.querySelector( 'td' );
				td.innerHTML = `<a href="${data.photo}">${data.photo}</a>`;
			}

			table.append( row );
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
			const numCards = ( text.match( /BEGIN:VCARD\n/g ) || [] ).length;
			let i = 0;

			const container = document.createElement( 'div' );
			container.className = 'container';

			this.parse( text, data => {
				i++;

				const card = this.buildHTML( data );
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


Evy.VCFParser = VCFParser;

}
