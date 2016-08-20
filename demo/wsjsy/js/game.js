var game = new Phaser.Game(640, 1000, Phaser.CANVAS, 'gameDiv');
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('result', resultState);

game.state.start('boot');