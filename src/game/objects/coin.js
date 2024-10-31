export class Coin {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.object = this.scene.physics.add.sprite(this.x, this.y, "coin").
        setOrigin(0, 0).setScale(1.5).setMaxVelocity(0, 50);
        this.scene.physics.add.overlap(this.object, this.scene.player.object, () => this.collectCoin());
        this.object.anims.play("coin-spin");
        this.object.setDepth(5)
    }

    collectCoin() {
        this.scene.increaseScore();
        this.object.setScale(0);
        this.object.destroy();
    }
}