var bootState = {
	create: function() {
		game.stage.backgroundColor = '#ffffff';
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.state.start('load');
	}
};