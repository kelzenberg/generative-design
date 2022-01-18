let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

const flock = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight, WEBGL);
  createFrameRate(cWidth, cHeight);

  for (let idx = 0; idx < 100; idx++) {
    flock.push(new Boid(random(cWidth), random(cHeight)));
  }
}

let angle = 0;

// eslint-disable-next-line no-unused-vars
function draw() {
  background('blue');
  drawFrameRate();

  push();
  rectMode(CENTER);
  noStroke();
  fill(255, 0, 0);
  rotateX(angle);
  rotateY(angle);
  rect(0, 0, 150, 150);
  pop();

  angle += 0.05;

  for (const boid of flock) {
    boid.flockWith(flock);
    // boid.teleportEdges();
    boid.update();
    boid.show();
  }
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
