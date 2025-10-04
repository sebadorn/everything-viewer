import { Button } from '../../ui/components/Button.js';
import { ButtonGroup } from '../../ui/components/ButtonGroup.js';
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
	 * @return {DocumentFragment}
	 */
	_buildActions() {
		const header = new ButtonGroup( [
			new Button( {
				text: 'Show Headers',
				onClick: () => {
					this.nodeView.querySelector( 'iframe.content-res ')?.remove();

					const iframe = this.nodeView.querySelector( 'iframe.content-no-res' );
					iframe.style.display = 'none';

					const headers = this.nodeView.querySelector( '.headers' );
					headers.style.display = '';
				},
			} ),
			new Button( {
				text: 'Content (no external)',
				classes: 'selected',
				onClick: () => {
					this.nodeView.querySelector( 'iframe.content-res ')?.remove();

					const iframe = this.nodeView.querySelector( 'iframe.content-no-res' );
					iframe.style.display = '';

					const headers = this.nodeView.querySelector( '.headers' );
					headers.style.display = 'none';
				},
			} ),
			new Button( {
				text: 'Content (with external)',
				onClick: () => {
					const didConfirm = window.confirm(
						'Show the content and load its external resources?\n' +
						'This could pose a security risk.\n\n' +
						'Only agree if you trust the EML file.'
					);

					if( !didConfirm ) {
						return false;
					}

					this.nodeView.querySelector( 'iframe.content-res ')?.remove();

					const iframe = this.nodeView.querySelector( 'iframe.content-no-res' );
					iframe.style.display = 'none';

					const headers = this.nodeView.querySelector( '.headers' );
					headers.style.display = 'none';

					this.parser.getBodyDOM( { remove_external: false }, ( _err, dom, type ) => {
						const iframe = document.createElement( 'iframe' );
						iframe.className = `content-res eml-type-${type}`;
						iframe.setAttribute( 'sandbox', '' );
						iframe.setAttribute( 'srcdoc', dom.documentElement.outerHTML );

						this.nodeView.append( iframe );
					} );
				},
			} ),
		] );

		return header.render();
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

		const result = await this.parser.getBodyDOM( { remove_external: true } );
		const headers = await this.parser.getHeadersHTML();

		this.buildMetaNode();

		const actions = this._buildActions();
		headers.style.display = 'none';

		iframe.classList.add( `eml-type-${result.type}` );
		iframe.setAttribute( 'srcdoc', result.dom.documentElement.outerHTML );

		this.nodeView.append( actions, headers, iframe );
		this._openWindow();
	}


};
