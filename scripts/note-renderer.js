VF = Vex.Flow;
var div = document.getElementById("notes")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
renderer.resize(500, 250);
var ctx = renderer.getContext();

var stave = new VF.Stave(10, 40, 400);
stave.addClef("treble");
stave.addTimeSignature("4/4");
stave.setContext(ctx);
stave.draw();

function changeNotes(){
	var notes = [
		new VF.StaveNote({clef: "treble", keys: ["C/4"], duration: "q"})
	];

	var voice = new VF.Voice({num_beats: 1, beat_value: 4});
	voice.addTickables(notes);
	var formatter = new VF.Formatter();
	formatter.joinVoices([voice]).format([voice], 400);
	voice.draw(ctx, stave);

	ctx.setFont("arial", 25, "bold");
	ctx.fillText("Hello World!", 100, 100);
}

function renderNote(MIDINumber, octave = 4){
	
}

function initializePiano(){
	var piano = new PianoKeyboard();
}