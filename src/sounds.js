
scales = []
function preload() {
	scales[0] = {name: "Do3 Mayor", notes: []}
	scales[0].notes[0] = loadSound('src/sound/major/1.wav');
	scales[0].notes[1] = loadSound('src/sound/major/2.wav');
	scales[0].notes[2] = loadSound('src/sound/major/3.wav');
	scales[0].notes[3] = loadSound('src/sound/major/4.wav');
	scales[0].notes[4] = loadSound('src/sound/major/5.wav');
	scales[0].notes[5] = loadSound('src/sound/major/6.wav');
	scales[0].notes[6] = loadSound('src/sound/major/7.wav');
	scales[0].notes[7] = loadSound('src/sound/major/8.wav');

	scales[1] = {name: "Do3 Menor", notes: []}
	scales[1].notes[0] = loadSound('src/sound/minor/1.wav');
	scales[1].notes[1] = loadSound('src/sound/minor/2.wav');
	scales[1].notes[2] = loadSound('src/sound/minor/3.wav');
	scales[1].notes[3] = loadSound('src/sound/minor/4.wav');
	scales[1].notes[4] = loadSound('src/sound/minor/5.wav');
	scales[1].notes[5] = loadSound('src/sound/minor/6.wav');
	scales[1].notes[6] = loadSound('src/sound/minor/7.wav');
	scales[1].notes[7] = loadSound('src/sound/minor/8.wav');

	// lower volume
	for (scale of scales) {
		for (note of scale.notes) {
			note.setVolume(0.4)
		}
	}
}