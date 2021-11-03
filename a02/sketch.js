const cWidth = 1280; // canvas width
const cHeight = 700; // canvas height
const fontSize = 16; // framerate font size
let showFrameRate = false; // draw framerate on canvas (or stop drawing)
console.log('Display the framerate by setting "showFrameRate: true" in the console.');

const inc = 10; // how often the noise position should update ~[1 - 15]
const strength = 0.1; // "gravitational" force of the vectors on dots ~[0.1 - 10]
const chaosFactor = 2; // the higher, the more inconsistent the vector angles get ~[0.1 - 4]
const particleAmount = 100; // amounts of particles on the canvas
const particleMaxSpeed = 1; // maximum particle travel speed ~[1- 10]
const particleThickness = 40; // line thickness of particles ~[1 - 20]
const particleDownforce = 1; // downforce on particles aka gravitation ~[0.1 - 5]

let zOff = 0;
let particles = new Array(particleAmount).fill(null);
let forestImg;
let roomImg;
let leafImg;

// eslint-disable-next-line no-unused-vars
function preload() {
  forestImg = loadImage('img/forest.jpg');
  roomImg = loadImage('img/room.png');
  leafImg = loadImage('img/leaf.png');
}

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  // createCanvas(windowWidth, windowHeight);
  console.log(`Canvas: ${width} x ${height}`);
  pixelDensity(1);
  noiseDetail(64);
  imageMode(CORNER);

  particles = particles.map(() => new Particle(leafImg, particleMaxSpeed, particleThickness, particleDownforce));
}

function drawFrameRate() {
  const graphic = createGraphics(cWidth, cHeight);
  graphic.textSize(fontSize);
  graphic.fill('white');
  graphic.noStroke();
  graphic.rect(0, 0, fontSize + fontSize / 8, fontSize + fontSize / 8);
  graphic.fill('black');
  graphic.text(frameRate().toFixed(), 0, fontSize);
  image(graphic, 0, 0);
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(255);
  image(forestImg, 0, 0, width, (forestImg.height * width) / forestImg.width);

  const particleGraphic = createGraphics(cWidth, cHeight);
  particleGraphic.colorMode(HSB, 255);
  zOff += inc / 1000.0;

  particles.map(particle => {
    particle.follow(zOff, strength, chaosFactor);
    particle.update();
    particle.edges();
    particle.show(particleGraphic);
  });

  image(particleGraphic, 0, 0);
  image(roomImg, 0, 0, width, (roomImg.height * width) / roomImg.width);

  if (showFrameRate) {
    drawFrameRate();
  }
}
