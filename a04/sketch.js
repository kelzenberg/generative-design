const cWidth = 500; // canvas width
const cHeight = 500; // canvas height

let radius = 150;
let angle = 0;
let angleVelocity = 0;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
  background(0);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0, 0, 0);
  drawFrameRate();

  translate(cWidth / 2, cHeight / 2);

  radius = map(sin(angle), -1, 1, 0, cWidth / 2); // cWidth/2 is sine-amplitude / 2
  let y = map(sin(angle), -1, 1, -cWidth / 2, cWidth / 2);
  line(0, 0, 0, y);
  stroke('white');
  fill(252, 238, 33);
  circle(0, y, 32);

  // let increment = TWO_PI / 60; // aka 60 fps
  // angle += increment;
  angle += angleVelocity;

  angleVelocity += 0.0001;
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
