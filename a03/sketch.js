const cWidth = 600; // canvas width
const cHeight = 600; // canvas height

const movers = [];
const attractors = [];
const gravity = 0.1;
const wind = 0.1;
const mu = 0.1;
const coefficient = 0.4;
const gravitationalC = 50; // ~[1 - 50]

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  attractors.push(new Attractor(width / 2, height / 2, 5));
  movers.push(new Mover(300, 100, 10));
  movers.push(new Mover(150, 100, 20));
  movers.push(new Mover(450, 100, 50));
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0, 15);
  drawFrameRate();

  // const liquidStart = height / 2;
  // fill(25, 200, 255, 75);
  // noStroke();
  // rect(0, liquidStart, width, height / 2);

  for (const mover of movers) {
    let relGravity = p5.Vector.mult(createVector(0, gravity), mover.mass);
    // mover.applyForce(relGravity);

    if (mouseIsPressed) {
      mover.applyForce(createVector(wind, 0));
    }

    // if (mover.position.y > liquidStart) {
    //   mover.drag(coefficient);
    // }

    mover.friction(mu);
    mover.update();
    mover.edges();
    mover.show();

    for (const attractor of attractors) {
      attractor.attract(gravitationalC, mover);
      attractor.show();
    }
  }
}
