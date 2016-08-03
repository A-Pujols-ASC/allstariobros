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
    //creates background
    game.add.sprite(0,0,'sky');
    //this group will contain our ground and the 2 ledges
        //"ground" is just a large platform!
    platforms = game.add.group();
    //enables physics for any object (platform) in this group
    platforms.enableBody = true;
    //our "ground" var is the child object of platforms
        //x, y is higher than the bottom, calling sprite key
    var ground = platforms.create(0,game.world.height-64,'ground');
    //scaling floor to game width (originla was half screen size)
    ground.scale.setTo(2,2);
    //makes ground static (wont fall when jumpedo n)
    ground.body.immovable = true;
    //like ground, were making ledges
    var ledge = platforms.create(400, 400, "ground");
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, "ground");
    ledge.body.immovable = true;
    //ADDING STARS!!
    stars = game.add.group();
    stars.enableBody = true;
    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 6;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    // Adding player ontop of platform
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //makes 'dude' bouncy, sets gravity, and adds collision
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //Runs [] frames when 'var' called, sets fms, and loop t or f
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
}
function update() {
    //Function called everyframe
    //checks collision with boundaries and platforms group
    game.physics.arcade.collide(player, platforms);
    //adding collision detection for stars and player
    game.physics.arcade.collide(stars, platforms);
    //checks for overlap with player
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    function collectStar (player, star) {
    // Removes the star from the screen
    star.kill();
    }
    //using phaser's built in keybaord manager
    cursors = game.input.keyboard.createCursorKeys();
    //  Reset the players velocity (movement)
        //you could also add momentum and acceleration
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        //  Stand still
        player.animations.stop()
        player.frame = 4;
    }
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
}
//when you call a function, either load, add, create, etc..you
//MUST attach a parent to it (outcome must be a child object)