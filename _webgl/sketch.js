let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

let angle = 0;

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight, WEBGL);
  createFrameRate(cWidth, cHeight);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(150);
  drawFrameRate();

  push();
  rectMode(CENTER);
  rotateX(angle);
  rotateY(angle);

  noStroke();
  fill(255, 0, 0);
  rect(0, 0, 150, 150);
  pop();

  angle += 0.05;
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
