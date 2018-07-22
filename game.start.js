class Start {
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
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, ww, wh);

    // --------
    // 在這裡繪製

    ctx.save();
      ctx.translate(ww / 2, wh / 2); // 以中心點開始畫
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(0, 0, 220, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(0, 0, 320, 0, Math.PI * 2);
      ctx.stroke();

      // 電池 --------
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath(); // 最上面白色
      ctx.moveTo(-62 + 9.5, -100);
      ctx.lineTo(-27 - 9.5, -100);
      ctx.lineTo(-27 - 9.5, -95);
      ctx.lineTo(-62 + 9.5, -95);
      ctx.fill();

      ctx.fillStyle = '#F5AF5F';
      ctx.beginPath(); // 中間大面積黃色
      ctx.moveTo(-62, -95);
      ctx.lineTo(-27, -95);
      ctx.lineTo(-27, -44);
      ctx.lineTo(-62, -44);
      ctx.fill();

      ctx.fillStyle = '#F5AF5F';
      ctx.beginPath(); // 底下小面積黃色
      ctx.moveTo(-62, -40);
      ctx.lineTo(-27, -40);
      ctx.lineTo(-27, -35);
      ctx.lineTo(-62, -35);
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.beginPath(); // 閃電
      ctx.moveTo(-43, -87);
      ctx.lineTo(-55, -68);
      ctx.lineTo(-43, -68);
      ctx.lineTo(-45, -50);
      ctx.lineTo(-34, -74);
      ctx.lineTo(-46, -74);
      ctx.fill();

      // end 電池 --------

      // 按鈕
      // ctx.save();
      //   ctx.strokeStyle = '#fff';
      //   ctx.beginPath();
      //   ctx.moveTo(-40, 20);
      //   ctx.lineTo(40, 20);
      //   ctx.arc(40, 40, 20, Math.PI * 1.5, Math.PI * 2.5);
      //   ctx.lineTo(-40, 60);
      //   ctx.arc(-40, 40, 20, Math.PI * 0.5, Math.PI * 1.5);
      //   ctx.stroke();
      // ctx.restore();

      ctx.font = '25px Arial';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('Radio Defense', 0, 0);
      
      ctx.font = '110px Arial';
      ctx.fillText('R', 20, -35);
    ctx.restore();

    ctx.save();
      ctx.scale(1.4, 1.4);
      ctx.fillStyle = '#E7465D';
      ctx.beginPath(); // 六邊形
      ctx.moveTo(42, 95);
      ctx.lineTo(70, 85);
      ctx.lineTo(95, 93);
      ctx.lineTo(98, 109);
      ctx.lineTo(89, 130);
      ctx.lineTo(60, 125);
      ctx.fill();
    ctx.restore();

    ctx.save();
      ctx.translate(ww, 0); // 以右上角開始畫
      ctx.fillStyle = '#F5AF5F';
      ctx.beginPath(); // 圓形
      ctx.arc(-150, 80, 40, 0, Math.PI * 2);
      ctx.fill();
    ctx.restore();

    ctx.save();
      ctx.translate(ww, wh); // 以右下角開始畫
      ctx.translate(-100, -150);
      ctx.fillStyle = '#3676BB';
      ctx.beginPath(); // 正三角形
      ctx.rotate(Math.PI * 0.1);

      let distance = 40;
      let pointCount = 3;

      ctx.moveTo(distance, distance);
      for (let i = 0; i < pointCount - 1; i += 1) {
        ctx.rotate(Math.PI * 2 / pointCount);
        ctx.lineTo(distance, distance);
      }

      ctx.fill();
    ctx.restore();

    ctx.save();
      ctx.translate(0, wh); // 以左下角開始畫
      ctx.fillStyle = '#fff';
      ctx.font = '20px 微軟正黑體';
      ctx.fillText('你身負著運送能量電池的任務', 20, -100);
      ctx.fillText('卻遭到幾何星人的埋伏', 20, -70);
      ctx.fillText('請協助從他們的手中奪回能量電池', 20, -40);
    ctx.restore();
    // ----

    // 滑鼠
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.circle(mousePos, 3);
    ctx.fill();

    ctx.save();
      ctx.translate(mousePos.x, mousePos.y);
      ctx.strokeStyle = '#ff0000';
      ctx.beginPath();
      let len = 20;
      ctx.line(new Vec2(-len, 0), new Vec2(len, 0));
      ctx.fillText(mousePos, 10, -10);
      ctx.rotate(Math.PI / 2);
      ctx.line(new Vec2(-len, 0), new Vec2(len, 0));
      ctx.stroke();
    ctx.restore();

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
