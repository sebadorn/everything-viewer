import { UI } from '../UI.js';
import { Component } from './Component.js';


export const WindowState = {
	CLOSED: 1,
	OPEN: 2,
};


export class Window extends Component {


	static topZindex = 9;


	/**
	 *
	 * @param {object}  config
	 * @param {boolean} [config.closable = true]
	 * @param {(Node|string|Component)[]?} config.content
	 * @param {string?} config.id
	 * @param {string?} config.title
	 * @param {number?} config.x
	 * @param {number?} config.y
	 */
	constructor( config ) {
		super();

		this._config = config;

		if( typeof this._config.x === 'undefined' ) {
			this._config.x = window.innerWidth / 2;
		}

		if( typeof this._config.y === 'undefined' ) {
			this._config.y = 60;
		}

		this._isDragging = false;
		this._lastPos = {
			x: null,
			y: null
		};

		this._cbMouseUp = this._onEnd.bind( this );
		this._cbMouseMove = this._onMove.bind( this );

		this.state = WindowState.CLOSED;
	}


	/**
	 *
	 * @private
	 * @param {string[]} [skip = []]
	 */
	_applyConfig( skip = [] ) {
		if( !this._config ) {
			return;
		}

		if( this._config.id && !skip.includes( 'id' ) ) {
			this._node.setAttribute( 'id', this._config.id );
		}

		if( typeof this._config.title === 'string' && !skip.includes( 'title' ) ) {
			const titleNode = this._node.querySelector( 'header .title' );
			UI.removeAllChildren( titleNode );
			titleNode.innerHTML = this._config.title;
		}

		this._node.classList.remove( 'closable' );

		if( this._config.closable !== false ) {
			this._node.classList.add( 'closable' );
		}

		if( Array.isArray( this._config.content ) && !skip.includes( 'content' ) ) {
			const node = this._node.querySelector( '.content' );
			UI.removeAllChildren( node );

			for( let content of this._config.content ) {
				if( content instanceof Component ) {
					node.append( content.render() );
				}
				else {
					node.append( content );
				}
			}
		}

		if( typeof this._config.x === 'number' && !skip.includes( 'x' ) ) {
			this._node.style.left = this._config.x + 'px';
		}

		if( typeof this._config.y === 'number' && !skip.includes( 'y' ) ) {
			this._node.style.top = this._config.y + 'px';
		}
	}


	/**
	 *
	 * @private
	 * @param {MouseEvent} _ev
	 */
	_onEnd( _ev ) {
		this._isDragging = false;

		document.body.removeEventListener( 'mouseup', this._cbMouseUp );
		document.body.removeEventListener( 'mousemove', this._cbMouseMove );
	}


	/**
	 *
	 * @private
	 * @param {MouseEvent} ev
	 */
	_onMove( ev ) {
		if( !this._isDragging ) {
			return;
		}

		if( this._lastPos.x === null ) {
			this._lastPos.x = ev.clientX;
			this._lastPos.y = ev.clientY;

			return;
		}

		const nodeLeft = parseInt( this._node.style.left, 10 );
		const nodeTop = parseInt( this._node.style.top, 10 );

		const diffX = ev.clientX - this._lastPos.x;
		const diffY = ev.clientY - this._lastPos.y;

		this._node.style.left = Math.round( nodeLeft + diffX ) + 'px';
		this._node.style.top = Math.round( nodeTop + diffY ) + 'px';

		this._lastPos.x = ev.clientX;
		this._lastPos.y = ev.clientY;
	}


	/**
	 *
	 * @private
	 * @param {MouseEvent} ev
	 */
	_onStart( ev ) {
		if( String( ev.target.className ).includes( 'toggle' ) ) {
			return;
		}

		if( ev.button === 0 ) {
			this._isDragging = true;

			document.body.addEventListener( 'mouseup', this._cbMouseUp );
			document.body.addEventListener( 'mousemove', this._cbMouseMove );
		}

		this._lastPos.x = null;
		this._lastPos.y = null;

		// Only increase z-index of not already top-most window.
		if( this._node.style.zIndex < Window.topZindex ) {
			this._node.style.zIndex = ++Window.topZindex;
		}
	}


	/**
	 *
	 * @private
	 */
	_toggleContent() {
		let clsList = this._node.classList;

		if( clsList.contains( 'window-collapsed' ) ) {
			clsList.replace( 'window-collapsed', 'window-open' );
		}
		else {
			clsList.replace( 'window-open', 'window-collapsed' );
		}
	}


	/**
	 *
	 */
	center() {
		if( !this._node ) {
			return;
		}

		const rect = this._node.getBoundingClientRect();

		this.moveTo( {
			x: ( window.innerWidth - rect.width ) / 2,
			y: ( window.innerHeight - rect.height ) / 2,
		} );
	}


