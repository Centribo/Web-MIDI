//Cover all the ways someone could name a note in the chromatic scale
var noteNames =           ["C", "C#/Db", "D", "Eb/D#", "E", "F", "F#/Gb", "G", "Ab/G#", "A", "Bb/A#", "B"];
var flippedNoteNames =    ["C", "Db/C#", "D", "D#/D#", "E", "F", "Gb/F#", "G", "G#/Ab", "A", "A#/Bb", "B"];
var onlyFlatsNoteNames =  ["C", "Db",    "D", "Eb",    "E", "F", "Gb",    "G", "Ab",    "A", "Bb",    "B"];
var onlySharpsNoteNames = ["C", "C#",    "D", "D#",    "E", "F", "F#",    "G", "G#",    "A", "A#",    "B"];

class MIDINotes {
	//Helper functions for MIDI:

	//MIDI note to tuple:
	//[Note number relative to C, Octave, name of note]
	static MIDItoNoteName(MIDINumber){
		var noteNumber = MIDINumber%12; //Note number in semitones/halfsteps relative to C
		var noteName = noteNames[noteNumber]; //Mapped note name
		var octave = Math.floor(MIDINumber/12)-1;
		return [noteNumber, octave, noteName];
	}

	//Return frequency of note as defined by MIDI standard
	static MIDItoNoteFrequency(MIDINumber){
		return Math.pow(2, ((MIDINumber - 69) / 12)) * 440;
	}

	//Lookup name to note number
	//Return 0, 1, ..., 11 depending on what note name given
	//Return -1 if note does not exist
	static noteNameToNoteNumber(noteName){
		var lookupResults = [
			noteNames.indexOf(noteName),
			flippedNoteNames.indexOf(noteName),
			onlyFlatsNoteNames.indexOf(noteName),
			onlySharpsNoteNames.indexOf(noteName)
		];

		for(var i = 0; i < lookupResults.length; i++){
			if(lookupResults[i] != -1){
				return lookupResults[i];
			}
		}

		return -1;
	}

	//Convert given note number and octave to MIDI note number
	static noteNumberToMIDI(noteNumber, octave = 4){
		if(noteNumber < 0 || octave < 0){
			return -1;
		}

		return (60 + noteNumber) + ((octave - 4)*12);
	}

	//Convert given note name and octave to MIDI note number
	static noteNameToMIDI(noteName, octave = 4){
		var noteNumber = this.noteNameToNoteNumber(noteName);
		return this.noteNumberToMIDI(noteNumber, octave);
	}
}
