function changeNotes(){
	var cooleys = 'X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|\n"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||\n|:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|\n"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]\n';
	var meme = 
	"X:1 \n" +
	"T:Notes \n" +
	"M:C \n" +
	"L:1/4 \n" +
	"K:C \n" +
	"C, D, E, F,|G, A, B, C|D E F G|A B c d|e f g a|b c' d' e'|f' g' a' b'|]" ;
	ABCJS.renderAbc("notation", meme);
}

function clearNotes(){
	
}

function renderNote(MIDINumber, octave = 4){
	
}

function initializePiano(){
	var piano = new PianoKeyboard();
}