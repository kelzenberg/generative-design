const cWidth = 500; // canvas width
const cHeight = 500; // canvas height

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
}

let angle = 0;
let angleVelocity = 0.05;
let angleAcceleration = 0.001;

// eslint-disable-next-line no-unused-vars
function draw() {
  background('blue');

  angleAcceleration = map(mouseX, 0, width, -0.01, 0.01);
  angleVelocity = constrain(angleVelocity, -0.2, 0.2);

  noStroke();
  fill(255, 255, 0);
  rectMode(CENTER);
  translate(cWidth / 2, cHeight / 2);
  rotate(angle);
  rect(0, 0, 200, 50);

  angle += angleVelocity;
  angleVelocity += angleAcceleration;

  drawFrameRate();
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
