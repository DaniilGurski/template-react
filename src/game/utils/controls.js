import DIRECTIONS from "./directions";

export default class Controls {
    constructor(scene) {
        this.scene = scene;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    getJumpKeyPressed()
    {
        return this.cursors.up.isDown;
    }

    getPressedDirectionKey() {
        let selectedDirection = DIRECTIONS.NONE;

        if (this.cursors.left.isDown) {
            selectedDirection = DIRECTIONS.LEFT;
        }

        else if (this.cursors.right.isDown) {
            selectedDirection = DIRECTIONS.RIGHT;
        }

        return selectedDirection;
    }
}