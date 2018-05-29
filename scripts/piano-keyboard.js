class PianoKeyboard {
	constructor(pianoHTML = document.getElementById("pianoKeyboard"), startingNoteNumber = 48, range = 25){
		//Color/styling
		this.highlightedKeyColor = "#ffaa00";
		this.pressedKeyColor = "#ff0000";
		this.whiteKeyColor = "#cbcbcb";
		this.whiteKeyBorderColor = "#aaaaaa";
		this.blackKeyColor = "#222222";
		this.blackKeyBorderColor = "#000000";

		//Tracking variables
		this.startingNoteNumber = startingNoteNumber;
		this.endingNoteNumber = startingNoteNumber + range - 1;
		this.keys;
		this.isMouseDown = false;

		//Callbacks
		this.onKeyPress;
		this.onKeyRelease;

		//Start construction of HTML keyboard:
		var whiteKeyCount = 0;
		for(var i = startingNoteNumber; i <= this.endingNoteNumber; i++){
			pianoHTML.innerHTML += PianoKeyboard.getNoteHTML(i);
			var noteName = MIDINotes.MIDItoNoteName(i)[2];
		}
		//Keep reference to HTML elements
		this.keys = pianoHTML.querySelectorAll(".key");

		//Add event listeners for mouse input
		for (var i = 0; i < this.keys.length; i++){
			this.keys[i].addEventListener("mousedown", this.notePressed.bind(this));
			this.keys[i].addEventListener("mouseup", this.noteReleased.bind(this));
			this.keys[i].addEventListener("mouseenter", this.noteEnter.bind(this));
			this.keys[i].addEventListener("mouseleave", this.noteExit.bind(this));
		}

		//Determine if right-most note is a white key
		var lastNote = MIDINotes.MIDItoNoteName(this.endingNoteNumber)[2];
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
		var whiteKeys = pianoHTML.getElementsByClassName("white");
		var blackKeys = pianoHTML.getElementsByClassName("black");

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
			"border-top: " + borderWidth + units + " solid " + this.whiteKeyBorderColor + ";" +
			"border-bottom: " + borderWidth + units + " solid " + this.whiteKeyBorderColor + ";" +
			"border-left: " + borderWidth + units + " solid " + this.whiteKeyBorderColor + ";" +
			"background-color: " + this.whiteKeyColor + ";";
			if(whiteKeys[i].classList.contains("A") ||
				whiteKeys[i].classList.contains("B") ||
				whiteKeys[i].classList.contains("D") ||
				whiteKeys[i].classList.contains("E") ||
				whiteKeys[i].classList.contains("G")){

				whiteKeys[i].style.cssText += "margin: 0 0 0 " + blackKeyOffset + units + ";";
			}

			//Special case for right border of last key (if it's a white key only)
			if(lastNoteIsWhite && i == whiteKeys.length-1){
				whiteKeys[i].style.cssText += "border-right: " + borderWidth + units + " solid " + this.whiteKeyBorderColor + ";"; 
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
			"border: " + borderWidth + units + " solid " + this.blackKeyBorderColor + ";" +
			"background-color: " + this.blackKeyColor + ";";
		}
	}

	//"pressed", "released", "highlighted", "custom"
	changeKeyColor(noteNumber, state = "pressed", color = "#000000"){
		var key = this.findKey(noteNumber);
		if(key != null){
			if(state == "pressed"){
				key.style.backgroundColor = this.pressedKeyColor;
			} else if(state == "released"){
				if(key.classList.contains("white")){
					key.style.backgroundColor = this.whiteKeyColor;
				} else {
					key.style.backgroundColor = this.blackKeyColor;
				}
			} else if(state == "highlighted"){
				key.style.backgroundColor = this.highlightedKeyColor;
			} else if(state == "custom"){
				key.style.backgroundColor = color;
			} else {
				console.error("changeKeyColor :: state is invalid");
			}
		}
		console.error("changeKeyColor :: key not found");
	}

	notePressed(event){
		event.target.style.backgroundColor = this.pressedKeyColor;
		this.isMouseDown = true;
	}
	
	noteReleased(event){
		if(event.target.classList.contains("white")){
			event.target.style.backgroundColor = this.whiteKeyColor;
		} else {
			event.target.style.backgroundColor = this.blackKeyColor;
		}
		
		this.isMouseDown = false;
	}
	
	noteEnter(event){
		if(this.isMouseDown){
			event.target.style.backgroundColor = this.pressedKeyColor;
		}
	}
	
	noteExit(event){
		if(event.target.classList.contains("white")){
			event.target.style.backgroundColor = this.whiteKeyColor;
		} else {
			event.target.style.backgroundColor = this.blackKeyColor;
		}
	}
	
	findKey(noteNumber){
		if(noteNumber >= this.startingNoteNumber && noteNumber <= this.endingNoteNumber){
			return this.keys[noteNumber - this.startingNoteNumber];
		}
		return null;
	}

	static getNoteHTML(noteNumber){
		var noteName = MIDINotes.MIDItoNoteName(noteNumber)[2];
		var octave = MIDINotes.MIDItoNoteName(noteNumber)[1];
		if(noteName == "C" ||
			noteName == "D" ||
			noteName == "E" ||
			noteName == "F" ||
			noteName == "G" ||
			noteName == "A" ||
			noteName == "B"){
				return '<div class="key white ' + noteName + '" data-note="' + noteNumber + '"></div>';
			}
			return '<div class="key black ' + noteName + '" data-note="' + noteNumber + '"></div>';
	}
}