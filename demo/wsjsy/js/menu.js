var menuState = {
	create: function() {
		game.add.sprite(0, 0, 'fengmian');
		var startBtn = game.add.sprite(game.world.centerX, game.world.bounds.height - 150, 'kaishiyouxi');
		startBtn.anchor.setTo(0.5, 0.5);
		startBtn.inputEnabled = true;
		startBtn.events.onInputDown.add(function() {
			game.state.start('play');
			this.bgMusic.destroy();
		}, this);


		this.bgMusic = game.add.audio('bg');
		this.bgMusic.play();

	}
};