var resultState = {
	create: function() {
		game.add.sprite(0, 0, 'fengmian');
		this.questionPanel = game.add.sprite(game.world.centerX, 175, 'jieguo_bg');
		this.questionPanel.anchor.setTo(0.5, 0);

		var num = parseInt(sessionStorage.getItem('rrr'));
		this.resultNum = game.add.text(game.world.centerX, 300, num, {
			font: '100px Arial',
			fill: '#308530',
			align: 'center'
		});
		this.resultNum.anchor.setTo(0.5, 0);

		this.rText = [];
		for(var i = 0; i < 4; i++) {
			this.rText[i] = game.add.sprite(game.world.centerX, 450, 'r' + i);
			this.rText[i].anchor.setTo(0.5, 0);
			this.rText[i].visible = false;
		}

		var rIndex = 0;
		if (num > 7 && num <= 9) {
			rIndex = 1;
		}
		else if (num > 9 && num <= 12){
			rIndex = 2;
		}
		else if (num > 12) {
			rIndex = 3;
		}
		this.rText[rIndex].visible = true;

		this.replayBtn = game.add.sprite(15, 550, 'zaiwanyici');
		this.replayBtn.inputEnabled = true;
		this.replayBtn.events.onInputDown.add(function() {
			game.state.start('play');
		}, this);

		this.aboutBtn = game.add.sprite(325, 550, 'liaojiewomen');
		this.aboutBtn.inputEnabled = true;
		this.aboutBtn.events.onInputDown.add(function() {
			window.location.href = 'about.html';
		}, this);
	}
};