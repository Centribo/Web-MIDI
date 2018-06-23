var notes = ["A", "B", "C", "D", "E", "F", "G"];

class NoteInputter {
	constructor(inputterHTML = document.getElementById("note-inputter"), octave = 4){
		
		//Tracking variables
		this.octave = octave;
		this.keys = new Array(3);

		for(var j = 1; j >= -1; j--){
			this.keys[j+1] = new Array(notes.length);
			for(var i = 0; i < notes.length; i++){
				this.keys[j+1][i] = NoteInputter.getNoteHTML(notes[i], j);
				// inputterHTML.innerHTML += NoteInputter.getNoteHTML(notes[i], j);
				inputterHTML.appendChild(this.keys[j+1][i]);
			}
		}
	}

	pressKey(){
		
	}
	
	static getNoteHTML(note, accidental = 0){
		note = note.toUpperCase();
		var accidentalSymbol = "";
		var accidentalClass = "natural";
		if(accidental < 0){
			accidentalSymbol = "b";
			accidentalClass = "flat";
		} else if(accidental > 0){
			accidentalSymbol = "#";
			accidentalClass = "sharp";	
		}
		var button = document.createElement("button");
		var text = document.createTextNode(note + accidentalSymbol);
		button.appendChild(text);
		button.classList.add("note-inputter-button");
		button.classList.add("note-inputter-" + accidentalClass);
		button.dataset.note = note;
		button.dataset.accidental = accidentalClass;
		return button;
	}
}