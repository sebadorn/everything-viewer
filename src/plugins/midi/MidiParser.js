import { BaseParser } from '../BaseParser.js';


export class MidiParser extends BaseParser {


	/**
	 *
	 * @param {import('../Registry.js').ImportData} data
	 */
	constructor( data ) {
		super( data );
	}


	/**
	 *
	 * @param   {function} cb
	 * @returns {Promise<void>}
	 */
	async parse( cb ) {
		const { Midi } = await import(
			/* webpackChunkName: "tonejs_midi" */
			'@tonejs/midi'
		);
		const Tone = await import(
			/* webpackChunkName: "tonejs" */
			'tone'
		);

		this.getArrayBuffer( ( _err, arrayBuffer ) => {
			this.midiData = new Midi( arrayBuffer );

			const synths = [];
			const now = Tone.now() + 0.5;

			this.midiData.tracks.forEach( track => {
				// Create a synth for each track
				const synth = new Tone.PolySynth( Tone.Synth, {
					envelope: {
						attack: 0.02,
						decay: 0.1,
						sustain: 0.3,
						release: 1,
					},
				} ).toDestination();

				// `sync()` is important, otherwise `Tone.getTransport().start()/.pause()/.stop()`
				// would not work and the synth would just autoplay.
				synth.sync();

				synths.push( synth );

				// Schedule all of the events
				track.notes.forEach( note => {
					synth.triggerAttackRelease(
						note.name,
						note.duration,
						note.time + now,
						note.velocity
					);
				});

				cb( null, this.midiData, synths );
			});
		} );
	}


};
