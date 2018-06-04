function changeNotes(){
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

function initializePiano(){
	var piano = new PianoKeyboard();
}

console.log(MIDINotes.MIDINoteToABCNote(60));