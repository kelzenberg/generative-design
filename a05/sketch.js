const cWidth = 350; // canvas width
const cHeight = 350; // canvas height

let emitters = [];

// eslint-disable-next-line no-unused-vars
function setup() {
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

  for (const emitter of emitters) {
    emitter.emit(2);
    emitter.update();
    emitter.show();
  }
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
