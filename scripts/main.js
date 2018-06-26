var piano;
var noteInputter;
var isMIDIJsLoaded = false;

window.onload = function () {
	load();
	clearNotes();
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			// console.log(state, progress);
		},
		onsuccess: function() {
			isMIDIJsLoaded = true;
		}
	});
};

function load(){
	noteInputter = new NoteInputter();
	noteInputter.onNoteClick = noteClicked;
	piano = new PianoKeyboard();
	piano.onKeyPress = pianoKeyPressed;
	piano.onKeyRelease = pianoKeyReleased;
	var controllers;
	MIDIControllers.loadMIDIDevices().then(function(){
		controllers = MIDIControllers.getMIDIControllers();
		if(!isEmpty(controllers)){
			controllers["input-0"].onKeyPress = MIDIKeyPressed;
			controllers["input-0"].onKeyRelease = MIDIKeyReleased;
		}
	});
}

function noteClicked(data){
	note = data.noteNumber;
	if(isMIDIJsLoaded){
		MIDI.noteOn(0, note, 127, 0);
	}
	immediateRenderNote(note);
}

//Returns random int in the given range (inclusive)
function getRandomInt(min = 0, max = 1){
	return Math.floor(Math.random() * (max-min+1)) + min;
}

function randomNote(){
	var i = getRandomInt(60, 84);
	immediateRenderNote(i);
	MIDI.noteOn(0, i, 127, 0);
	MIDI.noteOff(0, i, 127, 1);
}

function pianoKeyPressed(note){
	playMIDINote(note, 127);
	immediateRenderChord([note]);
	highlightNoteOnNoteInputter(note);
}

function pianoKeyReleased(note){
	stopMIDINote(note, 127);
	clearNotes();
	unhighlightNoteOnNoteInputter(note);
}

function MIDIKeyPressed(device, note, velocity){
	piano.changeKeyColor(note, "pressed");
	playMIDINote(note, velocity);
	immediateRenderChord(device.currentlyOnNotes);
	highlightNoteOnNoteInputter(note);
}

function MIDIKeyReleased(device, note, velocity){
	piano.changeKeyColor(note, "released");
	stopMIDINote(note, velocity);
	immediateRenderChord(device.currentlyOnNotes);
	unhighlightNoteOnNoteInputter(note);
}

//Renders a two-octave chromatic scale
function renderChromaticScale(){
	musicalElements = "";
	for(var i = 60; i < 84; i++){
		musicalElements += MIDINotes.MIDINoteToABCNote(i) + " ";
	}
	
	renderNotation();
}

function isEmpty(obj) {
	for(var prop in obj) {
		if(obj.hasOwnProperty(prop))
		return false;
	}
	
	return JSON.stringify(obj) === JSON.stringify({});
}

function changeVolume(element){
	console.log(element);
}

function playMIDINote(note, velocity){
	if(isMIDIJsLoaded){
		MIDI.noteOn(0, note, velocity, 0);
	}
}

function stopMIDINote(note, velocity){
	if(isMIDIJsLoaded){
		MIDI.noteOff(0, note, velocity, 0);
	}
}

function highlightNoteOnNoteInputter(note, className = "note-inputter-highlighted"){
	var noteNames = [MIDINotes.MIDIToNoteName(note, 2).noteName, MIDINotes.MIDIToNoteName(note, 3).noteName];
	noteInputter.addClassToNote(noteNames[0], className);
	noteInputter.addClassToNote(noteNames[1], className);
}

function unhighlightNoteOnNoteInputter(note, className = "note-inputter-highlighted"){
	var noteNames = [MIDINotes.MIDIToNoteName(note, 2).noteName, MIDINotes.MIDIToNoteName(note, 3).noteName];
	noteInputter.removeClassFromNote(noteNames[0], className);
	noteInputter.removeClassFromNote(noteNames[1], className);
}