const cWidth = 500; // canvas width
const cHeight = 500; // canvas height

let particles = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  for (let idx = 0; idx < 1; idx++) {
    particles.push(new Particle(cWidth / 2, 20));
  }

  const gravity = createVector(0, 0.2);
  for (const particle of particles) {
    particle.applyForce(gravity);
    particle.update();
    particle.avoidEdges();
    particle.show();
  }

  for (let idx = particles.length - 1; idx >= 0; idx--) {
    if (particles[idx].isFinished()) {
      particles.splice(idx, 1);
    }
  }
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
