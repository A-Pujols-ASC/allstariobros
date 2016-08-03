//creating game instance/canvas (global parent)
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
function preload() {
    //puts assets into phaser cache
    game.load.path = ("http://localhost/allstariobros/assets/");
    game.load.image('sky','sky.png');
    game.load.image('ground', 'platform.png');
    game.load.image('star', 'star.png');
    //our player
    game.load.spritesheet('dude', 'dude.png', 32, 48);
}
function create() {
    //Actually adds our sprites as objects to the game
    //loads physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //background
    game.add.sprite(0,0,'sky');
    platforms = game.add.group();
}

function update() {
}