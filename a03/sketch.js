const cWidth = 600; // canvas width
const cHeight = 600; // canvas height

const movers = [];
const gravity = 0.1;
const wind = 0.1;
const mu = 0.1;
const coefficient = 0.4;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  movers.push(new Mover(300, 100, 2));
  movers.push(new Mover(150, 100, 6));
  movers.push(new Mover(450, 100, 24));
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  const liquidStart = height / 2;
  fill(25, 200, 255, 75);
  noStroke();
  rect(0, liquidStart, width, height / 2);

  for (const mover of movers) {
    let relGravity = p5.Vector.mult(createVector(0, gravity), mover.mass);
    mover.applyForce(relGravity);

    if (mouseIsPressed) {
      mover.applyForce(createVector(wind, 0));
    }

    if (mover.position.y > liquidStart) {
      mover.drag(coefficient);
    }

    mover.friction(mu);
    mover.update();
    mover.edges();
    mover.show();
  }
}
