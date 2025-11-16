import { t } from '../../ui/Language.js';
import { BaseView } from '../BaseView.js';


export class CSVView extends BaseView {


	/**
	 *
	 * @param {CSVParser} parser
	 */
	constructor( parser ) {
		super( parser, 'csv' );
	}


	/**
	 *
	 * @param {any[]} data
	 * @return {HTMLDocument?}
	 */
	_build( data ) {
		const table = document.createElement( 'table' );

		for( let i = 0; i < data.length; i++ ) {
			const dataRow = data[i];
			const row = document.createElement( 'tr' );
			const tag = i === 0 ? 'th' : 'td';

			for( let j = 0; j < dataRow.length; j++ ) {
				const span = document.createElement( 'span' );
				span.textContent = dataRow[j];

				const cell = document.createElement( tag );
				cell.append( span );

				row.append( cell );
			}

			table.append( row );
		}

		return table;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<void>}
	 */
	async load() {
		const tableData = await this.parser.parse();

		this.mdAdd( t( 'columns' ), tableData.length > 0 ? tableData[0].length : 0 );
		this.mdAdd( t( 'rows' ), tableData.length );
		this.buildMetaNode();

		const html = this._build( tableData );
		this.nodeView.append( html );
		this._openWindow();
	}


};
