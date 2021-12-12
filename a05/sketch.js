let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

let emitters = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
}

// eslint-disable-next-line no-unused-vars
function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  const force = createVector(0, -0.1);
  const mouseDir = map(mouseX, 0, cWidth, -0.1, 0.1);
  const wind = createVector(mouseDir, 0);

  for (const emitter of emitters) {
    emitter.applyForce(force);
    emitter.applyForce(wind);
    emitter.emit(1);
    emitter.update();
    emitter.show();
  }
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
