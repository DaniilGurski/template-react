
import DIRECTIONS from "../utils/directions";

const playerConfig = {
    gravityY: 400,
    speedX: 200,
    speedY: -480,
    size: 2,
}

export class Player {
    constructor(scene, x, y, lives, score) {
        this.scene = scene
        this.x = x - 24;
        this.y = y;
        this.active = true
        this.lives = lives;
        this.score = score;
        this.respawnTimer;

        this.object = scene.physics.add.sprite(this.x, this.y, 'player').setOrigin(0, 0).setSize(13,24);
        this.object.body.setGravityY(playerConfig.gravityY);
        this.object.setScale(playerConfig.size);
    }

    respawn()
    {
        this.scene.sound.play("player-respawn");
        this.scene.decreaseHealth();
        this.active = true;
        this.object.setPosition(this.x, this.y);
    }

    takeDamage()
    {   
        this.scene.cameras.main.shake(200, 0.01);
        this.active = false;
        this.object.setVelocityY(-400);
        this.lives--;
        this.setAnimation("player-death");
        this.scene.sound.play("player-hit")

        // Respawn player after 3 seconds or end game if no lives left
        this.respawnTimer = this.scene.time.addEvent({
            delay: 3000,

            callback: () => {
                if (this.lives > 0) {
                    this.respawn();
                } else {
                    // change to game over scene
                    this.scene.changeScene();
                }
            },

            loop: false,
        })
    }
    
    move(direction, jump) 
    {
        this.object.setVelocityX(0);
        
        if (!this.active) {
            return;
        }

        if (direction === DIRECTIONS.RIGHT) {
            this.object.setVelocityX(playerConfig.speedX);
            this.object.setFlipX(false);
        }

        if (direction === DIRECTIONS.LEFT) {
            this.object.setVelocityX(playerConfig.speedX * -1);
            this.object.setFlipX(true);
        }

        if (jump && this.object.body.onFloor()) {
            this.object.setVelocityY(playerConfig.speedY);
            this.scene.sound.play("jump")
        }

        this.animate();
    }

    setAnimation(name) 
    {
        if (this.object.anims.currentAnim?.key !== name) {
            this.object.anims.play(name, true)
        }
    }

    animate() 
    {
        if (this.object.body.onFloor()) {
            if (this.object.body.velocity.x !== 0) {
                this.setAnimation("player-walk")
            } else {
                this.setAnimation("player-idle")
            }
        } else if (this.object.body.velocity.y < 0) {
            this.setAnimation("player-jump")
            
        } else {
            this.setAnimation("player-fall")
        }
    }

    update(direction, isJumpKeyPressed) 
    {
        // Player out of bounds
        if (this.object.body.y >= this.scene.sys.game.canvas.height && this.active) {
            this.takeDamage();
        }



        this.move(direction, isJumpKeyPressed)
    }
}