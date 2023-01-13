
let sd = {}
let start = {}
let sound_wait = 0

const WIDTH = 900
const HEIGHT = 900
const X = 200
const Y = 200
const LEN_X = WIDTH / X
const LEN_Y = HEIGHT / Y
const I1000 = 1 / 1000
const TIME = 30
const FPS = 60
const EXECUTIONS = 1800
// executions per draw call in order to achieve n executions a seconds
const EXECUTIONS_PER_FRAME = EXECUTIONS / FPS
const BPM = 180
// frames to skip sound in order to get the bpm needed
const FRAMES_TO_WAIT = FPS / BPM * 60

function setup() {
	createCanvas(WIDTH, HEIGHT)
	frameRate(FPS)
	
	start_ant()
}

function draw() {
	repeat(EXECUTIONS_PER_FRAME)
	if (sound_wait++ >= FRAMES_TO_WAIT) {
		// play sound
		console.log('playing sound: ' + sd.ruleNumber)
		sound_wait = 0
	}
}


function start_ant() {
	background(255)
	stroke(255)
	// draw_grid()
	create_ant(X, Y)
	// set_ant_rules('LRRRRRLLR')
	// set_ant_rules('LLRRRLRRRRRR')
	// set_ant_rules('RRLLLRLLLRRR')
	create_rnd_ant_rules(8)
	sd = step_ant()
	start = new Date()
}

function draw_grid() {

	stroke(0x98, 0x98, 0x98)
	for (let i = 0; i < X; i++) {
		line(LEN_X * i, 0, LEN_X * i, HEIGHT)
	}
	for (let i = 0; i < Y; i++) {
		line(0, LEN_Y * i, WIDTH, LEN_Y * i)
	}
	// stroke(0)
}

function paint_cell(x, y, clr) {

	noStroke()
	fill(clr)
	
	rect(LEN_X*x, LEN_Y*y, LEN_X, LEN_Y)
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
			if ((new Date().getTime() - start.getTime()) * I1000 > TIME) {
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
