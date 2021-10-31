const cWidth = 500;
const cHeight = 500;
const increment = 0.01;
const transparency = 255;
const scale = 20;
let cols, rows;
let fr;
let noiser;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  console.log(`Canvas: ${width} x ${height}`);
  pixelDensity(1);

  cols = floor(width / scale);
  rows = floor(height / scale);
  fr = createP('');
  noiser = new Noiser(createImage(cols, rows));
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(255);

  noiser.setPixels(increment, transparency, scale);
  image(noiser.image, 0, 0);

  fr.html(floor(frameRate()));
}
