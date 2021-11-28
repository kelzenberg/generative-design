const cWidth = 500; // canvas width
const cHeight = 500; // canvas height

let radius = 4;
let angles = [];
let angleVelocities = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
  background(0);

  let frequency = TWO_PI * 2;
  let total = floor(width / (radius * 2));
  for (let idx = 0; idx < total + 1; idx++) {
    angles[idx] = map(idx, 0, total, 0, frequency);
    // angleVelocities[idx] = random(-0.1, 0.1);
    angleVelocities[idx] = idx / 100;
  }
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0, 0, 0);
  drawFrameRate();

  translate(cWidth / 2, cHeight / 2);

  beginShape();
  for (let idx = 0; idx < angles.length; idx += 1) {
    let y = map(sin(angles[idx]), -1, 1, -cHeight / 2 + radius, cHeight / 2 - radius);
    let x = map(idx, 0, angles.length, -cWidth / 2 + radius, cWidth / 2 + radius);

    // line(x, 0, x, y);

    fill('yellow');
    circle(x, y, radius * 2);

    // noFill();
    // stroke('yellow');
    // strokeWeight(4);
    // vertex(x, y);

    angles[idx] += 0.02;
    // angles[idx] += angleVelocities[idx];
  }
  endShape();
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
