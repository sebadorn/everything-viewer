'use strict';


Evy.UI.EMLView = class extends Evy.UI.BaseView {


	/**
	 *
	 * @constructor
	 * @param {Evy.EMLParser} parser
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
		const node = Evy.UI.buildHTML( `
			<div class="actions">
				<button class="show-headers">Show Headers</button>
				<button class="show-content-no-res active">Content (no external)</button>
				<button class="show-content">Content (with external)</button>
			</div>
		` );

		const btnHeaders = node.querySelector( 'button.show-headers' );
		btnHeaders.addEventListener( 'click', _ev => {
			btnHeaders.className = 'show-headers active';
			btnContentNoRes.className = 'show-content-no-res';
			btnContentRes.className = 'show-content';

			const iframeRes = this.nodeView.querySelector( 'iframe.content-res ');

			if( iframeRes ) {
				iframeRes.remove();
			}

			const iframe = this.nodeView.querySelector( 'iframe.content-no-res' );
			iframe.style.display = 'none';

			const headers = this.nodeView.querySelector( '.headers' );
			headers.style.display = '';
		} );

		const btnContentNoRes = node.querySelector( 'button.show-content-no-res' );
		btnContentNoRes.addEventListener( 'click', _ev => {
			btnHeaders.className = 'show-headers';
			btnContentNoRes.className = 'show-content-no-res active';
			btnContentRes.className = 'show-content';

			const iframeRes = this.nodeView.querySelector( 'iframe.content-res ');

			if( iframeRes ) {
				iframeRes.remove();
			}

			const iframe = this.nodeView.querySelector( 'iframe.content-no-res' );
			iframe.style.display = '';

			const headers = this.nodeView.querySelector( '.headers' );
			headers.style.display = 'none';
		} );

		const btnContentRes = node.querySelector( 'button.show-content' );
		btnContentRes.addEventListener( 'click', _ev => {
			const didConfirm = window.confirm(
				'Show the content and load its external resources?\n' +
				'This could pose a security risk.\n\n' +
				'Only agree if you trust the EML file.'
			);

			if( !didConfirm ) {
				return;
			}

			btnHeaders.className = 'show-headers';
			btnContentNoRes.className = 'show-content-no-res';
			btnContentRes.className = 'show-content active';

			const iframeRes = this.nodeView.querySelector( 'iframe.content-res ');

			if( iframeRes ) {
				iframeRes.remove();
			}

			const iframe = this.nodeView.querySelector( 'iframe.content-no-res' );
			iframe.style.display = 'none';

			const headers = this.nodeView.querySelector( '.headers' );
			headers.style.display = 'none';

			this.parser.getBodyDOM( { remove_external: false }, ( _err, dom ) => {
				const iframe = document.createElement( 'iframe' );
				iframe.className = 'content-res';
				iframe.setAttribute( 'sandbox', '' );
				iframe.setAttribute( 'srcdoc', dom.documentElement.outerHTML );

				this.nodeView.append( iframe );
			} );
		} );

		return node;
	}


	/**
	 *
	 * @param {function} cb
	 */
	load( cb ) {
		const iframe = document.createElement( 'iframe' );
		iframe.className = 'content-no-res';
		iframe.setAttribute( 'sandbox', '' );

		this.parser.getBodyDOM( { remove_external: true }, ( _err, dom ) => {
			this.parser.getHeadersHTML( ( _err, headers ) => {
				this.buildMetaNode();

				const actions = this._buildActions();
				headers.style.display = 'none';
				iframe.setAttribute( 'srcdoc', dom.documentElement.outerHTML );

				this.nodeView.append( actions, headers, iframe );

				cb();
			} );
		} );
	}


}