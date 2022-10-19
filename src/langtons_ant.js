
const ant_grid = []
const ant_ptr = {
	x : 0,
	y : 0,
	orientation : 0,
	tiling : [],
	rules : [],
	step : 0
}

const rule_types = ['R', 'L']

/**
 * creates a new ant with a grid of x, y coordinates
 * @param {int} w 
 * @param {int} h 
 */
function create_ant(w, h, tiling=set_square_ant_tiling) {
	for (let i = 0; i < w; i++) {
		ant_grid[i] = []
		for (let j = 0; j < h; j++) {
			ant_grid[i][j] = 0
		}
	}
	ant_ptr.x = w / 2
	ant_ptr.y = h / 2
	console.log('Created ant for grid ['+w+', '+h+']')
	console.log('Created ant at: ['+ant_ptr.x+', '+ant_ptr.y+']')
	tiling()
}

function random_int(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
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
		'r' : random_int(0, 256),
		'g' : random_int(0, 256),
		'b' : random_int(0, 256)
	}
}
function create_rule(direction) {
	let clr = create_rnd_color()
	return {
		rule : direction,
		color : {r : clr.r, g : clr.g, b : clr.b}
	}
}


/**
 * creates a ruleset based on a string input
 * @param {str} rules 
 */
function set_ant_rules(rules) {
	console.log('using ruleSet: ' + rules)
	for(let i = 0; i < rules.length; i++) {
		ant_ptr.rules[i] = create_rule(rules.charAt(i))
	}
}

/**
 * creates n random rules the ant will be following
 * @param {int} n is the amount of random rules 
 */
function create_rnd_ant_rules(n) {
	let rules = ''
	for(let i = 0; i < n; i++) {
		let chooser = random_int(0, rule_types.length)
		let rule = rule_types[chooser]
		rules += rule
		ant_ptr.rules[i] = create_rule(rule)
	}
	console.log('using ruleSet: ' + rules)
}


/**
 * makes the ant step once
 * @returns the step data consisting, on the visited cell and 
 * the value of the color of that cell based on the rule used
 */
function step_ant() {
	let x = ant_ptr.x
	let y = ant_ptr.y
	let val = ant_grid[x][y]
	let rule = ant_ptr.rules[val]
	switch (rule.rule) {
		case 'L': ant_ptr.orientation = ant_ptr.orientation > 0 ? ant_ptr.orientation -1 : 3
		break
		case 'R': ant_ptr.orientation = ant_ptr.orientation < ant_ptr.tiling.length-1 ? ant_ptr.orientation + 1 : 0
		break
	}
	ant_grid[x][y] = val < ant_ptr.rules.length -1 ? val + 1 : 0
	for (let tiling of ant_ptr.tiling) {
		if (tiling.index == ant_ptr.orientation) {
			tiling.operation()
			break
		}
	}
	
	
	let end = false
	if (ant_ptr.x < 0 || ant_ptr.x >= ant_grid.length || ant_ptr.y < 0 || ant_ptr.y >= ant_grid[0].length) {
		end = true
		x = 0
		y = 0
	} else {
		ant_ptr.step++
	}
	
	return {
		'x' : x,
		'y' : y,
		'color' : ant_ptr.rules[val].color,
		'end' : end,
		'step': ant_ptr.step
	}
}
/**
 * sets the operation based on orientation
 * for a square grid based tiling
 */
function set_square_ant_tiling() {
	console.log('Using square based grid')
	ant_ptr.tiling = []
	add_orientation_operation(() => {ant_ptr.y -= 1})
	add_orientation_operation(() => {ant_ptr.x += 1})
	add_orientation_operation(() => {ant_ptr.y += 1})
	add_orientation_operation(() => {ant_ptr.x -= 1})
}

/**
 * adds a new orientation operation at the end of the operation
 * @param {func} operation 
 */
function add_orientation_operation(operation) {
	ant_ptr.tiling[ant_ptr.tiling.length] = {
		'index' : ant_ptr.tiling.length,
		'operation' : operation
	}
}