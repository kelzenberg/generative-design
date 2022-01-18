let f; // textFont
let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

const flock = [];

// eslint-disable-next-line no-unused-vars
function preload() {
  f = loadFont('../font/RobotoMono-Regular.ttf');
}

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight, WEBGL);
  createRover();

  for (let idx = 0; idx < 100; idx++) {
    flock.push(new Boid(random(cWidth), random(cHeight)));
  }
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background('blue');
  drawHelp();

  push();
  noStroke();
  fill(255, 0, 0);
  rect(0, 0, 150, 150);
  normalMaterial();
  sphere(25);
  pop();

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
