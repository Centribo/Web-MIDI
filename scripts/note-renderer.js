var piano;
load();

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

function renderChord(MIDINumbers){
	var notes = "[";
	for(var i = 0; i < MIDINumbers.length; i++){
		notes += MIDINotes.MIDINoteToABCNote(MIDINumbers[i]) + " ";
	}
	notes += "]";

	var sample = 
	"X:1 \n" + //Reference number 
	"T:Notes \n" + //Title
	"M:4/4 \n" + //Meter
	"L:1/4 \n" + //Note length
	"K:C \n" + //Key
	notes + "|]";

	ABCJS.renderAbc("notation", sample);
}

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

//Returns random int in the given range (inclusive)
function getRandomInt(min = 0, max = 1){
	return Math.floor(Math.random() * (max-min+1)) + min;
}

function pianoKeyPressed(note){
	if(isMIDIJsLoaded){
		MIDI.noteOn(0, note, 127, 0);
	}

	renderNote(note);
}

function pianoKeyReleased(note){
	if(isMIDIJsLoaded){
		MIDI.noteOff(0, note, 127, 0);
	}

	renderNote(note);
}

function MIDIKeyPressed(device, note, velocity){
	piano.changeKeyColor(note, "pressed");
	if(isMIDIJsLoaded){
		MIDI.noteOn(0, note, velocity, 0);
	}

	renderChord(device.currentlyOnNotes);
}

function MIDIKeyReleased(device, note, velocity){
	
	piano.changeKeyColor(note, "released");
	if(isMIDIJsLoaded){
		MIDI.noteOff(0, note, velocity, 0);
	}

	renderChord(device.currentlyOnNotes);
}

function isEmpty(obj) {
	for(var prop in obj) {
		if(obj.hasOwnProperty(prop))
		return false;
	}
	
	return JSON.stringify(obj) === JSON.stringify({});
}

var isMIDIJsLoaded = false;

window.onload = function () {
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