	/**
	 *
	 */
	close() {
		if( this.state !== WindowState.CLOSED ) {
			this.state = WindowState.CLOSED;
			this.fire( 'close' );
			this._node?.remove();
		}
	}


	/**
	 *
	 * @param {object}  pos
	 * @param {number?} pos.x
	 * @param {number?} pos.y
	 */
	moveTo( pos ) {
		if( typeof pos.x === 'number' ) {
			this._node.style.left = pos.x + 'px';
			this._lastPos.x = pos.x;
		}

		if( typeof pos.y === 'number' ) {
			this._node.style.top = pos.y + 'px';
			this._lastPos.y = pos.y;
		}
	}


	/**
	 *
	 * @private
	 * @param {string} dir
	 */
	_handleResize( dir ) {
		const handle = this._node.querySelector( `.resize-handles .handle-${dir}` );

		let isResizing = false;
		const key = ( dir === 'top' || dir === 'bottom' ) ? 'clientY' : 'clientX';
		const start = {
			clientX: null,
			clientY: null,
			left: 0,
			top: 0,
			height: 0,
			width: 0,
		};

		const doResize = ev => {
			if( !isResizing ) {
				return;
			}

			let diff = ev[key] - start[key];

			if( dir === 'right' ) {
				this._node.style.width = ( start.width + diff ) + 'px';
			}
			else if( dir === 'left' ) {
				this._node.style.width = ( start.width - diff ) + 'px';
				this._node.style.left = ( start.left + diff ) + 'px';
			}
			else if( dir === 'top' ) {
				this._node.style.height = ( start.height - diff ) + 'px';
				this._node.style.top = ( start.top + diff ) + 'px';
			}
			else if( dir === 'bottom' ) {
				this._node.style.height = ( start.height + diff ) + 'px';
			}
		};

		const endResize = _ev => {
			document.body.removeEventListener( 'mousemove', doResize );
			document.body.removeEventListener( 'mouseup', endResize );

			isResizing = false;
			start.clientX = null;
			start.clientY = null;

			this.fire( 'resized', { dir: dir } );
		};

		handle.addEventListener( 'mousedown', ev => {
			document.body.addEventListener( 'mousemove', doResize );
			document.body.addEventListener( 'mouseup', endResize );

			const rect = this._node.getBoundingClientRect();

			isResizing = true;
			start.clientX = ev.clientX;
			start.clientY = ev.clientY;
			start.left = parseInt( this._node.style.left, 10 );
			start.top = parseInt( this._node.style.top, 10 );

			if( this._node.style.height ) {
				start.height = parseInt( this._node.style.height, 10 );
			}
			else {
				start.height = rect.height;
			}

			if( this._node.style.width ) {
				start.width = parseInt( this._node.style.width, 10 );
			}
			else {
				start.width = rect.width;
			}
		} );
	}


	/**
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		super.render();

		this._node = UI.build( `
			<aside class="window window-open">
				<div class="resize-handles">
					<div class="handle handle-top"></div>
					<div class="handle handle-right"></div>
					<div class="handle handle-bottom"></div>
					<div class="handle handle-left"></div>
				</div>
				<header>
					<span class="icon toggle"></span>
					<span class="title"></span>
					<div class="actions">
						<span class="icon close"></span>
					</div>
				</header>
				<div class="content"></div>
			</aside>
		` );

		this._applyConfig();

		this._handleResize( 'top' );
		this._handleResize( 'right' );
		this._handleResize( 'bottom' );
		this._handleResize( 'left' );

		const header = this._node.querySelector( ':scope > header' );
		const arrow = header.querySelector( '.toggle' );
		const close = header.querySelector( '.close' );

		arrow.addEventListener( 'click', _ev => this._toggleContent() );
		header.addEventListener( 'mousedown', ev => this._onStart( ev ) );
		close.addEventListener( 'click', _ev => this.close() );

		this._node.style.maxHeight = `${window.innerHeight - 80}px`;
		this._node.style.zIndex = ++Window.topZindex;

		this.state = WindowState.OPEN;

		return this._node;
	}


	/**
	 *
	 * @param {object}  config
	 * @param {Node[]|string[]|Component[]?} config.content
	 * @param {string?} config.title
	 */
	update( config ) {
		const noChange = [];

		for( const key in this._config ) {
			if( typeof config[key] === 'undefined' || this._config[key] === config[key] ) {
				noChange.push( key );
			}
		}

		for( const key in config ) {
			this._config[key] = config[key];
		}

		this._applyConfig( noChange );
	}


};
