import Phaser from 'phaser';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

const GRAVITY_Y = 300;

const config = {
    type: Phaser.CANVAS,

    scale: {
        width: 640, 
        height: 640,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    
    parent: 'game-container',
    scene: [
        Preloader,
        MainMenu,
        Game,
        GameOver
    ],

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GRAVITY_Y },
            debug: true, 
        }
    }
};


const StartGame = (parent) => {
    return new Phaser.Game({ ...config, parent });
}

export default StartGame;
