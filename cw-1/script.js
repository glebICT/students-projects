
const field = document.getElementById('field');
const scoreEl = document.getElementById('score');
const missedEl = document.getElementById('missed');

const MAX_RADIUS = 10;
const SHRINK_TIME = Number(window.innerWidth) * 2.25;
const PAUSE = 300;

let score = 0;
let missed = 0;

function spawnCircle() {
  const circle = document.createElement('img');

  circle.src = 'img/tilin-gzdoom.gif';
  circle.className = 'circle';

  const radius = MAX_RADIUS;
  const top = 50 + radius;

  const x = radius + Math.random() *
    Math.max(0, window.innerWidth - 2 * radius);

  const y = top + Math.random() *
    Math.max(0, window.innerHeight - top - radius);

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.width = `${radius * 0.02}vh`;
  circle.style.height = `${radius * 0.02}vw`;

  field.appendChild(circle);

  const start = performance.now();
  let done = false;

  function finish(hit) {
    if (done) return;
    done = true;

    circle.remove();

    if (hit) {
      score++;
      scoreEl.textContent = score;
    } else {
      missed++;
      missedEl.textContent = missed;
    }

    setTimeout(spawnCircle, PAUSE);
  }

  circle.addEventListener('pointerdown', () => finish(true));

  function frame(now) {
    if (done) return;

    const progress = (now - start) / SHRINK_TIME;
    const currentSize = MAX_RADIUS * 2 * (1 - progress);

    if (currentSize <= 0) {
      finish(false);
      return;
    }

    circle.style.width = `${currentSize}vh`;
    circle.style.height = `${currentSize}vw`;

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

spawnCircle();
