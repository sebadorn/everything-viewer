import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class AIView extends BaseView {


	/**
	 *
	 * @param {AIParser} parser
	 */
	constructor( parser ) {
		super( parser, 'ai' );
	}


	/**
	 *
	 * @private
	 * @param {import('./AIPlugin.js').AIModelInfo} info
	 */
	_buildContent( info ) {
		const node = document.createElement( 'table' );
		node.classList.add( 'header-info' );

		node.append(
			UI.buildTableRow( null, 'type', 'String', info.type ),
			UI.buildTableRow( null, 'version', 'Uint32', info.version ),
			UI.buildTableRow( null, 'metadata_kv_count', 'Uint64', info.metadata_kv_count ),
			UI.buildTableRow( null, 'tensor_count', 'Uint64', info.tensor_count ),
			...this._buildMetadataRows( info.metadata ),
			...this._buildMetadataRows( info.tensors ),
		);

		this.nodeView.append( node );
	}


	/**
	 *
	 * @private
	 * @param {object} meta
	 * @returns {HTMLTableRowElement[]}
	 */
	_buildMetadataRows( meta ) {
		const rows = [];

		for( const key in meta ) {
			const entry = meta[key];
			const value = entry.value;

			let type = entry.type;
			let text = value;

			if( Array.isArray( value ) ) {
				const eleType = typeof value[0];
				type = `Array(${value.length})`;

				const containsStrings = eleType === 'string';
				const sep = containsStrings ? '", "' : ', ';
				text = '[';

				if( value.length > 30 ) {
					text += containsStrings ? '"' : '';
					text += value.slice( 0, 30 ).join( sep );
					text += containsStrings ? '"' : '';
					text += ', …';
				}
				else {
					text += containsStrings ? '"' : '';
					text += value.join( sep );
					text += containsStrings ? '"' : '';
				}

				text += ']';
			}

			const row = UI.buildTableRow( null, key, type, text );
			row.classList.add( key.replaceAll( '.', '-' ) );

			rows.push( row );
		}

		return rows;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<void>}
	 */
	async load() {
		const info = await this.parser.parse();

		this.buildMetaNode();

		this._buildContent( info );
		this._openWindow( {
			height: 800,
			width: Math.min( 1000, window.innerWidth ),
		} );
	}


};
