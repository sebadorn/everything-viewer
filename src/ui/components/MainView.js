import { DocumentUtils } from '../../DocumentUtils.js';
import { DropHandler } from '../DropHandler.js';
import { UI } from '../UI.js';
import { Button } from './Button.js';
import { Component } from './Component.js';
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
			text: 'Open…',
		} );
		btnOpen.on( 'click', _ev => {
			const input = document.createElement( 'input' );
			input.type = 'file';
			input.addEventListener( 'change', _ev => {
				UI.open( input.files[0] );
			} );
			input.click();
		} );

		const windowOpen = new Window( {
			title: 'Everything Viewer',
			closable: false,
			x: 20,
			y: 20,
			content: [
				btnOpen,
				UI.build( '<a href="https://github.com/sebadorn/everything-viewer" id="github">GitHub</a>' ),
			],
		} );

		const viewerArea = UI.build( `
			<main>
				<span class="build">BUILD ${DocumentUtils.getBuildNumber()}</span>
				<div class="viewer">
					<div class="note-dragdrop">
						<h1>Everything Viewer</h1>
						<span>Just drag &amp; drop your file here</span>
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
