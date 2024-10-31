import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
        this.cursor;
    }

    create ()
    {
        const bg = this.add.image(0, 0, 'gameover-background')
        const canvasWidth = this.sys.game.config.width;
        const canvasHeight = this.sys.game.config.height;
        const textAlignX = canvasWidth / 2;
        const textAlignY = canvasHeight / 2;
        this.cursor = this.input.keyboard.createCursorKeys();

        bg.setOrigin(0, 0);

        // Stretch to fill the screen
        bg.displayWidth = canvasWidth;
        bg.displayHeight = canvasHeight;

        this.add.text(textAlignX, textAlignY, 'Game Over', { fontSize: '2rem', color: '#fff' }).setOrigin(0.5);
        this.add.text(textAlignX, textAlignY + 50, 'Press up arrow to restart', { fontSize: '2rem', color: '#fff' }).setOrigin(0.5);

        EventBus.emit('current-scene-ready', this);
    }

    update()
    {
        const { up } = this.cursor;

        if (up.isDown)
        {
            this.changeScene();
        }
    }

    changeScene ()
    {
        this.scene.start('Game');
    }
}
