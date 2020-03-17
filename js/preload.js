class Preload extends Phaser.Scene {
    constructor() {
        super({key: "Preload"});
    }

    preload() {
        this.load.html('controlBox','assets/text/controlBox.html');
    }

    create() {
        this.scene.start("Main");
    }
}