export class Enemy {
    constructor(scene, x, y, obstacleLayer) {
        this.scene = scene
        this.x = x;
        this.y = y;
        this.speed;
        this.active = false;
        this.directions = ["left", "right"]
        this.destroyed = false;
        this.enemyJumpTimer;
        this.player = this.scene.player;
        
        this.object = scene.physics.add.sprite(this.x - 12, this.y, "enemy").setOrigin(0, 0)
        this.object.body.setGravityY(300);
        this.object.setScale(1.5)


        this.scene.physics.add.collider(this.object, obstacleLayer);
        this.scene.physics.add.overlap(this.object, this.scene.player.object);
    }

    jump() 
    {
        if (this.object.body.onFloor()) {
            this.object.setVelocityY(-500);
        }
    }

    move() 
    {
        // Change enemy direction when it hits a wall
        if (this.active && this.object.body.onWall()) {
            this.speed *= -1;
        }
        this.object.setVelocityX(this.speed);
        
    }

    activeEnemy() 
    {
        const direction = this.directions[Math.floor(Math.random() * this.directions.length)];
        this.speed = direction === "left" ? -100 : 100;
        this.active = true;
        
        this.enemyJumpTimer = this.scene.time.addEvent({
            delay: 3000,
            callback: () => this.jump(),
            loop: true
        })
    }

    update() 
    {
        if (this.scene.physics.overlap(this.object, this.player.object) && this.player.active) {
            const playerBottom = this.player.object.getBounds().bottom;
            const enemyTop = this.object.getBounds().top;

            if (playerBottom <= enemyTop) {
                this.player.object.setVelocityY(-500);
                this.destroyed = true;
                this.scene.sound.play("enemy-hit");
            } else {
                this.player.takeDamage();
            }
        }; 


        if (this.object < this.scene.sys.game.canvas.height) {
            this.destroyed = true;
        }

        // If the enemy is on floor and not yet active, pick a direction
        if (this.object.body.onFloor() && !this.active) {
            this.activeEnemy()
        }

        if (this.active) {
            this.move()
        }

    }
}