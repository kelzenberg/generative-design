let f; // textFont
let cWidth = 500; // canvas width
let cHeight = 500; // canvas height
let showHelp = false;
console.log('Show the help by pressing "h" on your keyboard or by setting "showHelp = true" in the console.');

let rover;
let aquarium;
const flock = [];
let boid;

function convert2Dto3D(w, h) {
  return (x, y) => ({ x: x - w / 2, y: y - h / 2 });
}

// eslint-disable-next-line no-unused-vars
function preload() {
  f = loadFont('../font/RobotoMono-Regular.ttf');
}

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight, WEBGL);
  textFont(f);

  rover = new Rover();

  aquarium = new Aquarium();
  const convert = convert2Dto3D(aquarium.width, aquarium.height);

  for (let idx = 0; idx < 2; idx++) {
    const { x, y } = convert(random(aquarium.width), random(aquarium.height));
    flock.push(new Boid(x, y, random(-aquarium.depth / 2, aquarium.depth / 2)));
  }
}

// eslint-disable-next-line no-unused-vars
function keyPressed() {
  if (key == 'h') showHelp = !showHelp;
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(215);

  if (showHelp) {
    rover.drawHelp();
  }

  ambientLight(255, 255, 255);

  // push();
  // noStroke();
  // fill(255, 0, 0);
  // rect(0, 0, 150, 150);
  // normalMaterial();
  // sphere(25);
  // pop();

  const ranges = aquarium.getDimensions();
  ranges.map(([min, max], idx) => {
    push();
    normalMaterial();
    translate(idx == 0 ? min : 0, idx == 1 ? min : 0, idx == 2 ? min : 0);
    sphere(1);
    pop();

    push();
    normalMaterial();
    translate(idx == 0 ? max : 0, idx == 1 ? max : 0, idx == 2 ? max : 0);
    sphere(1);
    pop();
  });

  for (const boid of flock) {
    boid.flockWith(flock);
    // boid.bounceEdges();
    boid.update();
    boid.show();
  }

  aquarium.show();
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
