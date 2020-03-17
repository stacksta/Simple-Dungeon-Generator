const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    dom: {
        createContainer: true
    },
    scene: [
        Preload,
        Main,
        // DebugUI
    ],
};

const game = new Phaser.Game(config);