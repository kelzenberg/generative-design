let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

let pursuer;
let target;

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  pursuer = new Vehicle(cWidth / 2, cHeight / 2);
  target = new Target(cWidth / 2 - 30, cHeight / 2 - 30);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  const steering = pursuer.pursue(target);
  pursuer.applyForce(steering);

  const distance = p5.Vector.dist(pursuer, target);
  if (distance < pursuer.size + target.size) {
    target = new Target(random(cWidth), random(cHeight));
  }

  pursuer.edges();
  pursuer.update();
  pursuer.show();

  target.edges();
  target.update();
  target.show();
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
