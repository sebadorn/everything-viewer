'use strict';


{

class BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.BaseParser}  parser
	 * @param {string}         [type="base"]
	 */
	constructor( parser, type = 'base' ) {
		this.parser = parser;
		this.type = type;

		this.metaData = {
			Filename: this.parser.file.name,
			Type: this.parser.mimeType,
			Filesize: Evy.UI.formatSize( this.parser.file.size )
		};

		this.nodeView = document.createElement( 'div' );
		this.nodeView.className = 'view view-' + this.type;

		this.nodeMeta = document.createElement( 'div' );
		this.nodeMeta.className = 'meta meta-' + this.type;
	}


	/**
	 *
	 */
	buildMetaNode() {
		if( Object.keys( this.metaData ).length === 0 ) {
			return;
		}

		const table = document.createElement( 'table' );

		for( const key in this.metaData ) {
			const name = document.createElement( 'th' );
			name.className = 'name';
			name.textContent = key + ': ';

			const value = document.createElement( 'td' );
			value.className = 'value';
			value.textContent = this.metaData[key];

			const row = document.createElement( 'tr' );
			row.append( name, value );

			table.append( row );
		}

		this.nodeMeta.append( table );
	}


	/**
	 *
	 */
	destroy() {
		this.nodeView.remove();
		this.nodeMeta.remove();
	}


	/**
	 * Load and build the view's contents.
	 * @param {function} cb
	 */
	load( cb ) {
		const note = document.createElement( 'p' );
		note.className = 'note';
		note.textContent = `No parser found for file of type: "${this.parser.mimeType}"`;

		this.buildMetaNode();

		this.nodeView.append( note );

		cb();
	}


}


Evy.UI.BaseView = BaseView;

}
