import { Icons } from '../Icons';
import { UI } from '../UI';
import { Button } from './Button';
import { Component } from './Component';
import { LinearSlider } from './LinearSlider';


export const PlayerState = {
	PLAYING: 'playing',
	PAUSED: 'paused',
};


export class PlayerControls extends Component {


	/** @type {LinearSlider?} */
	_seekbar = null;

	/** @type {string} */
	_state = PlayerState.PAUSED;

	/** @type {number} */
	_volume = 0;

	/** @type {LinearSlider?} */
	_volumeControl = null;


	/**
	 *
	 * @param {object} config
	 * @param {number?} config.duration - Duration in seconds.
	 * @param {number?} config.volume - Initial volume in [0, 100] percent.
	 * @param {boolean} [config.hasSeekbar = true]
	 * @param {boolean} [config.hasVolume = true]
	 * @param {function} config.onPause
	 * @param {function} config.onPlay
	 * @param {function?} config.onSeek
	 * @param {function?} config.onVolume
	 */
	constructor( config ) {
		super();

		this._config = config || {};

		if( typeof this._config.hasSeekbar === 'undefined' ) {
			this._config.hasSeekbar = true;
		}

		if( typeof this._config.hasVolume === 'undefined' ) {
			this._config.hasVolume = true;
		}
	}


	/**
	 *
	 * @private
	 * @returns {Button}
	 */
	_buildPlayPauseButton() {
		return new Button( {
			classes: 'play-pause',
			icon: Icons.play,
			onClick: () => {
				if( this._state === PlayerState.PLAYING ) {
					this._config.onPause();
				}
				else {
					this._config.onPlay();
				}
			},
		} );
	}


	/**
	 *
	 * @private
	 * @returns {Component}
	 */
	_buildSeekbar() {
		return new LinearSlider( {
			classes: 'seekbar',
			max: this._config.duration,
			showValue: false,
			formatValue: value => {
				return UI.formatDuration( value * 1000, { formatWithColon: true } );
			},
			onChange: ( percent, value ) => {
				this._seekbar.value = value;
				this._config.onSeek?.( percent, value );
			},
		} );
	}


	/**
	 *
	 * @private
	 * @returns {Component}
	 */
	_buildVolume() {
		return new LinearSlider( {
			classes: 'volume',
			showValue: false,
			formatValue: value => Math.round( value ) + '%',
			onChange: ( percent, value ) => {
				this._volumeControl.value = value;
				this._config.onVolume?.( percent );
			},
		} );
	}


	/**
	 *
	 */
	destroy() {
		this._seekbar?.destroy();
		this._seekbar = null;

		this._volumeControl?.destroy();
		this._volumeControl = null;

		this._node?.remove();
	}


	/**
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		super.render();

		this._btnPlayPause = this._buildPlayPauseButton();
		this._time = UI.build( '<span class="time">00:00</span>' );

		const bottom = UI.build( '<div class="bottom-row"></div>' );
		bottom.append(
			this._btnPlayPause.render(),
			this._time
		);

		this._node = UI.build( '<div class="player-controls"></div>' );

		if( this._config.hasSeekbar ) {
			this._seekbar = this._buildSeekbar();
			this._node.append( this._seekbar.render() );
		}

		if( this._config.hasVolume ) {
			this._volumeControl = this._buildVolume();

			bottom.append(
				UI.build( `<span class="icon volume">${Icons.volume}</span>` ),
				this._volumeControl.render()
			);

			if( typeof this._config.volume === 'number' ) {
				this.volume = this._config.volume;
			}
		}

		this._node.append( bottom );

		return this._node;
	}


	/**
	 *
	 * @returns {number}
	 */
	get progress() {
		return this._seekbar?.valueProgress ?? 0;
	}


	/**
	 *
	 * @param {number} value - [0.0, 1.0]
	 */
	set progress( value ) {
		if( this._seekbar ) {
			this._seekbar.valueProgress = value;
		}

		this.time = value * this._config.duration;
	}


	/**
	 *
	 * @returns {number}
	 */
	get progressInSeconds() {
		return this._seekbar?.value ?? 0;
	}


	/**
	 *
	 * @param {number} seconds
	 */
	set progressInSeconds( seconds ) {
		if( this._seekbar ) {
			this._seekbar.value = seconds;
		}

		this.time = seconds;
	}


	/**
	 *
	 * @returns {string}
	 */
	get state() {
		return this._state;
	}


	/**
	 *
	 * @param {string} value
	 */
	set state( value ) {
		if( this._state === value ) {
			return;
		}

		this._state = value;

		const icon = value === PlayerState.PLAYING ? Icons.pause : Icons.play;
		this._btnPlayPause?.update( { icon: icon } );
	}


	/**
	 *
	 * @param {number} seconds
	 */
	set time( seconds ) {
		this._time.textContent = UI.formatDuration( seconds * 1000, { formatWithColon: true } );
	}


	/**
	 *
	 * @returns {number}
	 */
	get volume() {
		return this._volume;
	}


	/**
	 *
	 * @param {number} value - Volume as value [0.0, 1.0].
	 */
	set volume( value ) {
		if( !this._config.hasVolume ) {
			return;
		}

		value = Number( value );

		if( !isNaN( value ) ) {
			this._volume = Math.min( 1, Math.max( 0, value ) );

			if( this._volumeControl ) {
				this._volumeControl.value = this._volume * 100;
			}
		}
	}


}