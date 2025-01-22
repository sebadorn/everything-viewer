import { UI } from '../UI.js';
import { Component } from './Component.js';


export class Window extends Component {


	/**
	 *
	 * @param {object}   config
	 * @param {object[]} config.content
	 * @param {string?}  config.id
	 * @param {string?}  config.title
	 * @param {number?}  config.x
	 * @param {number?}  config.y
	 */
	constructor( config ) {
		super();

		this._config = config;

		this._isDragging = false;
		this._lastPos = {
			x: null,
			y: null
		};

		this._cbMouseUp = this._onEnd.bind( this );
		this._cbMouseMove = this._onMove.bind( this );
	}


	/**
	 *
	 */
	_applyConfig() {
		if( !this._config ) {
			return;
		}

		if( this._config.id ) {
			this._node.setAttribute( 'id', this._config.id );
		}

		if( Array.isArray( this._config.content ) ) {
			const node = this._node.querySelector( '.content' );

			for( let content of this._config.content ) {
				if( content instanceof Component ) {
					node.append( content.render() );
				}
				else {
					node.append( content );
				}
			}
		}

		if( this._config.x ) {
			this._node.style.left = this._config.x + 'px';
		}

		if( this._config.y ) {
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

		this._node.style.zIndex = 1;
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

		this._node.style.zIndex = 100;
	}


	/**
	 *
	 * @private
	 */
	_toggleContent() {
		let clsName = this._node.className;

		if( clsName.includes( 'window-closed' ) ) {
			clsName = clsName.replace( 'window-closed', 'window-open' );
		}
		else {
			clsName = clsName.replace( 'window-open', 'window-closed' );
		}

		this._node.className = clsName;
	}


	/**
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		super.render();

		this._node = UI.build( `
			<aside class="window window-open">
				<header>
					<span class="toggle"></span>
					${ this._config.title || '' }
				</header>
				<div class="content"></div>
			</aside>
		` );

		this._applyConfig();
		delete this._config;

		const header = this._node.querySelector( ':scope > header' );
		const arrow = header.querySelector( '.toggle' );

		arrow.addEventListener( 'click', _ev => this._toggleContent() );
		header.addEventListener( 'mousedown', ev => this._onStart( ev ) );

		return this._node;
	}


};
