
const WIDTH = 700
const HEIGHT = 700
const I1000 = 1 / 1000
const FPS = 60

function togglePause() {
	pause = !pause
	if (pause) {
		noLoop()
		startPause = new Date()
	}
	else {
		elapsed_pause += new Date().getTime() - startPause.getTime()
		loop()
	}
}


function toggleMute() {
	mute = !mute
	return mute
}


function toggleGrid() {
	grid = !grid
	if (grid) draw_grid()
	else {
		background(255)
	}
	for (const [k, v] of Object.entries(pxInfo)) {
		let coords = k.split('-')
		let cell_color = color(v.r, v.g, v.b)
		paint_cell(coords[0], coords[1], cell_color)
	}
}


function setup() {
	let canvas = createCanvas(WIDTH, HEIGHT)
	canvas.parent('sketchDiv')
	frameRate(FPS)
	params = getURLParams()
	x = params.x != undefined ? params.x : 200
	document.getElementById('x').value = x

	y = params.y != undefined ? params.y : 200
	document.getElementById('y').value = y

	bpm = params.bpm != undefined ? params.bpm : 180
	document.getElementById('bpm').value = bpm

	executions = params.executions != undefined ? params.executions : 1800
	document.getElementById('executions').value = executions

	uptime = params.uptime != undefined ? params.uptime : 60
	document.getElementById('uptime').value = uptime

	sound_wait = 0
	sd = {}
	start = {}
	pxInfo = {}
	executions_per_frame = executions / FPS
	executions_to_wait = 1 / executions_per_frame
	frames_to_wait_execution = 0
	frames_to_wait = FPS / bpm * 60
	len_x = WIDTH / x
	len_y = HEIGHT / y
	pause = 0
	startPause = new Date()
	elapsed_pause = 0
	mute = 0
	grid = 0
	scale = {}
	start_ant()
}

function draw() {
	if (executions_per_frame < 1) {
		if (frames_to_wait_execution++ >= executions_to_wait){
			repeat(1)
			frames_to_wait_execution = 0
		}
	} else {
		repeat(executions_per_frame)
	}
	if (sound_wait++ >= frames_to_wait) {
		// play sound
		if (mute) return
		scale.notes[sd.ruleNumber].play()
		sound_wait = 0
	}
}


function start_ant() {
	background(255)
	if (grid) draw_grid()
	stroke(255)
	// draw_grid()
	create_ant(x, y)
	let rules = create_rnd_ant_rules(8)
	// set_ant_rules('LRRRRRLLR')
	// set_ant_rules('LLRRRLRRRRRR')
	// set_ant_rules('RRLLLRLLLRRR')
	let result = {};
	for (let str of rules) {
		result[str] = result.hasOwnProperty(str) ? result[str] + 1 : 1;
	}
	if (result.R >= result.L) {
		scale = scales[0]
	} else {
		scale = scales[1]
	}
	document.getElementsByClassName("rules")[0].textContent = "Usando la regla " + rules
	document.getElementsByClassName("scale")[0].textContent = "Usando la escala " + scale.name
	sd = step_ant()
	pxInfo = {}
	start = new Date()
	elapsed_pause = 0
}

function draw_grid() {

	stroke(0x98, 0x98, 0x98)
	for (let i = 0; i < x; i++) {
		line(len_x * i, 0, len_x * i, HEIGHT)
	}
	for (let i = 0; i < y; i++) {
		line(0, len_y * i, WIDTH, len_y * i)
	}
	// stroke(0)
}

function paint_cell(x, y, clr) {

	noStroke()
	fill(clr)
	
	rect(len_x*x, len_y*y, len_x, len_y)
	// stroke(0)
	fill(255)
	stroke(255)
}




function repeat(n) {
	for (let i = 0; i < n; i++) {
		if (!sd.end) {
			let cell_color = color(sd.color.r, sd.color.g, sd.color.b)
			paint_cell(sd.x, sd.y, cell_color)
			sd = step_ant()
			pxInfo[sd.x+'-'+sd.y] = sd.color
			if ((new Date().getTime() - start.getTime() - elapsed_pause) * I1000 > uptime) {
				console.log('terminated in time')
				start_ant()
				break
			}
		} else {
			console.log('termianted in ' + sd.step +' steps')
			start_ant()
		}
	}
}
