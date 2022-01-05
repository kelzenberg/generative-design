let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

const emitters = [];
let particleImage;
let angle = 0;
let mouseZ = 0;
let gravity;
let firework;

function conv2DLoc(x, y) {
  return { x: x - cWidth / 2, y: y - cHeight / 2 };
}

// eslint-disable-next-line no-unused-vars
function preload() {
  particleImage = loadImage('./img/particle.svg');
}

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight, WEBGL);
  createFrameRate(cWidth, cHeight);

  gravity = createVector(0, 0.2);
}

// eslint-disable-next-line no-unused-vars
function mousePressed() {
  const { x, y } = conv2DLoc(mouseX, mouseY);
  emitters.push(new Emitter(x, y, 100, particleImage));
}

// eslint-disable-next-line no-unused-vars
// function mouseWheel({ delta }) {
//   mouseZ += map(delta, 0, 1500, 0, 500);
// }

// eslint-disable-next-line no-unused-vars
function draw() {
  clear();
  background(0);
  drawFrameRate();

  // push();
  // rectMode(CENTER);
  // noStroke();
  // fill(255, 0, 0);
  // translate(mouseX - cWidth / 2, mouseY - cHeight / 2, mouseZ);
  // rotateX(angle);
  // rotateY(angle);
  // // rect(0, 0, 150, 150);
  // // box(200, 10, 100);
  // torus(100, 42);
  // pop();

  // angle += 0.05;

  // blendMode(ADD);

  if (random() < 0.03) {
    // 10% chance
    const { x, y } = conv2DLoc(random(0, cWidth), cHeight);
    const emitter = new Emitter(x, y, 20, particleImage);
    emitter.startEmitting(1);
    emitters.push(emitter);
  }

  // const mouseDir = map(mouseX, 0, cWidth, -0.1, 0.1);
  // const wind = createVector(mouseDir, 0);

  for (const emitter of emitters) {
    emitter.applyForce(gravity);
    // emitter.applyForce(wind);
    emitter.update();
    emitter.show();
  }

  for (let idx = 0; idx < emitters.length; idx++) {
    if (!emitters[idx].isFinished()) {
      // console.log(`Emitter ${idx} has finished`);
      // emitters.splice(idx, 1);
    }
  }
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
