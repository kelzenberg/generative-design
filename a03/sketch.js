const cWidth = 600; // canvas width
const cHeight = 600; // canvas height

const moverAmount = 20;
let movers = new Array(moverAmount).fill(null);
const attractors = [];
const gravity = 0.1;
const mu = 0.1;
const wind = 5;
const dragCoefficient = 1;
const gravitationalC = 50; // ~[1 - 50]

let font;
let points;
let vehicles;

// eslint-disable-next-line no-unused-vars
function preload() {
  font = loadFont('./font/Alice-Regular.ttf');
}

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);

  // attractors.push(new Attractor(width / 2 - 100, height / 2, 1));
  // attractors.push(new Attractor(width / 2 + 100, height / 2, 3));
  // movers = movers.map(() => new Mover(random(50, cWidth), random(50, cHeight), random(10, 100)));

  points = font.textToPoints('Code runs!', 50, height / 2, 100);
  vehicles = points.map(pt => new Vehicle(pt.x, pt.y));
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  drawFrameRate();

  // const liquidStart = height - height * 0.2;
  // fill(25, 200, 255, 20);
  // noStroke();
  // rect(0, liquidStart, width, height * 0.2);

  // for (const mover of movers) {
  //   // let relGravity = p5.Vector.mult(createVector(0, gravity), mover.mass);
  //   // mover.applyForce(relGravity);

  //   if (mouseIsPressed) {
  //     mover.applyForce(createVector(wind, 0));
  //   }

  //   // if (mover.position.y > liquidStart) {
  //   //   mover.drag(dragCoefficient);
  //   // }

  //   mover.friction(mu);
  //   mover.update();
  //   mover.edges();
  //   mover.show();

  //   for (const attractor of attractors) {
  //     attractor.attract(gravitationalC, mover);
  //     attractor.show();
  //   }
  // }

  for (const vehicle of vehicles) {
    vehicle.applyBehaviors();
    vehicle.update();
    vehicle.show();
  }
}
