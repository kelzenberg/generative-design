const cWidth = 600; // canvas width
const cHeight = 600; // canvas height

const movers = [];
const gravity = 0.1;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  movers.push(new Mover(400, 200, 2));
  movers.push(new Mover(200, 200, 6));
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  let wind = createVector(0.1, 0);

  movers.map(mover => {
    let relGravity = p5.Vector.mult(createVector(0, gravity), mover.mass);
    mover.applyForce(relGravity);

    if (mouseIsPressed) {
      mover.applyForce(wind);
    }

    mover.update();
    mover.edges();
    mover.show();
  });
}
