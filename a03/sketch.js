const cWidth = 600; // canvas width
const cHeight = 600; // canvas height

const movers = [];
const gravity = 0.1;
const wind = 0.1;
const mu = 0.1;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  movers.push(new Mover(400, 200, 2));
  movers.push(new Mover(200, 200, 6));
  movers.push(new Mover(500, 200, 24));
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  for (const mover of movers) {
    let relGravity = p5.Vector.mult(createVector(0, gravity), mover.mass);
    mover.applyForce(relGravity);

    if (mouseIsPressed) {
      mover.applyForce(createVector(wind, 0));
    }

    mover.friction(mu);
    mover.update();
    mover.edges();
    mover.show();
  }
}
