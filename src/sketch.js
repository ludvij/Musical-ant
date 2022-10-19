

const WIDTH = 800
const HEIGHT = 800
const X = 200
const Y = 200
const LEN_X = WIDTH / X
const LEN_Y = WIDTH / Y
let sd = {}

function setup() {
	createCanvas(WIDTH, HEIGHT)
	frameRate(60)
	background(255)
	draw_grid()
	stroke(255)
	create_ant(X, Y)
	set_ant_rules('LRRRRRLLR')
	// create_rnd_ant_rules(12)
	sd = step_ant()
}

function draw() {
	repeat(1000)
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
		} else {
			break
		}
	}
}
