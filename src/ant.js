
const ant_grid = []
const ant_ptr = {
	x : 0,
	y : 0,
	//  0
	// 3 1
	//  2
	direction : 0,
	rules : []
}

function create_ant(w, h) {
	for (let i = 0; i < w; i++) {
		ant_grid[i] = []
		for (let j = 0; j < h; j++) {
			ant_grid[i][j] = 0
		}
	}
	ant_ptr.x = w / 2
	ant_ptr.y = h / 2
}

function create_rule(direction, cr, cg, cb) {
	return {
		rule : direction,
		color : {
			r : cr,
			g : cg,
			b : cb
		}
	}
}
function create_rnd_color() {
	return {
		'r' : Math.floor(Math.random() * 256),
		'g' : Math.floor(Math.random() * 256),
		'b' : Math.floor(Math.random() * 256)
	}
}
function create_rule(direction) {
	let clr = create_rnd_color()
	return {
		rule : direction,
		color : {r : clr.r, g : clr.g, b : clr.b}
	}
}

function set_ant_rules(rules) {
	for(let i = 0; i < rules.length; i++) {
		ant_ptr.rules[i] = create_rule(rules.charAt(i))
	}
}

function create_rnd_ant_rules(n) {
	let types = ['L','R']
	let rules = ''
	for(let i = 0; i < n; i++) {
		let chooser = Math.floor(Math.random()*2)
		let rule = types[chooser]
		rules += rule
		ant_ptr.rules[i] = create_rule(rule)
	}
	console.log('using rules: ' + rules)
}



function step_ant() {
	let x = ant_ptr.x
	let y = ant_ptr.y
	let val = ant_grid[x][y]
	let rule = ant_ptr.rules[val]
	switch (rule.rule) {
		case 'L': ant_ptr.direction = ant_ptr.direction > 0 ? ant_ptr.direction -1 : 3
			break
		case 'R': ant_ptr.direction = ant_ptr.direction < 3 ? ant_ptr.direction + 1 : 0
			break
	}
	ant_grid[x][y] = val < ant_ptr.rules.length -1 ? val + 1 : 0
	switch(ant_ptr.direction) {
		case 0: ant_ptr.y--
			break
		case 1: ant_ptr.x++
			break
		case 2: ant_ptr.y++
			break
		case 3: ant_ptr.x--
	}
	
	let end = false
	if (ant_ptr.x < 0 || ant_ptr.x >= ant_grid.length || ant_ptr.y < 0 || ant_ptr.y >= ant_grid[0].length) {
		end = true
		x = 0
		y = 0
	}

	return {
		'x' : x,
		'y' : y,
		'color' : ant_ptr.rules[val].color,
		'end' : end
	}
}



