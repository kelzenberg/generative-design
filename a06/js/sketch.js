let f; // textFont
let cWidth = 500; // canvas width
let cHeight = 500; // canvas height
let showHelp = false;
console.log('Show the help by pressing "h" on your keyboard or by setting "showHelp = true" in the console.');

let rover;
let cam;
let aquarium;
const flock = [];

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
  cam = rover.getCam();

  aquarium = new Aquarium();

  for (let idx = 0; idx < 100; idx++) {
    flock.push(new Boid(random(cWidth), random(cHeight)));
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

  push();
  noStroke();
  fill(255, 0, 0);
  rect(0, 0, 150, 150);
  normalMaterial();
  sphere(25);
  pop();

  aquarium.show();

  for (const boid of flock) {
    boid.flockWith(flock);
    // boid.teleportEdges();
    boid.update();
    boid.show();
  }
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
