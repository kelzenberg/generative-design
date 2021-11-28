const cWidth = 500; // canvas width
const cHeight = 500; // canvas height

let radius = 150;
let angle = 0;
let angleVelocity = 0.05;
let angleAcceleration = 0.001;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
  background(0);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0, 0, 0, 50);

  // angleAcceleration = map(mouseX, 0, width, -0.01, 0.01);
  // angleVelocity = constrain(angleVelocity, -0.2, 0.2);

  translate(cWidth / 2, cHeight / 2);

  strokeWeight(4);
  stroke(255);
  noFill();
  // circle(0, 0, radius * 2);

  // let increment = map(mouseX, 0, width, PI, 0.01);
  let increment = 0.1;

  beginShape();
  for (let a = 0; a < TWO_PI; a += increment) {
    let r1 = radius * noise(a) * 2;
    let x = cos(a) * r1;
    let y = sin(a) * r1;
    vertex(x, y);
  }
  endShape(CLOSE); // to close circle line

  strokeWeight(32);
  stroke(252, 238, 33);
  let x = cos(angle) * radius;
  let y = sin(angle) * radius;
  // point(x, y);

  angle += 0.05;
  // radius += random(-2, 2);

  drawFrameRate();
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
