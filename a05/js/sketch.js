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
  background(0);

  gravity = createVector(0, 0.2);
}

// eslint-disable-next-line no-unused-vars
function mousePressed() {
  const { x } = conv2DLoc(mouseX, mouseY);
  emitters.push(new Emitter(x, cHeight, 1, 100, particleImage));
}

// eslint-disable-next-line no-unused-vars
// function mouseWheel({ delta }) {
//   mouseZ += map(delta, 0, 1500, 0, 500);
// }

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  // ambientLight(255);

  if (random() < 0.03) {
    // 10% chance
    const { x, y } = conv2DLoc(random(0, cWidth), cHeight);
    const emitter = new Emitter(x, y, 1, 20, particleImage);
    emitters.push(emitter);
  }

  // const mouseDir = map(mouseX, 0, cWidth, -0.1, 0.1);
  // const wind = createVector(mouseDir, 0);

  for (let idx = emitters.length - 1; idx >= 0; idx--) {
    const emitter = emitters[idx];

    if (emitter.isFinished()) {
      emitters.splice(idx, 1);
      return;
    }

    emitter.applyForce(gravity);
    // emitter.applyForce(wind);
    emitter.update();
    emitter.show();
  }

  ambientMaterial(255);
  translate(-150, cHeight / 2, 100);
  const col = cWidth / 10;
  const row = 100;
  for (let z = row; z > -1000; z -= row) {
    for (let x = -cWidth / 2; x < cWidth; x += col) {
      const houseHeight = noise(x, z) * 300;

      push();
      translate(x, -houseHeight / 2, z);
      box(col - 30, houseHeight, row - 20);
      pop();
    }
  }
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
