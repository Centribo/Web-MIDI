var piano;
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

function renderRandomNote(){
	var i = getRandomInt(60, 84);
	immediateRenderNote(i);
}

function pianoKeyPressed(note){
	if(isMIDIJsLoaded){
		MIDI.noteOn(0, note, 127, 0);
	}

	immediateRenderNote(note);
}

function pianoKeyReleased(note){
	if(isMIDIJsLoaded){
		MIDI.noteOff(0, note, 127, 0);
	}

	immediateRenderNote(note);
}

function MIDIKeyPressed(device, note, velocity){
	piano.changeKeyColor(note, "pressed");
	if(isMIDIJsLoaded){
		MIDI.noteOn(0, note, velocity, 0);
	}

	immediateRenderChord(device.currentlyOnNotes);
}

function MIDIKeyReleased(device, note, velocity){
	piano.changeKeyColor(note, "released");
	if(isMIDIJsLoaded){
		MIDI.noteOff(0, note, velocity, 0);
	}

	immediateRenderChord(device.currentlyOnNotes);
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