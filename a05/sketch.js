const cWidth = 350; // canvas width
const cHeight = 350; // canvas height

// let particles = [];
let emitter;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  emitter = new Emitter(cWidth / 2, 20);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  emitter.emit(2);
  emitter.update();
  emitter.show();

  // for (let idx = 0; idx < 1; idx++) {
  //   particles.push(new Particle(createVector(cWidth / 2, 20)));
  // }

  // const gravity = createVector(0, 0.2);
  // for (const particle of particles) {
  //   particle.applyForce(gravity);
  //   particle.update();
  //   particle.avoidEdges();
  //   particle.show();
  // }

  // for (let idx = particles.length - 1; idx >= 0; idx--) {
  //   if (particles[idx].isFinished()) {
  //     particles.splice(idx, 1);
  //   }
  // }
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
