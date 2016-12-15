




///////
var container = document.querySelector('#container')
var createGame = require('voxel-engine')
var fly = require('voxel-fly')
var tetris = require('voxel-tetris')

var game = createGame({
	texturePath: 'shimjunghoon.github.com/textures/',
	materials: ['black', 'frame', 'renewer-red', 'renewer-blue', 'renewer-green', 'renewer-yellow', 'renewer-green2', 'renewer-purple', 'renewer-orange',
	'red-tile', 'blue-tile', 'green-tile', 'yellow-tile'],
	generate: function(x, y, z){
		if(x >= 0 && x <= 5 && y === 0 && z >= 3 && z <= 8) return 1;
		return 0
	},
	skyColor: 0xFFFFFF,
	keybindings: {
		'<up>': 'forward'
		, '<left>': 'left'
		, '<down>': 'backward'
		, '<right>': 'right'
		, 'J': 'jump'
		, '<shift>': 'crouch'
		, '<control>': 'alt'
	},
	worldOrigin: [0, 0, 0],
	container: 'container'
})


window.game = game
game.appendTo(container)

var createPlayer = require('voxel-player')(game)
var player = createPlayer('skin.png')

player.position.set(3, 4, 40)
player.possess();

var makeFly = fly(game)
var target = game.controls.target()
game.flyer = makeFly(target, false)
game.flyer.startFlying()

var explode1 = require('voxel-debris')(game, { power : 1.5 });

game.explode = explode1;

var tetris1 = new tetris(game, {
	pos: {
		x:0,
		y:1,
		z:3
	}
})
tetris1.makeBoard();
window.addEventListener('keydown', function(ev){
	if(ev.keyCode === 49){
		player.position.set(4,10,-50)
	}
	if(ev.keyCode === 88){ //X
		tetris1.command(0);
	}
	if(ev.keyCode === 83){ //S
		tetris1.command(1);
	}
	if(ev.keyCode === 87){ //W
		tetris1.command(2);
	}
	if(ev.keyCode === 68){ //A
		tetris1.command(3);
	}
	if(ev.keyCode === 65){ //D
		tetris1.command(4);
	}
	if(ev.keyCode === 90){ //Z
		tetris1.command(5);
	}
	if(ev.keyCode === 69){ //E
		tetris1.command(6);
	}
	if(ev.keyCode === 32){ //space
		tetris1.command(8);
	}
})

game.on('tick', function() {
  if(!tetris1.overflag) tetris1.tick();
  explode1(5, 5, 5);
});



////

var createGame2 = require('voxel-engine')


var game2 = createGame2({
	texturePath: './textures/',
	materials: ['black', 'frame', 'renewer-red', 'renewer-blue', 'renewer-green', 'renewer-yellow', 'renewer-green2', 'renewer-purple', 'renewer-orange',
	'red-tile', 'blue-tile', 'green-tile', 'yellow-tile'],
	generate: function(x, y, z){
		if(x >= 0 && x <= 5 && y === 0 && z >= 3 && z <= 8) return 1;
		return 0
	},
	skyColor: 0xFFFFFF,
	keybindings: {
		'J': 'jump'
		, '<shift>': 'crouch'
		, '<control>': 'alt'
	},
	worldOrigin: [0, 0, 0],
	container: 'container2'
})

console.log(game.materials)


window.game2 = game2
game2.appendTo(container2)

var createPlayer2 = require('voxel-player')(game2)
var player2 = createPlayer2('skin.png')

player2.position.set(3, 4, 40)
player2.possess();

var makeFly2 = fly(game2)
var target2 = game2.controls.target()
game2.flyer = makeFly2(target2, false)
game2.flyer.startFlying()

var explode2 = require('voxel-debris')(game2, { power : 1.5 });

game2.explode = explode2;

var tetris2 = new tetris(game2, {
	pos: {
		x:0,
		y:1,
		z:3
	}
})
tetris2.makeBoard();

window.addEventListener('keydown', function(ev){
	if(ev.keyCode === 49){
//		player2.position.set(4,10,-50)
	}
	if(ev.keyCode === 88){ //X
		tetris2.command(0);
	}
	if(ev.keyCode === 83){ //S
		tetris2.command(1);
	}
	if(ev.keyCode === 87){ //W
		tetris2.command(2);
	}
	if(ev.keyCode === 68){ //A
		tetris2.command(3);
	}
	if(ev.keyCode === 65){ //D
		tetris2.command(4);
	}
	if(ev.keyCode === 90){ //Z
		tetris2.command(5);
	}
	if(ev.keyCode === 69){ //E
		tetris2.command(6);
	}
	if(ev.keyCode === 32){ //space
		tetris2.command(8);
	}
})

game2.on('tick', function() {
  if(!tetris2.overflag) tetris2.tick();
});