var resultState = {
	create: function() {
		game.add.sprite(0, 0, 'fengmian');
		this.questionPanel = game.add.sprite(game.world.centerX, 175, 'wentixianshiqu');
		this.questionPanel.anchor.setTo(0.5, 0);

		this.resultTitle = game.add.text(game.world.centerX, 220, '成功阻止傅爷', {
			font: '50px Arial',
			fill: '#f56e48',
			align: 'center'
		});
		this.resultTitle.anchor.setTo(0.5, 0);

		var num = parseInt(sessionStorage.getItem('rrr'));
		this.resultNum = game.add.text(game.world.centerX, 300, num + '次', {
			font: '72px Arial',
			fill: '#f56e48',
			align: 'center'
		});
		this.resultNum.anchor.setTo(0.5, 0);

		var rText = '知识匮乏，还需努力';
		if (num > 5 && num < 9) {
			rText = '你离优秀就差一步';
		}
		else if (num >= 9 && num <= 10){
			rText = '恭喜你击败了95%的挑战者';
		}
		else if (num > 10) {
			rText = '恭喜你击败了99%的挑战者';
		}
		this.rTextLabel = game.add.text(game.world.centerX, 420, rText, {
			font: '45px Arial',
			fill: '#f56e48',
			align: 'center'
		});
		this.rTextLabel.anchor.setTo(0.5, 0);

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