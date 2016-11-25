var containter = document.querySelector('#containter')
var createGame = require('voxel-engine')
var fly = require('voxel-fly')
//var createPlugins = require('voxel-plugins');
//var plugins = createPlugins(game, {require:require});
//var mesher = game.plugins.get('voxel-mesher');
var game = createGame({
	texturePath: '/textures/',
	materials: ['black', 'frame', 'red', 'blue', 'green', 'yellow'],
	generate: function(x, y, z){
		if((x === -5 || x === 10) || (z === -5 || z === 20) || y === 0) return 2;
		if((x === -1 || x === 6) && (y >= 1 && y <= 20) && z === 3) return 1;
		return y === 1 && x >= 0 &&  x <= 5 && z === 3 ? 1 : 0
	},
	worldOrigin: [0, 0, 0],
})

window.game = game
game.appendTo(container)

var createPlayer = require('voxel-player')(game)
var player = createPlayer('skin.png')

player.position.set(4, 1, 19)
player.possess()


// var mesh = mesher.createVoxelMesh(voxels, voxelSideTextureIDs, voxelSideTextureSizes, position, pad)
var makeFly = fly(game)
var target = game.controls.target()
game.flyer = makeFly(target)

window.addEventListener('keydown', function(ev){
	if(ev.keyCode === '1'.charCodeAt(0)){
		tetris.command(0)
	}
	if(ev.keyCode === '2'.charCodeAt(0)){
		tetris.command(1)
	}
	if(ev.keyCode === '3'.charCodeAt(0)){
		tetris.command(3)
	}
	if(ev.keyCode === '4'.charCodeAt(0)){
		tetris.command(2)
	}
	if(ev.keyCode === '5'.charCodeAt(0)){
		tetris.command(4)
	}
	if(ev.keyCode === 'R'.charCodeAt(0)){
		tetris.command(5)
	}
})

var tetris = require('voxel-tetris')(game)


tetris.setDroplocation(3, 20, 3)


game.on('tick', function() {
  if(!tetris.overflag) tetris.tick();
	else console.log("end");
});