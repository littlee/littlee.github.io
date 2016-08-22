var FREE_COUNT = 2;
var GAME_TIME = 50;

var playState = {

	create: function() {
		// 背景图片
		this.bg = game.add.tileSprite(0, 0, 1920, 1000, 'yongchi');

		// 打击音乐
		this.beatSound = game.add.audio('beat');

		// 加载问题数据
		this.question = game.cache.getJSON('question');
		this.question = this.question.sort(function() {
			return 1 - Math.random() > 0.5;
		}).map(function(item) {
			return {
				q: item.q.split('').join(' '),
				a: item.a,
				b: item.b,
				o: item.o
			};
		});
		this.oo = null;

		// 游泳
		this.youyong = game.add.sprite(game.world.centerX, 150, 'youyong');
		this.youyong.anchor.setTo(0.5, 0);
		this.youyong.animations.add('swim');
		this.youyong.animations.play('swim', 10, true);

		// 游泳被打击
		this.youyongB = game.add.sprite(game.world.centerX, 90, 'beida');
		this.youyongB.anchor.setTo(0.5, 0);
		this.youyongB.visible = false;
		this.beatenAnim = this.youyongB.animations.add('beaten');
		this.beatenAnim.onComplete.add(function() {
			this.youyong.visible = true;
			this.youyongB.visible = false;
			
			this._enableBeatBtn();
		}, this);

		// 打击
		this.beatSprite = game.add.sprite(game.world.centerX, 200, 'jida');
		this.beatSprite.anchor.setTo(0.5, 0);
		this.beatSprite.visible = false;
		this.beatSpriteAnim = this.beatSprite.animations.add('beat');
		this.beatSpriteAnim.onComplete.add(function() {
			this.beatSprite.visible = false;
			var n = game.rnd.integerInRange(0, 5);
			this.d[n].visible = true;
			game.time.events.add(Phaser.Timer.SECOND * 1, function() {
				this.d[n].visible = false;
			}, this);
		}, this);

		// 打击次数
		game.add.sprite(game.world.centerX, 620, 'dajicishu').anchor.setTo(0.5, 0);
		this.score = 0;
		this.beatCountText = game.add.text(0, 0, this.score + '次', {
			font: '64px Arial',
			fill: '#333',
			boundsAlignH: 'center',
			boundsAlignV: 'middle'
		});
		this.beatCountText.setTextBounds(game.world.centerX - 150, 620, 300, 101);

		// 剩余时间
		this.time = GAME_TIME;
		this.timeText = game.add.text(550, 10, this.time + 's', {
			font: '50px Arial',
			fill: '#fff'
		});
		this.countDownTimer = game.time.events.loop(Phaser.Timer.SECOND, function() {
			this.time--;
			this.timeText.setText(this.time + 's');
			if (this.time === 0) {
				game.time.events.remove(this.countDownTimer);
				this._gameOver();
			}
		}, this);

		// 打击按钮
		this.beatBtn = game.add.sprite(game.world.centerX, game.world.bounds.height - 100, 'dajizhudang');
		this.beatBtn.anchor.setTo(0.5, 0.5);
		this.beatBtn.inputEnabled = true;
		this.beatBtn.events.onInputDown.add(function() {
			this._disabelBeatBtn();

			if (this.score < FREE_COUNT) {
				this._beatIt();
			} else {
				var r = game.rnd.integerInRange(1, 5);
				if (r === 3) {
					this._beatIt();
				}
				else {
					this._showQuestion();
				}
			}
		}, this);

		// 打击回应
		this.d = [];
		for (var i = 0; i < 6; i++) {
			this.d[i] = game.add.sprite(game.world.centerX, 100, 'd' + i);
			this.d[i].anchor.setTo(0.5, 0);
			this.d[i].visible = false;
		}

		// 回答问题
		this.answerTitle = game.add.sprite(game.world.centerX, 100, 'huidawenti');
		this.answerTitle.anchor.setTo(0.5, 0);
		this.answerTitle.visible = false;

		// 问题区域
		this.questionPanel = game.add.sprite(game.world.centerX, 275, 'wentixianshiqu');
		this.questionPanel.anchor.setTo(0.5, 0);
		this.questionPanel.visible = false;
		this.questionPanelText = game.add.text(game.world.centerX, 300, '问题', {
			font: '40px Arial',
			color: '#333',
			wordWrap: true,
			wordWrapWidth: 450,
			align: 'center'
		});
		this.questionPanelText.anchor.set(0.5, 0);
		this.questionPanelText.visible = false;

		// 问题选项
		var optionStyle = {
			font: '40px Arial',
			color: '#333',
			align: 'center'
		};
		this.optionA = game.add.sprite(game.world.centerX, 600, 'xuanxiang');
		this.optionA.anchor.setTo(0.5, 0);
		this.optionA.visible = false;
		this.optionA.events.onInputDown.add(function() {
			this._answer('a');
		}, this);
		this.optionAText = game.add.text(game.world.centerX, 610, 'OPTION A', optionStyle);
		this.optionAText.anchor.setTo(0.5, 0);
		this.optionAText.visible = false;

		this.optionB = game.add.sprite(game.world.centerX, 690, 'xuanxiang');
		this.optionB.anchor.setTo(0.5, 0);
		this.optionB.visible = false;
		this.optionB.events.onInputDown.add(function() {
			this._answer('b');
		}, this);
		this.optionBText = game.add.text(game.world.centerX, 700, 'OPTION B', optionStyle);
		this.optionBText.anchor.setTo(0.5, 0);
		this.optionBText.visible = false;

		// 正确错误
		this.correctAns = game.add.image(game.world.centerX, 200, 'zhengque');
		this.correctAns.anchor.setTo(0.5, 0);
		this.correctAns.visible = false;
		this.wrongAns = game.add.image(game.world.centerX, 200, 'cuowu');
		this.wrongAns.anchor.setTo(0.5, 0);
		this.wrongAns.visible = false;
	},

	update: function() {
		this.bg.tilePosition.x += 3;
	},

	_enableBeatBtn: function() {
		this.beatBtn.inputEnabled = true;
		this.beatBtn.alpha = 1;
	},

	_disabelBeatBtn: function() {
		this.beatBtn.inputEnabled = false;
		this.beatBtn.alpha = 0.3;
	},

	_beatIt: function() {
		this.score++;
		this.beatCountText.setText(this.score + '次');

		this.beatSprite.visible = true;
		this.beatSpriteAnim.play(10, false);

		this.youyong.visible = false;
		this.youyongB.visible = true;
		this.beatenAnim.play(10, false);
		this.beatSound.play();
	},

	_showQuestion: function() {
		this.answerTitle.visible = true;
		this.questionPanel.visible = true;
		this.questionPanelText.visible = true;
		this.optionA.visible = true;
		this.optionA.inputEnabled = true;
		this.optionAText.visible = true;
		this.optionB.visible = true;
		this.optionB.inputEnabled = true;
		this.optionBText.visible = true;

		var q = this.question.shift();
		this.questionPanelText.setText(q.q);
		this.optionAText.setText(q.a);
		this.optionBText.setText(q.b);
		this.oo = q.o;
	},

	_hideQuestion: function() {
		this.answerTitle.visible = false;
		this.questionPanel.visible = false;
		this.questionPanelText.visible = false;
		this.optionA.visible = false;
		this.optionA.inputEnabled = false;
		this.optionAText.visible = false;
		this.optionB.visible = false;
		this.optionB.inputEnabled = false;
		this.optionBText.visible = false;
	},

	_answer: function(option) {
		this._hideQuestion();
		if (this.oo === option) {
			this.correctAns.visible = true;
			game.time.events.add(500, function() {
				this.correctAns.visible = false;

				this._beatIt();
			}, this);
		}
		else {
			this.wrongAns.visible = true;
			game.time.events.add(500, function() {
				this.wrongAns.visible = false;

				this._enableBeatBtn();
			}, this);
		}
	},

	_gameOver: function() {
		sessionStorage.setItem('rrr', this.score);
		game.state.start('result');
	}
};