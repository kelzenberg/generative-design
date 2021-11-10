const cWidth = 600; // canvas width
const cHeight = 600; // canvas height

const moverAmount = 20;
let movers = new Array(moverAmount).fill(null);
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
  movers = movers.map(() => new Mover(random(50, cWidth), random(50, cHeight), random(10, 100)));
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0, 10);
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
