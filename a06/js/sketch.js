let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

const flock = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  for (let idx = 0; idx < 100; idx++) {
    flock.push(new Boid(random(cWidth), random(cHeight)));
  }
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  for (const boid of flock) {
    boid.flockWith(flock);
    boid.teleportEdges();
    boid.update();
    boid.show();
  }
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
