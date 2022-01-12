let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

let vehicle;

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  vehicle = new Vehicle(cWidth / 2, cHeight / 2);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  fill(255, 0, 0);
  noStroke();
  const target = createVector(mouseX, mouseY);
  circle(target.x, target.y, 32);

  const steering = vehicle.flee(target);

  vehicle.applyForce(steering);
  vehicle.update();
  vehicle.show();
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
