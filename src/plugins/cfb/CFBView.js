import { DocumentUtils } from '../../DocumentUtils.js';
import { Button } from '../../ui/components/Button.js';
import { ButtonGroup } from '../../ui/components/ButtonGroup.js';
import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class CFBView extends BaseView {


	/**
	 *
	 * @param {CFBParser} parser
	 */
	constructor( parser ) {
		super( parser, 'cfb' );
	}


	/**
	 *
	 * @private
	 * @param {import('@kenjiuno/msgreader').FieldsData} fileData
	 */
	_addMetaInfo( fileData ) {
		if( fileData.senderEmail || fileData.senderName ) {
			let sender = null;

			if( fileData.senderName ) {
				sender = fileData.senderName;

				if( fileData.senderEmail ) {
					sender += ` <${fileData.senderEmail}>`;
				}
			}
			else {
				sender = `<${fileData.senderEmail}>`;
			}

			this.mdAdd( 'Sender', sender );
		}

		if( Array.isArray( fileData.recipients ) ) {
			fileData.recipients.forEach( r => {
				let name = 'Recipient';

				if( r.recipType ) {
					name += ' ' + String( r.recipType ).toUpperCase();
				}

				let value = null;

				if( r.name ) {
					value = r.name;

					if( r.email ) {
						value += ` <${r.email}>`;
					}
				}
				else {
					value = `<${r.email}>`;
				}

				this.mdAdd( name, value );
			} );
		}

		if( Array.isArray( fileData.attachments ) ) {
			this.mdAdd( 'Attachments', fileData.attachments.length );
		}

		if( fileData.creationTime ) {
			this.mdAdd( 'Creation time', fileData.creationTime );
		}

		if( fileData.lastModificationTime ) {
			this.mdAdd( 'Last modification', fileData.lastModificationTime );
		}

		if( fileData.messageDeliveryTime ) {
			this.mdAdd( 'Delivery time', fileData.messageDeliveryTime );
		}
	}


	/**
	 *
	 * @private
	 * @returns {HTMLElement}
	 */
	_buildActions() {
		const header = new ButtonGroup( [
			new Button( {
				text: 'Content',
				classes: 'selected',
				onClick: () => {
					const body = this.nodeView.querySelector( '.content-body' );
					body.style.display = '';

					const attachments = this.nodeView.querySelector( '.content-attachments' );
					attachments.style.display = 'none';
				},
			} ),
			new Button( {
				text: 'Attachments',
				onClick: () => {
					const body = this.nodeView.querySelector( '.content-body' );
					body.style.display = 'none';

					const attachments = this.nodeView.querySelector( '.content-attachments' );
					attachments.style.display = '';
				},
			} ),
		] );

		return header.render();
	}


	/**
	 *
	 * @private
	 * @param {import('@kenjiuno/msgreader').FieldsData} attachment
	 * @param {HTMLImageElement?} image
	 * @returns {HTMLElement}
	 */
	_buildAttachmentItem( attachment, image ) {
		const item = UI.build( `
			<li class="attachment" data-id="${attachment.dataId}">
				<div class="image"></div>
				<table class="info"></table>
			</li>
		` );

		const fileLink = this.parser.getObjectURL( attachment );
		const fileName = UI.escapeHTML( attachment.fileName || attachment.name );
		const download = image ? '' : ` download="${attachment.fileNameShort || attachment.fileName}"`;

		const info = item.querySelector( '.info' );
		info.append(
			UI.buildTableRow(
				'Filename:',
				`<a href="${fileLink}" target="_blank"${download}>${fileName}</a>`,
				{ valueAsHTML: true }
			),
			UI.buildTableRow( 'Filesize:', UI.formatSize( attachment.contentLength || 0 ) ),
		);

		if( typeof attachment.attachMimeTag === 'string' ) {
			info.append( UI.buildTableRow( 'Type:', attachment.attachMimeTag ) );
		}

		if( image ) {
			UI.onImageComplete( image, () => {
				const dimension = `${image.naturalWidth}×${image.naturalHeight} px`;
				info.append( UI.buildTableRow( 'Dimensions:', dimension ) );

				image.width = image.naturalWidth;
				image.height = image.naturalHeight;
			} );

			item.querySelector( '.image' ).append( image );
		}

		return item;
	}


	/**
	 *
	 * @private
	 * @param {MsgReader} msg
	 */
	_buildContent( msg ) {
		const fileData = msg.getFileData();

		let dom = '';

		if( typeof fileData.bodyHtml === 'string' ) {
			dom = DocumentUtils.buildDocument( fileData.bodyHtml );
		}
		else if( typeof fileData.body === 'string' ) {
			let text = DocumentUtils.decodeContent( fileData.body );
			dom = DocumentUtils.buildDocument(
				`<pre style="white-space: pre-wrap; word-break: break-word;">${text}</pre>`
			);
		}

		const node = UI.build( `
			<div class="content-body">
				<iframe class="content-no-res" sandbox></iframe>
			</div>
			<div class="content-attachments" style="display: none;">
				<ol class="list"></ol>
			</div>
		` );

		if( fileData.subject ) {
			const subject = UI.build( `<div class="subject">${UI.escapeHTML( fileData.subject )}</div>` );
			const body = node.querySelector( '.content-body' );
			body.prepend( subject );
		}

		const iframe = node.querySelector( '.content-body iframe' );
		iframe.setAttribute( 'srcdoc', dom.documentElement.outerHTML );

		const list = node.querySelector( '.content-attachments .list');

		( fileData.attachments || [] ).forEach( attachment => {
			if( attachment.dataType !== 'attachment' ) {
				return;
			}

			const image = this.parser.getImage( attachment );
			const item = this._buildAttachmentItem( attachment, image );
			list.append( item );
		} );

		this.nodeView.append( this._buildActions(), node );
	}


	/**
	 *
	 * @param {function?} cb
	 */
	load( cb ) {
		this.parser.parse( ( _err, msg ) => {
			// Logged on purpose, so users can access everything in the browser dev tools.
			console.log( '[CFBView.load] MsgReader:', msg );

			this._addMetaInfo( msg.getFileData() );
			this.buildMetaNode();

			this._buildContent( msg );
			this._openWindow( {
				height: 800,
				width: Math.min( 1000, window.innerWidth ),
			} );
			cb?.();
		} );
	}


};
