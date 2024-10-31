export class Interface {
    constructor(scene, currentScore) {
        this.scene = scene;
        this.healthDisplayAmount = 80;

        this.scoreText = this.scene.add.text(0, 0, `score ${currentScore}`, { fontSize: '2rem', color: '#fff' });
        this.healthBar = this.scene.add.image(32, 50, "health-bar");

        this.scene.add.container(32, 32, [this.scoreText, this.healthBar])
    }

    cropHealthBar() 
    {
        this.healthDisplayAmount -= 20;
        this.healthBar.setCrop(0, 0, this.healthDisplayAmount, 80)
    }


    updateScore(score) 
    {
        this.scoreText.setText(`score ${score}`);
    }
}