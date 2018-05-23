var isMouseDown = false;
var whiteKeyColor = "#cbcbcb";
var blackKeyColor = "#222222";

//Given starting MIDI note number, range of piano (in semitones), and the HTML dom to attach the piano to,
//this function creates HTML elements for a keyboard
function initializePiano(startingNoteNumber = 48, range = 25, keyboardHTML = document.getElementById("keyboard")){
	var endingNoteNumber = startingNoteNumber + range;
	for(var i = startingNoteNumber; i < endingNoteNumber; i++){
		keyboardHTML.innerHTML += getNoteHTML(i);
	}

	var whiteKeys = document.getElementsByClassName("white");
	var blackKeys = document.getElementsByClassName("black");
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
			return '<div class="key white ' + noteName + '" data-note="' + noteNumber + '" onmousedown="notePressed(this)" onmouseup="noteReleased(this)" onmouseenter="noteEnter(this)" onmouseleave="noteExit(this)"></div>';
		}
		return '<div class="key black ' + noteName + '" data-note="' + noteNumber + '" onmousedown="notePressed(this)" onmouseup="noteReleased(this)" onmouseenter="noteEnter(this)" onmouseleave="noteExit(this)"></div>';
}

function notePressed(element){
	element.style.backgroundColor = "yellow";
	isMouseDown = true;
}

function noteReleased(element){
	if(element.classList.contains("white")){
		element.style.backgroundColor = whiteKeyColor;
	} else {
		element.style.backgroundColor = blackKeyColor;
	}
	
	isMouseDown = false;
}

function noteEnter(element){
	if(isMouseDown){
		element.style.backgroundColor = "yellow";
	}
}

function noteExit(element){
	if(element.classList.contains("white")){
		element.style.backgroundColor = whiteKeyColor;
	} else {
		element.style.backgroundColor = blackKeyColor;
	}
}