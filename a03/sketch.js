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
let liquidStart;
let mouseClick = false;

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

  liquidStart = height - height * 0.8;

  const points = font.textToPoints('Hungry!', 0, 0, fontSize);
  const pointXs = points.map(pt => pt.x);
  const pointYs = points.map(pt => pt.y);
  const [fontWidth, fontHeight] = [
    Math.max(...pointXs) - Math.min(...pointXs),
    Math.max(...pointYs) - Math.min(...pointYs),
  ];

  vehicles = points.map(
    pt =>
      new Vehicle(
        fish,
        pt.x + width / 2 - fontWidth / 2,
        pt.y + height / 2 + fontHeight / 2,
        liquidStart,
        vehicleSize,
        random(10, 100)
      )
  );

  attractors.push(new Attractor(hotdog, 1));
}

function drawFishTank(liquidStart) {
  fill(25, 200, 255, 125);
  noStroke();
  rect(0, liquidStart, width, height - liquidStart);

  fill(200, 200);
  rect(0, 0, 25, height);
  rect(width - 25, 0, 25, height);
  rect(0, height - 25, width, 25);
}

function mouseClicked() {
  mouseClick = !mouseClick;
}

// eslint-disable-next-line no-unused-vars
function draw() {
  imageMode(CENTER);
  image(room, 0.5 * width, 0.5 * height, (room.width * height) / room.height, height);
  imageMode(CORNER);

  for (const vehicle of vehicles) {
    if (vehicle.position.y < liquidStart) {
      // keep vehicles below liquidStart
      let relGravity = p5.Vector.mult(createVector(0, gravity), vehicle.mass);
      vehicle.applyForce(relGravity);
      vehicle.drag(dragCoefficient);
    }

    vehicle.applyBehaviors();
    vehicle.update();
    vehicle.edges();
    vehicle.show();

    for (const attractor of attractors) {
      attractor.updatePosition(mouseX, mouseY);
      attractor.attract(gravitationalC, vehicle);

      if (mouseClick) {
        attractor.toggleFixedPosition();
        mouseClicked();
      }

      attractor.show();
    }
  }

  drawFishTank(liquidStart);
  drawFrameRate();
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
