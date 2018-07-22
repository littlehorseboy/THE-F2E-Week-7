let ww;
let wh;
const canvas = document.querySelector('#mycanvas');
const ctx = canvas.getContext('2d');

ctx.circle = function (v, r) {
  this.arc(v.x, v.y, r, 0, Math.PI * 2);
};

ctx.line = function (v1, v2) {
  this.moveTo(v1.x, v1.y);
  this.lineTo(v2.x, v2.y);
};

// canvas 設定
const initCanvas = () => {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;
};

// 縮放 事件
window.addEventListener('resize', initCanvas);

// 頁面載入 (結果場景控制都亂寫在這裡面)
const loaded = () => {
  initCanvas();
  const start = new Start();
  start.init();
  start.draw();
  start.startInterval();

  // // 測試用 待刪除 其他註解需還原
  // const main = new Main();
  // main.init();
  // main.draw();
  // main.startInterval();
  // const startBtn = document.querySelector('#startBtn');
  // startBtn.remove();

  const startBtn = document.querySelector('#startBtn');
  const startGame = startBtn.addEventListener('click', (evt) => {
    evt.target.removeEventListener(evt.type, startGame);
    startBtn.style.pointerEvents = 'none';

    if (ctx.globalAlpha > 0) {
      const sceneChange = setInterval(() => {
        ctx.globalAlpha -= 0.01;
        if (ctx.globalAlpha <= 0.01) {
          clearInterval(sceneChange);
          ctx.globalAlpha = 1;
          nextScent();
        }
      }, 10);
    }

    const nextScent = () => {
      evt.target.remove();
      start.cancelAnimationFrame();
      start.clearInterval();

      const main = new Main();
      main.init();
      main.draw();
      main.startInterval();
    }
  });
};

// 載入 事件
window.addEventListener('load', loaded);


// 滑鼠事件紀錄
const mousePos = new Vec2(0, 0);
let mousePosDown = new Vec2(0, 0);
let mousePosUp = new Vec2(0, 0);

const mousemove = (evt) => {
  mousePos.set(evt.x, evt.y);
  console.log(mousePos);
};
const mouseup = (evt) => {
  mousePos.set(evt.x, evt.y);
  mousePosUp = mousePos.clone();
};
const mousedown = (evt) => {
  mousePos.set(evt.x, evt.y);
  mousePosDown = mousePos.clone();
};

window.addEventListener('mousemove', mousemove);
window.addEventListener('mouseup', mouseup);
window.addEventListener('mousedown', mousedown);
