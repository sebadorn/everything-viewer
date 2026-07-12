import { Button } from '../../ui/components/Button.js';
import { ButtonGroup } from '../../ui/components/ButtonGroup.js';
import { Icons } from '../../ui/Icons.js';
import { t } from '../../ui/Language.js';
import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class EMLView extends BaseView {


	/**
	 *
	 * @param {EMLParser} parser
	 */
	constructor( parser ) {
		super( parser, 'eml' );
	}


	/**
	 *
	 * @private
	 * @param {import('mailparser').ParsedMail} fileData
	 */
	_addMetaInfo( fileData ) {
		if( fileData.from?.text ) {
			this.mdAdd( t( 'sender' ), fileData.from.text );
		}

		if( fileData.to?.text ) {
			this.mdAdd( t( 'recipient' ), fileData.to.text );
		}

		if( Array.isArray( fileData.attachments ) ) {
			this.mdAdd( t( 'attachments' ), fileData.attachments.length );
		}

		if( fileData.date ) {
			this.mdAdd( t( 'date' ), fileData.date.toUTCString() );
		}
	}


	/**
	 *
	 * @private
	 * @return {DocumentFragment}
	 */
	_buildActions() {
		const header = new ButtonGroup( [
			new Button( {
				text: t( 'eml.showHeaders' ),
				onClick: () => {
					this.nodeView.querySelector( 'iframe.content-res' )?.remove();

					const iframe = this.nodeView.querySelector( 'iframe.content-no-res' );
					iframe.style.display = 'none';

					const attachments = this.nodeView.querySelector( '.content-attachments' );
					attachments.style.display = 'none';

					const headers = this.nodeView.querySelector( '.headers' );
					headers.style.display = '';
				},
			} ),
			new Button( {
				text: t( 'eml.contentNoExternal' ),
				classes: 'selected',
				onClick: () => {
					this.nodeView.querySelector( 'iframe.content-res' )?.remove();

					const iframe = this.nodeView.querySelector( 'iframe.content-no-res' );
					iframe.style.display = '';

					const headers = this.nodeView.querySelector( '.headers' );
					headers.style.display = 'none';

					const attachments = this.nodeView.querySelector( '.content-attachments' );
					attachments.style.display = 'none';
				},
			} ),
			new Button( {
				text: t( 'eml.contentExternal' ),
				onClick: async () => {
					const didConfirm = window.confirm( t( 'eml.confirmExternal' ) );

					if( !didConfirm ) {
						return false;
					}

					this.nodeView.querySelector( 'iframe.content-res' )?.remove();

					const iframe = this.nodeView.querySelector( 'iframe.content-no-res' );
					iframe.style.display = 'none';

					const headers = this.nodeView.querySelector( '.headers' );
					headers.style.display = 'none';

					const attachments = this.nodeView.querySelector( '.content-attachments' );
					attachments.style.display = 'none';

					const res = await this.parser.getBodyDOM( { remove_external: false } );
					const newIframe = document.createElement( 'iframe' );
					newIframe.className = `content-res eml-type-${res.type}`;
					newIframe.setAttribute( 'sandbox', '' );
					newIframe.setAttribute( 'srcdoc', res.dom.documentElement.outerHTML );

					this.nodeView.append( newIframe );
				},
			} ),
			new Button( {
				text: t( 'attachments' ),
				onClick: () => {
					this.nodeView.querySelector( 'iframe.content-res' )?.remove();

					const iframe = this.nodeView.querySelector( 'iframe.content-no-res' );
					iframe.style.display = 'none';

					const headers = this.nodeView.querySelector( '.headers' );
					headers.style.display = 'none';

					const attachments = this.nodeView.querySelector( '.content-attachments' );
					attachments.style.display = '';
				},
			} ),
		] );

		return header.render();
	}


	/**
	 *
	 * @param {import('mailparser').Attachment[]} attachments
	 * @returns {HTMLElement}
	 */
	_buildAttachmentsHTML( attachments ) {
		const list = document.createElement( 'ol' );
		list.className = 'list';

		( attachments || [] ).forEach( attachment => {
			if( attachment.type !== 'attachment' ) {
				return;
			}

			const image = this.parser.getImage( attachment );
			const item = this._buildAttachmentItem( attachment, image );
			list.append( item );
		} );

		const container = document.createElement( 'div' );
		container.className = 'content-attachments';
		container.append( list );

		return container;
	}


	/**
	 *
	 * @private
	 * @param {import('mailparser').Attachment} attachment
	 * @param {HTMLImageElement?} image
	 * @returns {HTMLElement}
	 */
	_buildAttachmentItem( attachment, image ) {
		const item = UI.build( `
			<li class="attachment" data-id="${attachment.cid}">
				<div class="image"></div>
				<table class="info"></table>
			</li>
		` );

		const fileLink = this.parser.getObjectURL( attachment );
		const fileName = UI.escapeHTML( attachment.filename || attachment.contentId );
		const download = image ? '' : ` download="${attachment.filename}"`;

		const info = item.querySelector( '.info' );
		info.append(
			UI.buildTableRow(
				{ valueAsHTML: true },
				t( 'filename' ) + ':',
				`<a href="${fileLink}" target="_blank"${download}>${fileName}</a>`,
			),
			UI.buildTableRow( null, t( 'filesize' ) + ':', UI.formatSize( attachment.size || 0 ) ),
		);

		if( typeof attachment.contentType === 'string' ) {
			info.append( UI.buildTableRow( null, t( 'type' ) + ':', attachment.contentType ) );
		}

		if( image ) {
			UI.onImageComplete( image, () => {
				const dimension = `${image.naturalWidth}×${image.naturalHeight} px`;
				info.append( UI.buildTableRow( null, t( 'dimensions' ) + ':', dimension ) );

				image.width = image.naturalWidth;
				image.height = image.naturalHeight;
			} );

			item.querySelector( '.image' ).append( image );
		}
		else {
			const imageWrap = item.querySelector( '.image' );
			imageWrap.classList.add( 'symbol' );

			const icon = this._getAttachmentIcon( attachment );
			imageWrap.append( UI.build( `<span class="icon">${icon}</span>` ) );
		}

		return item;
	}


	/**
	 *
	 * @param {import('mailparser').HeaderLines} headers
	 * @return {HTMLElement}
	 */
	_buildHeadersHTML( headers ) {
		const table = document.createElement( 'table' );

		headers.forEach( header => {
			const name = document.createElement( 'th' );
			name.className = 'header-name';
			name.textContent = t( 'eml.header.' + String( header.key ).toLowerCase(), header.key );

			const tdValue = document.createElement( 'td' );
			tdValue.className = 'header-value';
			tdValue.textContent = header.line;

			const row = document.createElement( 'tr' );
			row.append( name, tdValue );

			table.append( row );
		} );

		const container = document.createElement( 'div' );
		container.className = 'headers';
		container.append( table );

		return container;
	}


	/**
	 *
	 * @private
	 * @param {import('mailparser').Attachment} attachment
	 * @returns {string}
	 */
	_getAttachmentIcon( attachment ) {
		let icon = Icons.attachment;

		if( String( attachment.filename ).endsWith( '.zip' ) ) {
			icon = Icons.format_zip;
		}

		return icon;
	}


	/**
	 *
	 * @override
	 * @returns {Promise<void>}
	 */
	async load() {
		const iframe = document.createElement( 'iframe' );
		iframe.className = 'content-no-res';
		iframe.setAttribute( 'sandbox', '' );

		/** @type {import('mailparser').ParsedMail} */
		const parsed = await this.parser.parse();

		const result = await this.parser.getBodyDOM( { remove_external: true } );
		const headers = await this._buildHeadersHTML( parsed.headerLines );
		const attachments = await this._buildAttachmentsHTML( parsed.attachments );

		this._addMetaInfo( parsed );
		this.buildMetaNode();

		const actions = this._buildActions();
		headers.style.display = 'none';
		attachments.style.display = 'none';

		iframe.classList.add( `eml-type-${result.type}` );
		iframe.setAttribute( 'srcdoc', result.dom.documentElement.outerHTML );

		this.nodeView.append( actions, headers, iframe, attachments );
		this._openWindow();
	}


};
