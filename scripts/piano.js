var highlightedKeyColor = "#ffaa00";
var pressedKeyColor = "#ff0000";
var whiteKeyColor = "#cbcbcb";
var whiteKeyBorderColor = "#aaaaaa";
var blackKeyColor = "#222222";
var blackKeyBorderColor = "#000000";

var firstMIDINote;
var lastMIDINote;
var keys;
var onKeyPress;
var onKeyRelease;
var isMouseDown = false;


//Given starting MIDI note number, range of piano (in semitones), and the HTML dom to attach the piano to,
//this function creates HTML elements for a piano
function initializePiano(startingNoteNumber = 48, range = 25, pianoHTML = document.getElementById("piano")){
	var endingNoteNumber = startingNoteNumber + range - 1;
	firstMIDINote = startingNoteNumber;
	lastMIDINote = endingNoteNumber;
	var whiteKeyCount = 0;
	for(var i = startingNoteNumber; i <= endingNoteNumber; i++){
		pianoHTML.innerHTML += getNoteHTML(i);
		var noteName = MIDINotes.MIDItoNoteName(i)[2];
	}

	//Keep reference to HTML elements
	keys = pianoHTML.querySelectorAll(".key");

	//Determine if right-most note is a white key
	var lastNote = MIDINotes.MIDItoNoteName(endingNoteNumber)[2];
	var lastNoteIsWhite = false;
	if(lastNote == "A" ||
		lastNote == "B" ||
		lastNote == "C" ||
		lastNote == "D" ||
		lastNote == "E" ||
		lastNote == "F" ||
		lastNote == "G"){
		
		lastNoteIsWhite = true;
	}

	//Get HTML DOM elements for white and black keys
	var whiteKeys = document.getElementsByClassName("white");
	var blackKeys = document.getElementsByClassName("black");

	//Calculate sizes and offets
	var units = "vw";
	var pianoWidth = 80;
	var pianoHeight = pianoWidth * 0.18;
	var borderWidth = pianoWidth * 0.0015;
	var whiteKeyWidth = pianoWidth/whiteKeys.length;
	var whiteKeyHeight = pianoHeight;
	var blackKeyWidth = whiteKeyWidth * 0.55;
	var blackKeyHeight = whiteKeyHeight * 0.55;
	var blackKeyOffset = (-(blackKeyWidth/2) - borderWidth);

	//Assign CSS to each key
	for(var i = 0; i < whiteKeys.length; i++){
		whiteKeys[i].style.cssText =
		"float: left;" +
		"position: relative;" +
		"z-index: 1;" +
		"height: " + whiteKeyHeight + units + ";" +
		"width: " + whiteKeyWidth + units + ";" +
		"border-top: " + borderWidth +units + " solid " + whiteKeyBorderColor + ";" +
		"border-bottom: " + borderWidth +units + " solid " + whiteKeyBorderColor + ";" +
		"border-left: " + borderWidth +units + " solid " + whiteKeyBorderColor + ";" +
		"background-color: " + whiteKeyColor + ";";
		if(whiteKeys[i].classList.contains("A") ||
			whiteKeys[i].classList.contains("B") ||
			whiteKeys[i].classList.contains("D") ||
			whiteKeys[i].classList.contains("E") ||
			whiteKeys[i].classList.contains("G")){

			whiteKeys[i].style.cssText += "margin: 0 0 0 " + blackKeyOffset + units + ";";
		}

		//Special case for right border of last key (if it's a white key only)
		if(lastNoteIsWhite && i == whiteKeys.length-1){
			whiteKeys[i].style.cssText += "border-right: " + borderWidth + units + " solid " + whiteKeyBorderColor + ";"; 
		}
	}
	for(var i = 0; i < blackKeys.length; i++){
		blackKeys[i].style.cssText =
		"float: left;" +
		"position: relative;" +
		"z-index: 2;" +
		"margin: 0 0 0 " + blackKeyOffset + units + ";" +
		"height: " + blackKeyHeight + units + ";" +
		"width: " + blackKeyWidth + units + ";" +
		"border: " + borderWidth +units + " solid " + blackKeyBorderColor + ";" +
		"background-color: " + blackKeyColor + ";";
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
			return '<div class="key white ' + noteName + '" data-note="' + noteNumber + '" onmousedown="notePressed(this)" onmouseup="noteReleased(this)" onmouseenter="noteEnter(this)" onmouseleave="noteExit(this)"></div>';
		}
		return '<div class="key black ' + noteName + '" data-note="' + noteNumber + '" onmousedown="notePressed(this)" onmouseup="noteReleased(this)" onmouseenter="noteEnter(this)" onmouseleave="noteExit(this)"></div>';
}

//"pressed", "released", "highlighted", "custom"
function changeKeyColor(noteNumber, state = "pressed", color = "#000000"){
	var key = findKey(noteNumber);
	if(key != null){
		if(state == "pressed"){
			key.style.backgroundColor = pressedKeyColor;
		} else if(state == "released"){
			if(key.classList.contains("white")){
				key.style.backgroundColor = whiteKeyColor;
			} else {
				key.style.backgroundColor = blackKeyColor;
			}
		} else if(state == "highlighted"){
			key.style.backgroundColor = highlightedKeyColor;
		} else if(state == "custom"){
			key.style.backgroundColor = color;
		} else {
			console.error("changeKeyColor :: state is invalid");
		}
	}
	console.error("changeKeyColor :: key not found");
}

function notePressed(element){
	element.style.backgroundColor = pressedKeyColor;
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
		element.style.backgroundColor = pressedKeyColor;
	}
}

function noteExit(element){
	if(element.classList.contains("white")){
		element.style.backgroundColor = whiteKeyColor;
	} else {
		element.style.backgroundColor = blackKeyColor;
	}
}

function findKey(noteNumber){
	if(noteNumber >= firstMIDINote && noteNumber <= lastMIDINote){
		return keys[noteNumber - firstMIDINote];
	}
	return null;
}