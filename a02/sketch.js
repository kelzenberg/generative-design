const cWidth = 1280; // canvas width
const cHeight = 700; // canvas height
const fontSize = 16; // framerate font size
let showFrameRate = false; // draw framerate on canvas (or stop drawing)
console.log('Display the framerate by setting "showFrameRate: true" in the console.');

const leafParticleConfig = {
  zOff: 0,
  inc: 10, // how often the noise position should update ~[1 - 15]
  image: null,
  size: 40, // line thickness of particles ~[1 - 20]
  amount: 100, // amounts of particles on the canvas ~[100]
  chaosFactor: 2, // the higher, the more inconsistent the vector angles get ~[0.1 - 4]
  strength: 0.2, // "gravitational" force of the vectors on dots ~[0.1 - 10]
  downforce: 1, // downforce on particles aka gravitation ~[0.1 - 5]
  maxVelocity: 1, // maximum particle travel speed ~[1- 10]
};

let forestImg;
let roomImg;
let leafParticles = new Array(leafParticleConfig.amount).fill(null);

// eslint-disable-next-line no-unused-vars
function preload() {
  forestImg = loadImage('img/forest.jpg');
  roomImg = loadImage('img/room.png');
  leafParticleConfig.image = loadImage('img/leaf.png');
}

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  console.log(`Canvas: ${width} x ${height}`);
  pixelDensity(1);
  noiseDetail(64);
  imageMode(CORNER);

  leafParticles = leafParticles.map(() => new Particle(leafParticleConfig));
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

function drawLeafParticles() {
  leafParticleConfig.zOff += leafParticleConfig.inc / 1000.0;

  const particleGraphic = createGraphics(cWidth, cHeight);
  particleGraphic.colorMode(HSB, 255);

  leafParticles.map(particle => {
    particle.follow(leafParticleConfig.zOff);
    particle.update();
    particle.edges();
    particle.show(particleGraphic);
  });

  return particleGraphic;
}

// eslint-disable-next-line no-unused-vars
function draw() {
  image(forestImg, 0, 0, width, (forestImg.height * width) / forestImg.width);
  image(drawLeafParticles(), 0, 0);
  image(roomImg, 0, 0, width, (roomImg.height * width) / roomImg.width);

  if (showFrameRate) {
    drawFrameRate();
  }
}
