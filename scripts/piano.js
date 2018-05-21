//Given starting MIDI note number, range of piano (in semitones), and the HTML dom to attach the piano to,
//this function creates HTML elements for a keyboard
function initializePiano(startingNoteNumber = 48, range = 25, keyboardHTML = document.getElementById("keyboard")){
	var endingNoteNumber = startingNoteNumber + range;
	for(var i = startingNoteNumber; i < endingNoteNumber; i++){
		keyboardHTML.innerHTML += getNoteHTML(i);
	}
}

function getNoteHTML(noteNumber){
	var noteName = MIDINotes.MIDItoNoteName(noteNumber)[2];
	var octave = MIDINotes.MIDItoNoteName(noteNumber)[1];
	if(noteName == "C" ||
		noteName == "D" ||
		noteName == "E" ||
		noteName == "F" ||
		noteName == "G" ||
		noteName == "A" ||
		noteName == "B"){
			return '<div class="key white ' + noteName + '" data-note="' + noteName + octave + '"></div>';
		}
		return '<div class="key black ' + noteName + '" data-note="' + noteName + octave + '"></div>';
}