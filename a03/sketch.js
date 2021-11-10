const cWidth = 500; // canvas width
const cHeight = 500; // canvas height

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background('blue');
  drawFrameRate();
}
