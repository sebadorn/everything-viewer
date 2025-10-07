import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class MHTMLView extends BaseView {


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'mhtml' );

		this.metaData = [
			{ name: 'Filename', value: this.parser.file.name },
			{ name: 'Filesize', value: UI.formatSize( this.parser.file.size ) }
		];
	}


	/**
	 *
	 * @private
	 * @param {string} html
	 * @returns {HTMLElement}
	 */
	_build( html ) {
		const iframe = document.createElement( 'iframe' );
		iframe.className = 'content-no-res';
		iframe.setAttribute( 'sandbox', 'allow-downloads allow-same-origin' );
		iframe.setAttribute( 'srcdoc', html );

		return iframe;
	}


	/**
	 *
	 * @returns {Promise<void>}
	 */
	async load() {
		const data = await this.parser.parse();

		for( const key in data.meta ) {
			if( key.startsWith( '_' ) ) {
				continue;
			}

			let value = data.meta[key];

			if( key.toLowerCase() === 'content-type' ) {
				const index = value.indexOf( '; boundary="' );

				if( index > 0 ) {
					value = value.substring( 0, index );
				}
			}

			this.mdAdd( key, value );
		}

		this.buildMetaNode();

		this.nodeView.append( this._build( data.html ) );
		this._openWindow( { width: 1000 } );
	}


};
