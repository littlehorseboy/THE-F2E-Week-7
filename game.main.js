class Ball {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.vx = 5;
    this.vy = 5;
    this.radius = 25;
    this.color = '#fff';
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const balls = [];

class Main {
  constructor() {
    this.animationFrame = null;
    this.interval = null;

    this.showMouse = true;
    this.time = 0;

    this.controls = {
      value: 0,
    };

    this.gui = new dat.GUI();
    this.gui.add(this.controls, 'value', -2, 2).step(0.01).onChange();

    this.degToPI = Math.PI / 180;

    this.ship = {
      x: 0,
      y: 0,
      r: 60,
      deg: 0,
    };
  }

  // #region 常數定義
  get updateFPS() {
    return 30;
  }
  get bgColor() {
    return '#001D2E';
  }
  // #endregion 常數定義

  init() {

  }

  draw() {
    ctx.clearRect(0, 0, ww, wh);
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, ww, wh);

    // --------
    // 在這裡繪製

    // 船
    ctx.save();
      ctx.translate(ww / 2, wh / 2); // 以中心點開始畫

      let delta = mousePos.sub(new Vec2(ww / 2, wh / 2));
      this.ship.deg = delta.angle;
      ctx.rotate(this.ship.deg);

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 12;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#fff';
      ctx.beginPath();
      ctx.arc(0, 0, this.ship.r, 0, Math.PI * 2);
      ctx.stroke();

      // 中間三條線
      ctx.save();
        ctx.lineWidth = 5;
        ctx.rotate(Math.PI * 2 / 4 * 3);

        let lineCount = 3;

        for (let i = 0; i < lineCount; i += 1) {
          ctx.rotate(Math.PI * 2 / lineCount);
          ctx.moveTo(0, 0);
          ctx.lineTo(0, this.ship.r);
        }

        ctx.rotate(Math.PI * 2 / lineCount);
      ctx.restore();

      // 炮口
      ctx.rotate(Math.PI * 2 / 4 * 3);
      ctx.fillStyle = '#fff';
      ctx.fillRect(-25 / 2, this.ship.r + 20, 25, 25);

      ctx.stroke();

      ctx.rotate(Math.PI * 2 / 4 * 1);

      var ball = new Ball();
      ball.draw();
      
      balls.push(ball);
      balls.forEach((ball) => {
        ball.x += ball.vx;
        ball.y += ball.vy;
      });
      // setInterval(() => {
        
      // }, 200);
      
    ctx.restore();
    // ----

    // 滑鼠
    // ctx.fillStyle = '#ff0000';
    // ctx.beginPath();
    // ctx.circle(mousePos, 3);
    // ctx.fill();

    // ctx.save();
    //   ctx.translate(mousePos.x, mousePos.y);
    //   ctx.beginPath();
    //   ctx.strokeStyle = '#ff0000';
    //   let len = 20;
    //   ctx.line(new Vec2(-len, 0), new Vec2(len, 0));
    //   ctx.fillText(mousePos, 10, -10);
    //   ctx.rotate(Math.PI / 2);
    //   ctx.line(new Vec2(-len, 0), new Vec2(len, 0));
    //   ctx.stroke();
    // ctx.restore();

    this.animationFrame = requestAnimationFrame(this.draw.bind(this));
  }

  update() {
    // time += 1;
  }

  cancelAnimationFrame() {
    this.gui.destroy();
    cancelAnimationFrame(this.animationFrame);
  }

  startInterval() {
    this.interval = setInterval(this.update, 1000 / this.updateFPS);
  }

  clearInterval() {
    clearInterval(this.interval);
  }
}
