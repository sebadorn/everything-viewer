import { Button } from '../../ui/components/Button.js';
import { PlayerControls, PlayerState } from '../../ui/components/PlayerControls.js';
import { Icons } from '../../ui/Icons.js';
import { UI } from '../../ui/UI.js';
import { BaseView } from '../BaseView.js';


export class MidiView extends BaseView {


	/** @type {import('tone')} */
	Tone = null;

	/** @type {import('tone').PolySynth[]} */
	synths = [];


	/**
	 *
	 * @param {BaseParser} parser
	 */
	constructor( parser ) {
		super( parser, 'midi' );
	}


	/**
	 *
	 * @private
	 * @param {import('@tonejs/midi').Midi} midiData
	 */
	_addMetaData( midiData ) {
		if( midiData.name ) {
			this.mdAdd( 'Name', midiData.name );
		}

		this.mdAdd( 'Tracks', midiData.tracks.length );
		this.mdAdd( 'Duration', UI.formatDuration( midiData.duration * 1000 ) );
	}


	/**
	 *
	 * @private
	 * @param {import('@tonejs/midi').Midi} midiData
	 */
	_buildPlayer( midiData ) {
		const transport = this.Tone.getTransport();

		const destination = this.Tone.getDestination();
		destination.volume.value = this.Tone.gainToDb( 0.5 );

		this._player = new PlayerControls( {
			duration: midiData.duration,
			volume: this.Tone.dbToGain( destination.volume.value ),
			onPause: () => this.pause(),
			onPlay: () => this.play(),
			onSeek: value => transport.seconds = value * midiData.duration,
			onVolumeChange: value => destination.volume = value,
		} );

		transport.on( 'start', () => this._player.state = PlayerState.PLAYING );
		transport.on( 'pause', () => this._player.state = PlayerState.PAUSED );
		transport.on( 'stop', () => this._player.state = PlayerState.PAUSED );

		transport.scheduleRepeat( _time => {
			this._player.progressInSeconds = transport.seconds;
		}, 0.5 );

		const container = UI.build( '<div class="midi-player"></div>' );
		container.append( this._player.render() );

		this.nodeView.append( container );
	}


	/**
	 *
	 */
	destroy() {
		this.pause();

		// Dispose the synth and make a new one
		while( this.synths.length ) {
			const synth = synths.shift();
			synth.dispose();
		}

		this.Tone.getTransport().dispose();

		super.destroy();
	}


	/**
	 *
	 * @param {function?} cb
	 */
	load( cb ) {
		this.parser.parse(
			/**
			 * @param {Error?} _err
			 * @param {import('tone')} Tone
			 * @param {import('@tonejs/midi').Midi} midiData 
			 * @param {import('tone').PolySynth[]} synths 
			 */
			( _err, Tone, midiData, synths ) => {
				this.Tone = Tone;
				this.synths = synths;

				this._addMetaData( midiData );
				this.buildMetaNode();
				this._buildPlayer( midiData );

				this._openWindow();
				cb?.();
			}
		);
	}


	/**
	 *
	 */
	pause() {
		this.Tone.getTransport().pause();
	}


	/**
	 *
	 */
	play() {
		if( this.synths.length > 0 ) {
			this.Tone.getTransport().start();
		}
	}


};
