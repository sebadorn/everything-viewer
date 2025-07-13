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
		transport.loop = false;

		const destination = this.Tone.getDestination();
		destination.volume.value = this.Tone.gainToDb( 0.3 );

		this._player = new PlayerControls( {
			duration: midiData.duration,
			volume: this.Tone.dbToGain( destination.volume.value ),
			onPause: () => this.pause(),
			onPlay: () => this.play(),
			onSeek: ( _percent, seconds ) => transport.seconds = seconds,
			onVolume: value => destination.volume.value = this.Tone.gainToDb( value ),
		} );

		transport.on( 'start', () => this._player.state = PlayerState.PLAYING );
		transport.on( 'pause', () => this._player.state = PlayerState.PAUSED );
		transport.on( 'stop', () => this._player.state = PlayerState.PAUSED );

		transport.scheduleRepeat( _time => {
			this._player.progressInSeconds = Math.min( midiData.duration, transport.seconds );

			if( transport.seconds > midiData.duration ) {
				this.stop();
			}
		}, 0.5, 0, midiData.duration + 1 );

		const container = UI.build( '<div class="midi-player"></div>' );
		container.append( this._player.render() );

		this.nodeView.append( container );
	}


	/**
	 *
	 */
	destroy() {
		const transport = this.Tone.getTransport();
		transport.stop();

		// Dispose the synths
		while( this.synths.length > 0 ) {
			const synth = this.synths.shift();
			synth.releaseAll();
			synth.dispose();
		}

		transport.off( 'start' );
		transport.off( 'pause' );
		transport.off( 'stop' );
		transport.position = 0;
		transport.cancel();

		// Dispose of the old AudioContext and use a new one.
		// Necessary to fix an issue of the next played audio not starting properly.
		// Depending on how long it previously played, there would be
		// silence at the start despite the played seconds counter going up.
		this.Tone.setContext( new this.Tone.Context(), true );

		this._player?.destroy();

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
		if( this.synths.length === 0 ) {
			return;
		}

		this.Tone.getTransport().start();
	}


	/**
	 *
	 */
	stop() {
		this.Tone.getTransport().stop();
	}


};
