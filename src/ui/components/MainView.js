import { DocumentUtils } from '../../DocumentUtils.js';
import { DropHandler } from '../DropHandler.js';
import { Language, t } from '../Language.js';
import { UI } from '../UI.js';
import { Button } from './Button.js';
import { Component } from './Component.js';
import { DropDown } from './DropDown.js';
import { Window } from './Window.js';


export class MainView extends Component {


	/**
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		super.render();

		const btnOpen = new Button( {
			classes: 'file-open',
			text: t( 'btnOpen' ),
		} );
		btnOpen.on( 'click', _ev => {
			const input = document.createElement( 'input' );
			input.type = 'file';
			input.addEventListener( 'change', _ev => {
				UI.open( input.files[0] );
			} );
			input.click();
		} );

		const dropDownLanguage = new DropDown(
			Language.supported.map( l => (
				{ value: l, text: t( `language.${l}`, l ) }
			) ),
			{
				classes: 'language',
				selected: Language.current,
			},
		);
		dropDownLanguage.on( 'change', async ev => {
			const changed = await Language.load( ev.detail.value );

			if( changed ) {
				const message = Language.getConfirmMessage( ev.detail.oldValue, ev.detail.value );

				if( confirm( message ) ) {
					location.reload();
				}
			}
		} );

		const windowOpen = new Window( {
			title: t( 'appName' ),
			closable: false,
			x: 40,
			y: 40,
			content: [
				btnOpen,
				UI.build( `<a href="https://github.com/sebadorn/everything-viewer" id="github">${t( 'github' )}</a>` ),
				dropDownLanguage,
			],
		} );

		const viewerArea = UI.build( `
			<main>
				<a href="https://github.com/sebadorn/everything-viewer/blob/main/CHANGELOG.md" target="_blank" class="build">BUILD ${DocumentUtils.getBuildNumber()}</a>
				<div class="viewer">
					<div class="note-dragdrop">
						<h1>${t( 'appName' )}</h1>
						<span>${t( 'mainDragDropNote' )}</span>
					</div>
				</div>
			</main>
		` );

		const dropArea = viewerArea.querySelector( '.viewer' );
		const dropHandler = new DropHandler( dropArea );
		dropHandler.on( 'file', file => UI.open( file ) );
		dropHandler.on( 'directory', ( dir, topLevelEntries ) => UI.open( dir ) );

		this._node = document.createDocumentFragment();
		this._node.append(
			windowOpen.render(),
			viewerArea,
		);

		return this._node;
	}


};
