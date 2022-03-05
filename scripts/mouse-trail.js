const canvas_m = document.getElementById('canvas');
const ctx_m = canvas_m.getContext('2d');
canvas_m.width = window.innerWidth;
canvas_m.height = window.innerHeight;
let spots = [];
let hue = 0;

const mouse_m = {
  x: undefined,
  y: undefined
}
canvas_m.addEventListener('mousemove', function (event) {
  mouse_m.x = event.x;
  mouse_m.y = event.y;
  for (let i = 0; i < 3; i++) {
    spots.push(new Particle());
  }
});
class Particle {
  constructor() {
    this.x = mouse_m.x;
    this.y = mouse_m.y;
    this.size = Math.random() * 2 + 0.1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    // this.color = 'hsl(' + hue + ', 100%, 50%)';
    this.color = 'hsl(' + hue + ', 0%, 100%)';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) this.size -= 0.03;
  }
  draw() {
    ctx_m.fillStyle = this.color;
    ctx_m.beginPath();
    ctx_m.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx_m.fill();
  }
}
function handleParticle() {
  for (let i = 0; i < spots.length; i++) {
    spots[i].update();
    spots[i].draw();
    for (let j = i; j < spots.length; j++) {
      const dx = spots[i].x - spots[j].x;
      const dy = spots[i].y - spots[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 90) {
        ctx_m.beginPath();
        ctx_m.strokeStyle = spots[i].color;
        ctx_m.lineWidth = spots[i].size / 10;
        ctx_m.moveTo(spots[i].x, spots[i].y);
        ctx_m.lineTo(spots[j].x, spots[j].y);
        ctx_m.stroke();
      }
    }
    if (spots[i].size <= 0.3) {
      spots.splice(i, 1); i--;
    }
  }
}
function animate() {
  ctx_m.clearRect(0, 0, canvas_m.width, canvas_m.height);
  handleParticle();
  hue++;
  requestAnimationFrame(animate);
}
window.addEventListener('resize', function () {
  canvas_m.width = innerWidth;
  canvas_m.height = innerHeight;
  init();
})
window.addEventListener('mouseout', function () {
  mouse_m.x = undefined;
  mouse_m.y = undefined;
})
animate()
