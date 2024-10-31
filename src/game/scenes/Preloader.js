import { Scene } from 'phaser';
import dataUtils from '../utils/data-utils';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
        });
    }

    preload ()
    {   
        // JSON data
        this.load.json("animations", "data/animations.json");
        this.load.tilemapTiledJSON("game-level", "data/level.json");


        // Images
        this.load.image("terrain-tileset", "assets/terrain.png");
        this.load.image("menu-background", "assets/menu-background.jpg");
        this.load.image("gameover-background", "assets/gameover-background.jpg");
        this.load.image("game-background", "assets/game-background.png");
        this.load.image("health-bar", "assets/health-bar.png");


        // Sounds
        this.load.audio("jump", "assets/sounds/jump.wav");
        this.load.audio("coin", "assets/sounds/coin.wav");
        this.load.audio("player-hit", "assets/sounds/explosion.wav");
        this.load.audio("player-respawn", "assets/sounds/respawn.wav");
        this.load.audio("enemy-hit", "assets/sounds/hurt.wav");
        this.load.audio("tap", "assets/sounds/tap.wav");


        // Spritesheets
        this.load.spritesheet("player", "assets/player.png", {
            frameWidth: 24,
            frameHeight: 24,
        });

        this.load.spritesheet("enemy", "assets/enemy.png", {
            frameWidth: 24,
            frameHeight: 24,
        });

        this.load.spritesheet("coin", "assets/coin.png", {
            frameWidth: 20,
            frameHeight: 20,
        });
    }

    create ()
    {
        this.scene.start('MainMenu');
        this.createAnimations();
    }

    createAnimations ()
    {
        // Get animation data from cache
        const animations = dataUtils.getAnimations(this);

        animations.forEach((animation) => {
            // Generate frames if there are any
            const frames = animation.frames ? 
            this.anims.generateFrameNumbers(animation.asset, { frames: animation.frames }) :
            this.anims.generateFrameNumbers(animation.asset)

            this.anims.create({
                key: animation.key,
                frames: frames,
                frameRate: animation.frameRate,
                repeat: animation.repeat,
                yoyo: animation.yoyo
            })
        })
    }
}
