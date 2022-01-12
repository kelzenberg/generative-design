let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background('blue');
  drawFrameRate();

  rectMode(CENTER);
  fill(255, 0, 0);
  rect(cWidth / 2, cHeight / 2, 150, 150);
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
