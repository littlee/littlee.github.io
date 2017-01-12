import './index.css'
import React from 'react'
import classNames from 'classnames'

class Fireworks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      unmount: false
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        unmount: true
      })
    }, this.props.duration)

    // eslint-disable-next-line 
    Array.prototype.foreach = function(callback) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] !== null) {
          callback.apply(this[i], [i])
        }
      }
    }

    var canvas = document.getElementById('fw-canvas');
    var ocas = document.createElement('canvas');
    ocas.width = canvas.width = window.innerWidth;
    ocas.height = canvas.height = window.innerHeight;
    var octx = ocas.getContext('2d');
    var ctx = canvas.getContext('2d');
    var bigbooms = [];
    var lastTime;
    var raf = window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame || 
      window.oRequestAnimationFrame || 
      window.msRequestAnimationFrame || 
      function(callback) { window.setTimeout(callback, 1000 / 60); };

    var Frag = function(centerX, centerY, radius, color, tx, ty) {
      this.tx = tx;
      this.ty = ty;
      this.x = centerX;
      this.y = centerY;
      this.dead = false;
      this.centerX = centerX;
      this.centerY = centerY;
      this.radius = radius;
      this.color = color;
    }
    Frag.prototype = {
      paint: function() {
        ctx.fillStyle = 'rgba(' + this.color.a + ',' + this.color.b + ',' + this.color.c + ',1)';
        ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
      },
      moveTo: function() {
        this.ty = this.ty + 0.3;
        var dx = this.tx - this.x,
          dy = this.ty - this.y;
        this.x = Math.abs(dx) < 0.1 ? this.tx : (this.x + dx * 0.1);
        this.y = Math.abs(dy) < 0.1 ? this.ty : (this.y + dy * 0.1);
        if (dx === 0 && Math.abs(dy) <= 80) {
          this.dead = true;
        }
        this.paint();
      }
    }
    var Boom = function(x, r, c, boomArea, shape) {
      this.booms = [];
      this.x = x;
      this.y = (canvas.height + r);
      this.r = r;
      this.c = c;
      this.shape = shape || false;
      this.boomArea = boomArea;
      this.theta = 0;
      this.dead = false;
      this.ba = parseInt(getRandom(80, 200), 10);
    }
    Boom.prototype = {
      _paint: function() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        ctx.fill();
        ctx.restore();
      },
      _move: function() {
        var dx = this.boomArea.x - this.x,
          dy = this.boomArea.y - this.y;
        this.x = this.x + dx * 0.01;
        this.y = this.y + dy * 0.01;

        if (Math.abs(dx) <= this.ba && Math.abs(dy) <= this.ba) {
          if (this.shape) {
            this._shapBoom();
          } else {
            this._boom();
          }
          this.dead = true;
        } else {
          this._paint();
        }
      },
      _drawLight: function() {
        ctx.save();
        ctx.fillStyle = 'rgba(255,228,150,0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      },
      _boom: function() {
        var fragNum = getRandom(100, 300);
        var style = getRandom(0, 10) >= 5 ? 1 : 2;
        var color;
        if (style === 1) {
          color = {
            a: parseInt(getRandom(240, 255), 10),
            b: parseInt(getRandom(128, 255), 10),
            c: parseInt(getRandom(0, 127), 10)
          }
        }

        var fanwei = fragNum;
        for (var i = 0; i < fragNum; i++) {
          if (style === 2) {
            color = {
              a: parseInt(getRandom(240, 255), 10),
              b: parseInt(getRandom(128, 255), 10),
              c: parseInt(getRandom(0, 127), 10)
            }
          }
          var a = getRandom(-Math.PI, Math.PI);
          var x = getRandom(0, fanwei) * Math.cos(a) + this.x;
          var y = getRandom(0, fanwei) * Math.sin(a) + this.y;
          var radius = getRandom(0, 2)
          var frag = new Frag(this.x, this.y, radius, color, x, y);
          this.booms.push(frag);
        }
      },
      _shapBoom: function() {
        var that = this;
        putValue(ocas, octx, this.shape, 5, function(dots) {
          var dx = canvas.width / 2 - that.x;
          var dy = canvas.height / 2 - that.y;
          for (var i = 0; i < dots.length; i++) {
            var color = {
              a: dots[i].a,
              b: dots[i].b,
              c: dots[i].c
            }
            var x = dots[i].x;
            var y = dots[i].y;
            var radius = 1;
            var frag = new Frag(that.x, that.y, radius, color, x - dx, y - dy);
            that.booms.push(frag);
          }
        })
      }
    }

    function initAnimate() {
      lastTime = new Date();
      animate();
    }

    function animate() {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 0.1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      var newTime = new Date();
      if (newTime - lastTime > 200 + (window.innerHeight - 767) / 2) {
        var x = getRandom(canvas.width / 5, canvas.width * 4 / 5);
        var y = getRandom(50, 200);
        var bigboom = new Boom(getRandom(canvas.width / 3, canvas.width * 2 / 3), 2, '#FFF', {
          x: x,
          y: y
        });
        bigbooms.push(bigboom);
        lastTime = newTime;
      }

      bigbooms.foreach(function() {
        var that = this;
        if (!this.dead) {
          this._move();
          this._drawLight();
        } else {
          this.booms.foreach(function(index) {
            if (!this.dead) {
              this.moveTo(index);
            } else if (index === that.booms.length - 1) {
              bigbooms.splice(bigbooms.indexOf(that), 1);
            }
          })
        }
      });

      raf(animate);
    }

    function putValue(canvas, context, ele, dr, callback) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      var img = new Image();
      if (ele.innerHTML.indexOf('img') >= 0) {
        img.src = ele.getElementsByTagName('img')[0].src;
        imgload(img, function() {
          context.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.width / 2);
          var dots = getimgData(canvas, context, dr);
          callback(dots);
        })
      } else {
        var text = ele.innerHTML;
        context.save();
        var fontSize = 200;
        context.font = fontSize + 'px 宋体 bold';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'rgba(' + parseInt(getRandom(128, 255), 10) + ',' + parseInt(getRandom(128, 255), 10) + ',' + parseInt(getRandom(128, 255), 10) + ' , 1)';
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        context.restore();
        var dots = getimgData(canvas, context, dr);
        callback(dots);
      }
    }
    function imgload(img, callback) {
      if (img.complete) {
        callback.call(img);
      } else {
        img.onload = function() {
          callback.call(this);
        }
      }
    }
    function getimgData(canvas, context, dr) {
      var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      context.clearRect(0, 0, canvas.width, canvas.height);
      var dots = [];
      for (var x = 0; x < imgData.width; x += dr) {
        for (var y = 0; y < imgData.height; y += dr) {
          var i = (y * imgData.width + x) * 4;
          if (imgData.data[i + 3] > 128) {
            var dot = {
              x: x,
              y: y,
              a: imgData.data[i],
              b: imgData.data[i + 1],
              c: imgData.data[i + 2]
            };
            dots.push(dot);
          }
        }
      }
      return dots;
    }
    function getRandom(a, b) {
      return Math.random() * (b - a) + a;
    }

    initAnimate()

  }
  render() {
    return (
      <div className={
        classNames({
          'fireworks': true,
          'fireworks-bye': this.state.unmount
        })
      } onTransitionEnd={() => {
        this.props.onEnd && this.props.onEnd()
      }}>
        <canvas id="fw-canvas" />
      </div>
      )
  }
}

export default Fireworks