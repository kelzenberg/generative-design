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

  vehicle.update();
  vehicle.show();
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
