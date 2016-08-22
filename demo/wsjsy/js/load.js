var loadState = {
	preload: function() {
		var loadingLabel = game.add.text(game.world.centerX, game.world.centerY, 'loading...', {
			font: '64px Arial',
			color: '#333'
		});
		loadingLabel.anchor.setTo(0.5, 0.5);

		game.load.image('fengmian', 'images/fengmian.jpg');
		game.load.image('kaishiyouxi', 'images/kaishiyouxi.png');
		game.load.spritesheet('youyong', 'images/youyong_sprite.png', 450, 280, 20);
		game.load.spritesheet('beida', 'images/beida_sprite.png', 450, 368, 20);
		game.load.spritesheet('jida', 'images/jida_sprite.png', 600, 380, 5);
		game.load.image('yongchi', 'images/yongchi.jpg');

		game.load.image('dajizhudang', 'images/dajizhudang.png');
		game.load.image('dajicishu', 'images/dajicishu.png');
		game.load.image('shengyushijian', 'images/shengyushijian.png');
		game.load.image('xuanxiang', 'images/xuanxiang.png');
		game.load.image('huidawenti', 'images/huidawenti.png');
		game.load.image('zaiwanyici', 'images/zaiwanyici.png');
		game.load.image('liaojiewomen', 'images/liaojiewomen.png');
		game.load.image('wentixianshiqu', 'images/wentixianshiqu.png');

		game.load.image('zhengque', 'images/zhengque.png');
		game.load.image('cuowu', 'images/cuowu.png');

		game.load.json('question', 'question.json');

		game.load.image('d0', 'images/d/1.png');
		game.load.image('d1', 'images/d/2.png');
		game.load.image('d2', 'images/d/3.png');
		game.load.image('d3', 'images/d/4.png');
		game.load.image('d4', 'images/d/5.png');
		game.load.image('d5', 'images/d/6.png');

		game.load.image('zaiwanyici', 'images/zaiwanyici.png');
		game.load.image('liaojiewomen', 'images/liaojiewomen.png');

		game.load.audio('bg', 'sounds/bg.mp3');
		game.load.audio('beat', 'sounds/beat.mp3');

		game.load.image('r0', 'images/r/1.png');
		game.load.image('r1', 'images/r/2.png');
		game.load.image('r2', 'images/r/3.png');
		game.load.image('r3', 'images/r/4.png');
		game.load.image('jieguo_bg', 'images/jieguo_bg.png');
	},

	create: function() {
		game.state.start('result');
	}
};