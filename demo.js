var createGame = require('voxel-engine')
var chunkSize = 32
var chunkDistance = 3
var fly = require('voxel-fly')

var game = createGame({
    texturePath: '/textures/',
materials: [['grass', 'dirt', 'grass_dirt'], 'brick', 'dirt', 'obsidian', 'whitewool', 'cobblestone'],
    generate: function(x,y,z) {
        return (y < -2 && Math.abs(x) < 100 && Math.abs(z) < 100) ? 1 : 0
    },
    controlOptions: {
        jump: 15
    }
})

var createPlayer = require('voxel-player')(game)
var player = createPlayer('skin.png')

player.position.set(4, 1, 9)
player.possess()

var makeFly = fly(game)
var target = game.controls.target()
game.flyer = makeFly(target, false)



game.appendTo('#container');
window.game = game;

console.log(game.voxels)

var tetris = require('voxel-tetris')(game);

game.on('mousedown', function (pos) {
    tetris.touch(pos);
});

game.on('tick', function() {
  tetris.tick();
});


