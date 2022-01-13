let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

let vehicle;
let target;
let path;

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  vehicle = new Vehicle(50, cHeight / 2 - 100);
  target = new Target(cWidth / 2 - 30, cHeight / 2 - 30);
  path = new Path(0, cHeight / 2, cWidth, cHeight / 2);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  // target.x = mouseX;
  // target.y = mouseY;

  // const steering = pursuer.arrive(target);
  // pursuer.applyForce(steering);

  // const distance = p5.Vector.dist(pursuer, target);
  // if (distance < pursuer.size + target.size) {
  //   target = new Target(random(cWidth), random(cHeight));
  // }

  path.end.y = mouseY;

  const force = vehicle.follow(path);
  vehicle.applyForce(force);

  // vehicle.wander();
  vehicle.edges();
  vehicle.update();
  vehicle.show();

  path.show();

  // target.edges();
  // target.update();
  // target.show();
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
