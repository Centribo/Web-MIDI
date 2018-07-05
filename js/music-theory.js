// Class for help with music theory
// All data uses MIDI note standard
class MusicTheory {
	static getInterval(intervalName){
		var semitones = this.intervals[intervalName];
		if(semitones == null) {
			return 0;
		}
		return semitones;
	}

	static getChord(root, chordName){
		var notes = [].concat(this.chords[chordName].values); //Make sure to copy the array (or else we're getting a reference)
		if(notes == null) {
			return null;
		}

		for(var i = 0; i < notes.length; i++){
			notes[i] = root + this.getInterval(notes[i]);
		}

		return notes;
	}
}

// Dictionary to look up intervals by name
// Adapted from https://en.wikipedia.org/wiki/Interval_(music)
MusicTheory.intervals = {
	"S" : 1, // Semitone
	"T" : 2, // Tone
	"TT" : 6, // Tritone

	"P1" : 0, // Perfect unison
	"m2" : 1, // Minor second
	"M2" : 2, // Major second
	"m3" : 3, // Minor third
	"M3" : 4, // Major third
	"P4" : 5, // Perfect fourth
	"P5" : 7, // Perfect fifth
	"m6" : 8, // Minor sixth
	"M6" : 9, // Major sixth
	"m7" : 10, // Minor seventh
	"M7" : 11, // Major seventh
	"P8" : 12, // Perfect octave

	"d2" : 0, // Diminished second
	"A1" : 1, // Augmented unison
	"d3" : 2, // Diminished third
	"A2" : 3, // Augmented second
	"d4" : 4, // Diminished fourth
	"A3" : 5, // Augmented third
	"d5" : 6, // Diminished fifth
	"A4" : 6, // Augmented fourth
	"d6" : 7, // Diminished sixth
	"A5" : 8, // Augmented fifth
	"d7" : 9, // Diminished seventh
	"A6" : 10, // Augmented sixth
	"d8" : 11, // Diminished octave
	"A7" : 12 // Augmented seventh
};

//Dictionary to look up chords by name
MusicTheory.chords = {
	//Triads:
	"Major"      : { values: ["P1", "M3", "P5"] },
	"Minor"      : { values: ["P1", "m3", "P5"] },
	"Diminished" : { values: ["P1", "m3", "d5"] },
	"Augmented"  : { values: ["P1", "M3", "A5"] },

	//7ths:
	"Major seventh" : { values: ["P1", "M3", "P5", "M7"] },
}
//Setup aliases:
MusicTheory.chords["maj"] = MusicTheory.chords["Major"];