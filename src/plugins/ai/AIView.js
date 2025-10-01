import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class AIView extends BaseView {


	/**
	 *
	 * @param {AIParser} parser
	 */
	constructor( parser ) {
		super( parser, 'cfb' );
	}


	/**
	 *
	 * @private
	 * @param {object} info
	 */
	_addMetaInfo( info ) {
		// TODO:
	}


	/**
	 *
	 * @private
	 * @param {object} info
	 */
	_buildContent( info ) {
		const node = UI.build( `` ); // TODO:

		this.nodeView.append( node );
	}


	/**
	 *
	 * @override
	 * @returns {Promise<void>}
	 */
	async load() {
		const info = await this.parser.parse();

		this._addMetaInfo( info );
		this.buildMetaNode();

		this._buildContent( info );
		this._openWindow( {
			height: 800,
			width: Math.min( 1000, window.innerWidth ),
		} );
	}


};
