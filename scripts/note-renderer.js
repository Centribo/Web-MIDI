function changeNotes(){
	// var notes = "";
	// for(var i = 60; i < 84; i++){
	// 	notes += MIDINotes.MIDINoteToABCNote(i) + " ";
	// }

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

function clearNotes(){
	ABCJS.renderAbc("notation", "");
}

function renderNote(MIDINumber, octave = 4){
	
}

function initializePiano(){
	var piano = new PianoKeyboard();
	piano.onKeyPress = keyPressed;
	piano.onKeyRelease = keyReleased;
}

//Returns random int in the given range (inclusive)
function getRandomInt(min = 0, max = 1){
	return Math.floor(Math.random() * (max-min+1)) + min;
}

function keyPressed(note){
	console.log("Note pressed", note);
}

function keyReleased(note){
	console.log("Note released", note);
}