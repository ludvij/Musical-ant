
const ant_grid = []
const ant = {
	x : 0,
	y : 0,
	//  0
	// 3 1
	//  2
	direction : 0,
	rules : [],
	step : 0
}

class AntRule {
	constructor(direction, idx) {
		this.direction = direction
		this.color = colors[idx]
	}
}

function create_ant(w, h) {
	for (let i = 0; i < w; i++) {
		ant_grid[i] = []
		for (let j = 0; j < h; j++) {
			ant_grid[i][j] = 0
		}
	}
	ant.step = 0
	ant.direction = 0
	ant.x = w / 2
	ant.y = h / 2
}

function random_int(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}


function set_ant_rules(rules) {
	for(let i = 0; i < rules.length; i++) {
		ant.rules[i] = new AntRule(rules.charAt(i), i)
	}
	return ant.rules.join("")
}

function create_rnd_ant_rules(n) {
	let types = ['L','R']
	let rules = ''
	ant.rules = []
	for(let i = 0; i < n; i++) {
		let chooser = random_int(0, 2)
		let rule = types[chooser]
		rules += rule
		ant.rules[i] = new AntRule(rule, i)
	}
	// ruleset of only right or left cycles over itself so we will discard it
	if (new RegExp('(R{8}|S{8})').test(rules)) {
		return create_rnd_ant_rules(n)
	} else {
		return rules
	}
}



function step_ant() {
	let x = ant.x
	let y = ant.y
	let val = ant_grid[x][y]
	let rule = ant.rules[val]
	switch (rule.direction) {
		case 'L': ant.direction = ant.direction > 0 ? ant.direction -1 : 3
			break
		case 'R': ant.direction = ant.direction < 3 ? ant.direction + 1 : 0
			break
	}
	ant_grid[x][y] = val < ant.rules.length -1 ? val + 1 : 0
	switch(ant.direction) {
		case 0: ant.y--
			break
		case 1: ant.x++
			break
		case 2: ant.y++
			break
		case 3: ant.x--
	}
	
	let end = false
	if (ant.x < 0 || ant.x >= ant_grid.length || ant.y < 0 || ant.y >= ant_grid[0].length) {
		end = true
		x = 0
		y = 0
	} else {
		ant.step++
	}

	return {
		'x' : x,
		'y' : y,
		'color' : ant.rules[val].color,
		'ruleNumber' : val,
		'end' : end,
		'step' : ant.step
	}
}



