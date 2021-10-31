const cWidth = 200;
const cHeight = 200;
const increment = 0.1;
const transparency = 255;
const scale = 10;
let cols, rows;
let fr;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  console.log(`Canvas: ${width} x ${height}`);
  pixelDensity(1);

  cols = floor(width / scale);
  rows = floor(height / scale);
  fr = createP('');
}

// eslint-disable-next-line no-unused-vars
function draw() {
  const noiser = new Noiser(createImage(cols, rows));

  noiser.setPixels(transparency, increment, scale);
  image(noiser.image, 0, 0);

  fr.html(floor(frameRate()));
}
