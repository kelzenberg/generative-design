let f; // textFont
let cWidth = 500; // canvas width
let cHeight = 500; // canvas height
let showHelp = false;
console.log('Show the help by pressing "h" on your keyboard or by setting "showHelp = true" in the console.');

let rover;
let aquarium;
const flock = [];
let shark;

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

  for (let idx = 0; idx < 50; idx++) {
    const { x, y } = convert(random(aquarium.width), random(aquarium.height));
    flock.push(new Boid(x, y, random(-aquarium.depth / 2, aquarium.depth / 2)));
  }

  shark = new Boid(0, 0, 0, color(20));
  boid = new Boid(10, 0, -10);
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

  shark.avoidWalls(aquariumDimensions);
  // shark.bounceWalls(aquariumDimensions);
  shark.update();
  shark.show();
  // boid.evade(shark);
  boid.avoidWalls(aquariumDimensions);
  // boid.bounceWalls(aquariumDimensions);
  boid.update();
  boid.show();

  // for (const boid of flock) {
  //   // boid.flockWith(flock);
  //   boid.evade(shark);
  //   boid.avoidWalls(aquariumDimensions);
  //   boid.bounceWalls(aquariumDimensions);
  //   boid.update();
  //   boid.show();
  // }

  aquarium.show();
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
