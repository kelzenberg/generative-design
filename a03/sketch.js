const moverAmount = 20;
let movers = new Array(moverAmount).fill(null);
const attractors = [];
const gravity = 0.1;
const mu = 0.1;
const wind = 5;
const dragCoefficient = 1;
const gravitationalC = 50; // ~[1 - 50]

let fish;
let hotdog;
let room;

let font;
let fontSize = 144;
let vehicleSize = 20;
let vehicles;

// eslint-disable-next-line no-unused-vars
function preload() {
  font = loadFont('./font/Alice-Regular.ttf');
  fish = loadImage('./img/fish.svg');
  hotdog = loadImage('./img/hotdog.svg');
  room = loadImage('./img/room.jpg');
}

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(windowWidth, windowHeight);
  createFrameRate(windowWidth, windowHeight);

  // attractors.push(new Attractor(width / 2 - 100, height / 2, 1));
  // attractors.push(new Attractor(width / 2 + 100, height / 2, 3));
  // movers = movers.map(() => new Mover(random(50, cWidth), random(50, cHeight), random(10, 100)));

  const points = font.textToPoints('Nom', 0, 0, fontSize);
  const pointXs = points.map(pt => pt.x);
  const pointYs = points.map(pt => pt.y);
  const [fontWidth, fontHeight] = [
    Math.max(...pointXs) - Math.min(...pointXs),
    Math.max(...pointYs) - Math.min(...pointYs),
  ];
  vehicles = points.map(
    pt => new Vehicle(fish, pt.x + width / 2 - fontWidth / 2, pt.y + height / 2 + fontHeight / 2, vehicleSize)
  );
}

// eslint-disable-next-line no-unused-vars
function draw() {
  image(room, 0, 0);

  for (const vehicle of vehicles) {
    vehicle.applyBehaviors();
    vehicle.update();
    vehicle.show();
  }

  const liquidStart = height - height * 0.8;
  fill(25, 200, 255, 125);
  noStroke();
  rect(0, liquidStart, width, height - liquidStart);

  fill(200, 200);
  rect(0, 0, 25, height);
  rect(width - 25, 0, 25, height);
  rect(0, height - 25, width, 25);

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

  drawFrameRate();
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
