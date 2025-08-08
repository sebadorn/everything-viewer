import { BaseView } from '../BaseView.js';


export class ICalView extends BaseView {


	/**
	 *
	 * @param {ICalParser} parser
	 */
	constructor( parser ) {
		super( parser, 'ical' );
	}


	/**
	 *
	 * @override
	 * @returns {Promise<void>}
	 */
	async load() {
		const html = await this.parser.getHTML();

		this.buildMetaNode();

		this.nodeView.append( html );
		this._openWindow();
	}


};
