function displayRandomNote(){
	var i = getRandomInt(60, 84);
	renderNote(i);
}

function displayChromaticScale(){
	var notes = "";
	for(var i = 60; i < 84; i++){
		notes += MIDINotes.MIDINoteToABCNote(i) + " ";
	}
	
	
	var sample = 
	"X:1 \n" + //Reference number 
	"T:Notes \n" + //Title
	"M:4/4 \n" + //Meter
	"L:1/4 \n" + //Note length
	"K:C \n" + //Key
	notes + "|]";
	
	ABCJS.renderAbc("notation", sample);
}

function clearNotes(){
	ABCJS.renderAbc("notation", "");
}

function renderNote(MIDINumber){
	var notes = MIDINotes.MIDINoteToABCNote(MIDINumber) + " ";
	
	var sample = 
	"X:1 \n" + //Reference number 
	"T:Notes \n" + //Title
	"M:4/4 \n" + //Meter
	"L:1/4 \n" + //Note length
	"K:C \n" + //Key
	notes + "|]";
	
	ABCJS.renderAbc("notation", sample);
}

var piano;
load();

function load(){
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

function initializePiano(){
	
}

//Returns random int in the given range (inclusive)
function getRandomInt(min = 0, max = 1){
	return Math.floor(Math.random() * (max-min+1)) + min;
}

function pianoKeyPressed(note){
	MIDI.noteOn(0, note, 127, 0);
}

function pianoKeyReleased(note){
	MIDI.noteOff(0, note, 127, 0);
}

function MIDIKeyPressed(note){
	piano.changeKeyColor(note, "pressed");
	MIDI.noteOn(0, note, 127, 0);
}

function MIDIKeyReleased(note){
	piano.changeKeyColor(note, "released");
	MIDI.noteOff(0, note, 127, 0);
}

function isEmpty(obj) {
	for(var prop in obj) {
		if(obj.hasOwnProperty(prop))
		return false;
	}
	
	return JSON.stringify(obj) === JSON.stringify({});
}

window.onload = function () {
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			var delay = 0; // play one note every quarter second
			var note = 50; // the MIDI note
			var velocity = 127; // how hard the note hits
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, delay + 0.75);
		}
	});
};