const cWidth = 1280; // canvas width
const cHeight = 700; // canvas height
const fontSize = 16; // framerate font size
let showFrameRate = false; // draw framerate on canvas (or stop drawing)
console.log('Display the framerate by setting "showFrameRate: true" in the console.');

const leafConfig = {
  zOff: 0,
  inc: 10, // how often the noise position should update ~[1 - 15]
  canvas: { width: cWidth, height: cHeight }, // local canvas size
  filling: null, // content of the particle, e.g. image or color
  size: 40, // line thickness of particles ~[1 - 20]
  amount: 100, // amounts of particles on the canvas ~[100]
  chaosFactor: 2, // the higher, the more inconsistent the vector angles get ~[0.1 - 4]
  strength: 0.2, // "gravitational" force of the vectors on dots ~[0.1 - 10]
  downforce: 1, // downforce on particles aka gravitation ~[0.1 - 5]
  maxVelocity: 1, // maximum particle travel speed ~[1- 10]
};

const fireConfig = {
  zOff: 0,
  inc: 10, // how often the noise position should update ~[1 - 15]
  canvas: { width: 400, height: 200 }, // local canvas size
  filling: null, // content of the particle, e.g. image or color
  size: 5, // line thickness of particles ~[1 - 20]
  amount: 1000, // amounts of particles on the canvas ~[100]
  chaosFactor: 2, // the higher, the more inconsistent the vector angles get ~[0.1 - 4]
  strength: 10, // "gravitational" force of the vectors on dots ~[0.1 - 10]
  downforce: -100, // downforce on particles aka gravitation ~[0.1 - 5]
  maxVelocity: 8, // maximum particle travel speed ~[1- 10]
  colors: ['hsba(7, 100%, 80%, 0.5)', 'hsba(24, 80%, 85%, 0.5)', 'hsba(42, 100%, 100%, 0.5)'], // optional colors range
};

let forestImg;
let roomImg;
let leafParticles = new Array(leafConfig.amount).fill(null);
let fireParticles = new Array(fireConfig.amount).fill(null);

// eslint-disable-next-line no-unused-vars
function preload() {
  forestImg = loadImage('img/forest.jpg');
  roomImg = loadImage('img/room.png');
  leafConfig.filling = loadImage('img/leaf.png');
}

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  console.log(`Canvas: ${width} x ${height}`);
  pixelDensity(1);
  noiseDetail(64);
  imageMode(CORNER);

  leafParticles = leafParticles.map(() => new Particle(leafConfig));
  fireParticles = fireParticles.map(
    () =>
      new Particle({
        ...fireConfig,
        // select a random color per particle from selection
        filling: fireConfig.colors[floor(random(0, fireConfig.colors.length))],
      })
  );
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
  leafConfig.zOff += leafConfig.inc / 1000.0;

  const graphic = createGraphics(leafConfig.canvas.width, leafConfig.canvas.height);

  const showFunction = _this => {
    graphic.push();
    graphic.translate(_this.position.x, _this.position.y);
    graphic.rotate(_this.rotationAngle * (PI / 180));
    _this.rotationAngle += random(0, _this.hasInversRotation ? -1 : 1);
    graphic.imageMode(CENTER);
    graphic.image(_this.filling, 0, 0, _this.size, (_this.filling.height * _this.size) / _this.filling.width);
    graphic.pop();
  };

  leafParticles.map(particle => {
    particle.follow(leafConfig.zOff);
    particle.update();
    particle.edges();
    particle.show(showFunction);
  });

  return graphic;
}

function drawFireParticles() {
  fireConfig.zOff += fireConfig.inc / 1000.0;

  const graphic = createGraphics(fireConfig.canvas.width, fireConfig.canvas.height);
  graphic.colorMode(HSB, 100);
  graphic.noStroke();
  graphic.fill(graphic.color(random(0, 10), 15, 15, 100));
  graphic.rect(0, 0, graphic.width, graphic.height);

  const showFunction = _this => {
    graphic.noStroke();
    graphic.fill(graphic.color(_this.filling));
    graphic.ellipse(_this.position.x, _this.position.y, _this.size);
  };

  fireParticles.map(particle => {
    particle.follow(fireConfig.zOff);
    particle.update();
    particle.edges();
    particle.show(showFunction);
  });

  return graphic;
}

// eslint-disable-next-line no-unused-vars
function draw() {
  image(forestImg, 0, 0, width, (forestImg.height * width) / forestImg.width);
  image(drawLeafParticles(), 0, 0);
  image(drawFireParticles(), width / 2 - fireConfig.canvas.width / 2, height - fireConfig.canvas.height);
  image(roomImg, 0, 0, width, (roomImg.height * width) / roomImg.width);

  if (showFrameRate) {
    drawFrameRate();
  }
}
