const gravity = 0.1;
const dragCoefficient = 1;

let fish;
let hotdog;
let room;
let plant1;
let plant2;
let liquidStart;
let mouseClick = false;

let font;
let fontSize = 164;
let vehicleSize = 20;
let vehicles;
let attractor;
let availableObjects;
let waterObjects = [];
let waterObjectAmount = 10;

// eslint-disable-next-line no-unused-vars
function preload() {
  font = loadFont('./font/Alice-Regular.ttf');
  fish = loadImage('./img/fish.svg');
  hotdog = loadImage('./img/hotdog.svg');
  room = loadImage('./img/room.jpg');
  plant1 = loadImage('./img/water-plant-1.svg');
  plant2 = loadImage('./img/water-plant-2.svg');
  boulder = loadImage('./img/boulder.svg');
  availableObjects = [plant1, plant2, boulder];
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

  for (let idx = 0; idx < waterObjectAmount; idx++) {
    const randomObject = availableObjects[random(0, availableObjects.length - 1).toFixed()];

    waterObjects.push({
      image: randomObject,
      xPos: random(150, width - 150),
      height: random(20, randomObject.height),
    });
  }

  setTimeout(() => {
    // create first attractor after vehicles had time to position
    attractor = new Attractor(hotdog, 2);
  }, 7000);
}

// eslint-disable-next-line no-unused-vars
function mouseClicked() {
  mouseClick = !mouseClick;
}

// eslint-disable-next-line no-unused-vars
function draw() {
  imageMode(CENTER);
  image(room, width / 2, height / 2, ((room.width * height) / room.height) * 2, height * 2);
  drawWaterObjects();
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
    vehicle.avoidEdges();
    vehicle.show();

    if (attractor) {
      drawAttractorFor(vehicle);
    }
  }

  drawFishTank(liquidStart);
  drawFrameRate();
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
