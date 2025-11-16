import { t } from '../../ui/Language.js';
import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class ZIPView extends BaseView {


	/**
	 *
	 * @param {ZIPParser} parser
	 */
	constructor( parser ) {
		super( parser, 'zip' );
	}


	/**
	 *
	 * @override
	 * @returns {Promise<void>}
	 */
	async load() {
		let html = null;

		try {
			html = await this.parser.getHTML();

			this.metaData.push( {
				name: t( 'uncompressed' ),
				value: UI.formatSize( this.parser.uncompressedSize ),
			} );

			this.buildMetaNode();
		}
		catch( err ) {
			html = document.createElement( 'p' );
			html.className = 'note';
			html.textContent = err.message;
		}

		const wrap = document.createElement( 'div' );
		wrap.className = 'wrap';
		wrap.append( html );

		this.nodeView.append( wrap );
		this._openWindow();
	}


};
