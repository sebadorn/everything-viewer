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
	 * @param  {array} data
	 * @return {?HTMLDocument}
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
	 * @param {function?} cb
	 */
	load( cb ) {
		this.parser.parse( ( _err, tableData ) => {
			this.mdAdd( 'Columns', tableData.length > 0 ? tableData[0].length : 0 );
			this.mdAdd( 'Rows', tableData.length );
			this.buildMetaNode();

			const html = this._build( tableData );
			this.nodeView.append( html );
			this._openWindow();

			cb?.();
		} );
	}


};
