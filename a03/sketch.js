const cWidth = 500; // canvas width
const cHeight = 500; // canvas height

let mover;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  mover = new Mover(200, 200);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  let gravity = createVector(0, 1);
  mover.applyForce(gravity);
  mover.update();
  mover.show();
}
