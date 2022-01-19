let f; // textFont
let cWidth = 500; // canvas width
let cHeight = 500; // canvas height
let showHelp = false;
console.log('Show the help by pressing "h" on your keyboard or by setting "showHelp = true" in the console.');

let rover;
let aquarium;
const flock = [];
let shark;
let sharkTarget;

function convertTo3D(w, h, d) {
  return (x, y, z) => ({ x: x - w / 2, y: y - h / 2, z: z - d / 2 });
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
  const convertPosition = convertTo3D(aquarium.width, aquarium.height, aquarium.depth);

  for (let idx = 0; idx < 100; idx++) {
    const { x, z } = convertPosition(
      random(aquarium.width - 30),
      random(aquarium.height - 30),
      random(aquarium.depth - 30)
    );
    flock.push(new Boid(x, random(-30, 40), z));
  }

  shark = new Boid(0, 0, 0, color(20));
  sharkTarget = flock[floor(random(0, flock.length))];
}

// eslint-disable-next-line no-unused-vars
function keyPressed() {
  if (key == 'h') showHelp = !showHelp;
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(215);
  ambientLight(255, 255, 255);

  if (showHelp) {
    rover.drawHelp();
  }

  const aquariumDimensions = aquarium.getDimensions();

  // debug:
  /* aquariumDimensions.map(([min, max], idx) => {
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
  }); */

  if (second() % 30 === 0) {
    console.log('change target');
    sharkTarget = flock[floor(random(0, flock.length))];
  }
  shark.pursue(sharkTarget);
  shark.avoidWalls(aquariumDimensions);
  shark.update();
  shark.show();

  for (const boid of flock) {
    boid.avoidBoid(shark);
    boid.flockWith(flock);
    boid.avoidWalls(aquariumDimensions);
    boid.resetPosition(aquarium.width, aquarium.height, aquarium.depth);
    boid.update();
    boid.show();
  }

  aquarium.show();
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
