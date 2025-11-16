import { t } from '../../ui/Language.js';
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
	 * @param {HTMLTableElement} table
	 * @param {*} value
	 * @param {string} name
	 * @param {string} valType
	 */
	_addRowIfExists( table, value, name, valType ) {
		if( typeof value === 'undefined' || value === null ) {
			return;
		}

		table.append( UI.buildTableRow( null, null, name, valType, value ) );
	}


	/**
	 *
	 * @private
	 * @param {import('./AIPlugin.js').AIModelInfo} info
	 */
	_buildContent( info ) {
		const node = document.createElement( 'div' );
		node.classList.add( 'header-info' );

		const tableGeneral = document.createElement( 'table' );
		tableGeneral.classList.add( 'header-general' );
		tableGeneral.append(
			UI.buildTableHeaderRow( t( 'name' ), t( 'type' ), t( 'value' ) ),
			UI.buildTableRow( null, null, 'type', 'String', info.type ),
		);

		this._addRowIfExists( tableGeneral, info.version, 'type', 'String' );
		this._addRowIfExists( tableGeneral, info.metadata_kv_count, 'metadata_kv_count', 'Uint64' );
		this._addRowIfExists( tableGeneral, info.tensor_count, 'tensor_count', 'Uint64' );

		node.append(
			UI.build( `<h3>${t( 'general' )}</h3>` ),
			tableGeneral,
		);

		if( info.metadata ) {
			const tableMetadata = document.createElement( 'table' );
			tableMetadata.classList.add( 'header-metadata' );

			if( info.type === 'Safetensors' ) {
				for( const key in info.metadata ) {
					const value = info.metadata[key];

					tableMetadata.append(
						UI.buildTableHeaderRow( t( 'name' ), t( 'value' ) ),
						UI.buildTableRow( null, null, key, value ),
					);
				}
			}
			else {
				tableMetadata.append(
					UI.buildTableHeaderRow( t( 'name' ), t( 'type' ), t( 'value' ) ),
					...this._buildMetadataRows( info.metadata ),
				);
			}

			node.append(
				UI.build( `<h3>${t( 'metadata' )}</h3>` ),
				tableMetadata,
			);
		}

		if( info.tensors ) {
			const tableTensors = document.createElement( 'table' );
			tableTensors.classList.add( 'header-tensors' );
			tableTensors.append(
				UI.buildTableHeaderRow( t( 'name' ), t( 'dimensions' ), t( 'type' ) ),
				...this._buildTensorRows( info.tensors ),
			);

			node.append(
				UI.build( `<h3>${t( 'tensors' )}</h3>` ),
				tableTensors,
			);
		}

		node.append( UI.build( '<div class="clear"></div>' ) );

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
	 * @param {object|object[]} tensors
	 * @returns {HTMLTableRowElement[]}
	 */
	_buildTensorRows( tensors ) {
		const rows = [];

		if( Array.isArray( tensors ) ) {
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
		}
		else {
			const keys = Object.keys( tensors );

			keys.sort( ( a, b ) => {
				return a.localeCompare( b, undefined, { numeric: true } );
			} );

			for( const key of keys ) {
				const data = tensors[key];

				const row = UI.buildTableRow(
					null,
					null,
					key,
					'[' + data.shape.join( ', ' ) + ']',
					data.dtype,
				);

				rows.push( row );
			}
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
