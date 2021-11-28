const cWidth = 500; // canvas width
const cHeight = 500; // canvas height

let radius = 16;
let angles = [];
let angleVelocities = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
  background(0);

  let total = floor(width / (radius * 2));
  for (let idx = 0; idx < total; idx++) {
    angles[idx] = 0;
    // angleVelocities[idx] = random(-0.1, 0.1);
    angleVelocities[idx] = idx / 100;
  }
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0, 0, 0);
  drawFrameRate();

  translate(cWidth / 2, cHeight / 2);

  for (let idx = 0; idx < angles.length; idx += 1) {
    let y = map(sin(angles[idx]), -1, 1, -cHeight / 2 + radius, cHeight / 2 - radius);
    let x = map(idx, 0, angles.length, -cWidth / 2 + radius, cWidth / 2 + radius);

    line(x, 0, x, y);

    stroke('white');
    fill(252, 238, 33);
    circle(x, y, 32);

    angles[idx] += angleVelocities[idx];
    angleVelocities[idx] += 0.00001;
  }
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
