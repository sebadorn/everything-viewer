import { Icons } from '../Icons';
import { UI } from '../UI';
import { Button } from './Button';
import { Component } from './Component';
import { LinearSlider, LinearSliderOrientation } from './LinearSlider';


export const PlayerState = {
	PLAYING: 'playing',
	PAUSED: 'paused',
};


export class PlayerControls extends Component {


	/**
	 * @type {string}
	 */
	_state = PlayerState.PAUSED;

	/**
	 * @type {number}
	 */
	_volume = 0;


	/**
	 *
	 * @param {object} config
	 * @param {number?} duration - Duration in seconds.
	 * @param {boolean} [hasSeekbar = true]
	 * @param {boolean} [hasVolume = true]
	 * @param {function} onPause
	 * @param {function} onPlay
	 * @param {function?} onSeek
	 * @param {function?} onVolumeChange
	 */
	constructor( config ) {
		super();
		this._config = config;
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
			max: this._config.duration,
			formatValue: value => {
				return UI.formatDuration( value * 1000, { formatWithColon: true } );
			},
			onChange: value => {
				this._config.onChange?.( value );
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
			showValue: false,
			orientation: LinearSliderOrientation.vertical,
			formatValue: value => value + '%',
			onChange: value => {
				this._config.onVolumeChange?.( value );
			},
		} );
	}


	/**
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		super.render();

		this._btnPlayPause = this._buildPlayPauseButton();

		this._node = UI.build( '<div class="player-controls"></div>' );
		this._node.append( this._btnPlayPause.render() );

		if( this._config.hasSeekbar ) {
			this._seekbar = this._buildSeekbar();
			this._node.append( this._seekbar.render() );
		}

		if( this._config.hasVolume ) {
			this._volumeControl = this._buildVolume();
			this._node.append( this._volumeControl.render() );
		}

		return this._node;
	}


	set state( value ) {
		if( this._state === value ) {
			return;
		}

		this._state = value;

		const icon = value === PlayerState.PLAYING ? Icons.pause : Icons.play;
		this._btnPlayPause?.update( { icon: icon } );
	}


	get volume() {
		return this._volume;
	}


	set volume( value ) {
		if( !this._config.hasVolume ) {
			return;
		}

		value = Numer( value );
		this._volume = Math.min( 100, Math.max( 0, value ) );
	}


}