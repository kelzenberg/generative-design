const cWidth = 600; // canvas width
const cHeight = 600; // canvas height

const movers = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  movers.push(new Mover(400, 200));
  movers.push(new Mover(200, 200));
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  let gravity = createVector(0, 0.1);
  let wind = createVector(0.1, 0);

  movers.map(mover => {
    mover.applyForce(gravity);

    if (mouseIsPressed) {
      mover.applyForce(wind);
    }

    mover.update();
    mover.edges();
    mover.show();
  });
}
