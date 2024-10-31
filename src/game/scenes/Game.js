import Controls from '../utils/controls';
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../objects/player';
import { Enemy } from 
'../objects/enemy';
import { Interface } from '../objects/interface';
import { Coin } from '../objects/coin';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.player;
        this.enemies = [];
        this.interface;
        this.controls;
        this.enemyTimer;
        this.coinTimer;
        this.obstileLayer;
        this.canvasWidth;

        this.lives;
        this.score;
    }

    addEnemy() 
    {
        const enemy = new Enemy(this, (this.canvasWidth / 2) - 25, -30, this.obstacleLayer);
        this.enemies.push(enemy);
        this.sound.play("tap");
    }


    addCoin() 
    {
        const coin = new Coin(this, Math.random() * this.canvasWidth, 100);
    }


    increaseScore() 
    {
        this.score++;
        this.interface.updateScore(this.score);     
        this.sound.play("coin"); 
    }


    decreaseHealth() 
    {
        this.lives--;
        this.interface.cropHealthBar();
    }
    

    create ()
    {   
        const map = this.add.tilemap("game-level");
        const terrainTiles = map.addTilesetImage("terrain", "terrain-tileset");
        const backgroundLayer = map.createLayer("Background", terrainTiles);
        this.enemies = [];
        this.score = 0;
        this.lives = 3;

        
        this.canvasWidth = this.sys.game.canvas.width;
        this.obstacleLayer = map.createLayer("Obstacles", terrainTiles);
        this.controls = new Controls(this);
        this.player = new Player(this, this.canvasWidth / 2, 100, this.lives, this.score);

        // Interface
        this.interface = new Interface(this, this.player.score);

        // Collision
        this.obstacleLayer.setCollisionByExclusion(-1);
        this.physics.add.collider(this.player.object, this.obstacleLayer);
        
        // Adding enemies each 5 seconds
        this.enemyTimer = this.time.addEvent({
            delay: 5000,
            callback: () => this.addEnemy(),
            loop: true
        });

        // Adding coins each 5 seconds
        this.coinTimer = this.time.addEvent({
            delay: 5000,
            callback: () => this.addCoin(),
            loop: true,
        })

        
        EventBus.emit('current-scene-ready', this);
    }


    update ()
    {
        const direction = this.controls.getPressedDirectionKey();
        const jumpKeyPressed = this.controls.getJumpKeyPressed();
        this.player.update(direction, jumpKeyPressed)

        // Update enemies and removed destroyed ones
        this.enemies.forEach(enemy => {
            if (enemy.destroyed) {
                this.enemies = this.enemies.filter(e=> e !== enemy);

                enemy.enemyJumpTimer.destroy();
                enemy.object.destroy();
                return;
            } 

            enemy.update();
        })
    }


    changeScene()
    {
        this.scene.start('GameOver');
    }
}