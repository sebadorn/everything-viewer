import { t } from '../../ui/Language.js';
import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class VCFView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'vcf' );
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
		const row = UI.buildTableRow( null, name, value );

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
				let poBox = value[0] || '';
				let extAddr = value[1] || '';
				let street = value[2] || '';
				let locality = value[3] || '';
				let region = value[4] || '';
				let postal = value[5] || '';
				let country = value[6] || '';

				value = '';

				if( poBox.length > 0 ) {
					value += poBox + '\n';
				}

				if( extAddr.length > 0 ) {
					value += extAddr + '\n';
				}

				if( street.length > 0 ) {
					value += street + '\n';
				}

				if( locality.length > 0 ) {
					if( region.length > 0 ) {
						value += `${locality}, ${region}`;

						if( postal.length > 0 ) {
							value += ' ' + postal;
						}

						value += '\n';
					}
					else {
						value += locality + '\n';
					}
				}

				if( locality.length < 1 && region.length > 0 ) {
					value += region + '\n';
				}

				if( locality.length < 1 && postal.length > 0 ) {
					value += postal + '\n';
				}

				if( country.length > 0 ) {
					value += country + '\n';
				}

				if( value.endsWith( '\n' ) ) {
					value = value.substring( 0, value.length - 1 );
				}
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
			value = UI.escapeHTML( value.trim() );
			value = `<a href="${value}">${value}</a>`;
			options.valueAsHTML = true;
		}
		else if( value.includes( '\n' ) ) {
			value = UI.escapeHTML( value );
			value = value.replaceAll( '\n', '<br>' );
			options.valueAsHTML = true;
		}
		else if( attr === 'email' && value.includes( '@' ) ) {
			value = UI.escapeHTML( value.trim() );
			value = `<a href="mailto:${value}">${value}</a>`;
			options.valueAsHTML = true;
		}

		const row = UI.buildTableRow( options, name, value );

		return row;
	}


	/**
	 *
	 * @private
	 * @param {Array} data
	 * @returns {string[]} 
	 */
	_getAttributesToIgnore( data ) {
		return [
			'rev',
			'version',
		];
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
				HOME: t( 'vcf.addressHome' ),
				WORK: t( 'vcf.addressWork' ),
				default: t( 'address' ),
			},
			anniversary: t( 'vcf.anniversary' ),
			bday: t( 'vcf.birthday' ),
			categories: t( 'categories' ),
			email: {
				HOME: t( 'vcf.emailHome' ),
				WORK: t( 'vcf.emailWork' ),
				default: t( 'email' ),
			},
			fn: t( 'displayName' ),
			gender: t( 'vcf.gender' ),
			geo: t( 'vcf.geo' ),
			impp: t( 'vcf.impp' ),
			key: t( 'key' ),
			label: {
				HOME: t( 'vcf.labelHome' ),
				WORK: t( 'vcf.labelWork' ),
				default: t( 'vcf.label' ),
			},
			lang: t( 'language' ),
			logo: t( 'vcf.logo' ),
			member: t( 'vcf.member' ),
			n: t( 'name' ),
			nickname: t( 'vcf.nickname' ),
			note: t( 'vcf.note' ),
			org: t( 'vcf.org' ),
			photo: t( 'photo' ),
			prodid: t( 'vcf.prodid' ),
			related: t( 'vcf.related' ),
			rev: t( 'vcf.rev' ),
			role: t( 'vcf.role' ),
			sound: t( 'vcf.sound' ),
			tel: {
				HOME: t( 'vcf.phoneHome' ),
				WORK: t( 'vcf.phoneWork' ),
				default: t( 'vcf.phone' ),
			},
			title: t( 'title' ),
			tz: t( 'timezone' ),
			url: t( 'url' ),
			version: t( 'version' ),
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
	 * @param {array} data
	 * @return {object}
	 */
	build( data ) {
		const card = document.createElement( 'div' );
		card.className = 'vcard';

		let version = null;
		let lastUpdated = null;

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

				if( attr === 'version' ) {
					version = value;
				}
				else if( attr === 'rev' ) {
					lastUpdated = value;
				}

				if( ignoreAttr.includes( attr ) ) {
					continue;
				}

				let item = null;

				switch( type ) {
					case 'binary':
						if( VCFView.isImageType( meta.type ) ) {
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

		return {
			version: version,
			node: card,
			lastUpdated: lastUpdated,
		};
	}


	/**
	 *
	 * @param {string} type
	 * @returns {boolean}
	 */
	static isImageType( type ) {
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
	 * @override
	 * @returns {Promise<void>}
	 */
	async load() {
		const text = await this.parser.getText();

		const container = document.createElement( 'div' );
		container.className = 'container';

		const data = await this.parser.parse( text );
		let version = null;
		let lastUpdated = null;

		if( Array.isArray( data ) && data.length > 0 ) {
			if( data[0] === 'vcard' ) {
				const result = this.build( data );
				version = result.version;
				lastUpdated = result.lastUpdated;
				container.append( result.node );
			}
			else {
				data.forEach( entry => {
					const result = this.build( entry );
					version = result.version;
					lastUpdated = result.lastUpdated;
					container.append( result.node );
				} );
			}
		}

		if( version ) {
			this.mdAdd( t( 'version' ), version );
		}

		if( lastUpdated ) {
			this.mdAdd( t( 'lastUpdated' ), lastUpdated );
		}

		this.buildMetaNode();

		this.nodeView.append( container );
		this._openWindow();
	}


};
