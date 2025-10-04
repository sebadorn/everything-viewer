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
		const tableGeneral = document.createElement( 'table' );
		tableGeneral.classList.add( 'header-general' );
		tableGeneral.append(
			UI.buildTableHeaderRow( 'Name', 'Type', 'Value' ),
			UI.buildTableRow( null, null, 'type', 'String', info.type ),
			UI.buildTableRow( null, null, 'version', 'Uint32', info.version ),
			UI.buildTableRow( null, null, 'metadata_kv_count', 'Uint64', info.metadata_kv_count ),
			UI.buildTableRow( null, null, 'tensor_count', 'Uint64', info.tensor_count ),
		);

		const tableMetadata = document.createElement( 'table' );
		tableMetadata.classList.add( 'header-metadata' );
		tableMetadata.append(
			UI.buildTableHeaderRow( 'Name', 'Type', 'Value' ),
			...this._buildMetadataRows( info.metadata ),
		);

		const tableTensors = document.createElement( 'table' );
		tableTensors.classList.add( 'header-tensors' );
		tableTensors.append(
			UI.buildTableHeaderRow( 'Name', 'Dimensions', 'Type' ),
			...this._buildTensorRows( info.tensors ),
		);

		const node = document.createElement( 'div' );
		node.classList.add( 'header-info' );
		node.append(
			UI.build( '<h3>General</h3>' ),
			tableGeneral,
			UI.build( '<h3>Metadata</h3>' ),
			tableMetadata,
			UI.build( '<h3>Tensors</h3>' ),
			tableTensors,
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

			const row = UI.buildTableRow( null, null, key, type, text );
			row.classList.add( key.replaceAll( '.', '-' ) );

			rows.push( row );
		}

		return rows;
	}


	/**
	 *
	 * @private
	 * @param {object[]} tensors
	 * @returns {HTMLTableRowElement[]}
	 */
	_buildTensorRows( tensors ) {
		const rows = [];

		for( let i = 0; i < tensors.length; i++ ) {
			const tensor = tensors[i];

			const row = UI.buildTableRow(
				null,
				null,
				tensor.name,
				'[' + tensor.dimensions.join( ', ' ) + ']',
				tensor.type,
			);

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
