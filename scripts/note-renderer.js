function displayRandomNote(){
	var i = getRandomInt(60, 84);
	var notes = MIDINotes.MIDINoteToABCNote(i) + " ";

	var sample = 
	"X:1 \n" + //Reference number 
	"T:Notes \n" + //Title
	"M:4/4 \n" + //Meter
	"L:1/4 \n" + //Note length
	"K:C \n" + //Key
	notes + "|]";

	ABCJS.renderAbc("notation", sample);
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

function renderNote(MIDINumber, octave = 4){
	
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
		controllers["input-0"].onKeyPress = MIDIKeyPressed;
		controllers["input-0"].onKeyRelease = MIDIKeyReleased;
	});
}

function initializePiano(){
	
}

//Returns random int in the given range (inclusive)
function getRandomInt(min = 0, max = 1){
	return Math.floor(Math.random() * (max-min+1)) + min;
}

function pianoKeyPressed(note){
}

function pianoKeyReleased(note){
}

function MIDIKeyPressed(note){
	piano.changeKeyColor(note, "pressed");
}

function MIDIKeyReleased(note){
	piano.changeKeyColor(note, "released");
}

