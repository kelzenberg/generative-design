let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

const emitters = [];
let particleImage;
let angle = 0;
let mouseZ = 0;

// eslint-disable-next-line no-unused-vars
function preload() {
  particleImage = loadImage('./img/particle.svg');
}

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight, WEBGL);
  createFrameRate(cWidth, cHeight);
}

// eslint-disable-next-line no-unused-vars
function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}

// eslint-disable-next-line no-unused-vars
function mouseWheel({ delta }) {
  mouseZ += map(delta, 0, 1500, 0, 500);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  clear();
  background(0);
  drawFrameRate();

  push();
  rectMode(CENTER);
  noStroke();
  fill(255, 0, 0);
  translate(mouseX - cWidth / 2, mouseY - cHeight / 2, mouseZ);
  rotateX(angle);
  rotateY(angle);
  // rect(0, 0, 150, 150);
  // box(200, 10, 100);
  torus(100, 42);
  pop();

  angle += 0.05;

  // blendMode(ADD);

  const force = createVector(0, -0.1);
  const mouseDir = map(mouseX, 0, cWidth, -0.1, 0.1);
  const wind = createVector(mouseDir, 0);

  for (const emitter of emitters) {
    emitter.applyForce(force);
    emitter.applyForce(wind);
    emitter.emit(1);
    emitter.update();
    emitter.show();
  }
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
