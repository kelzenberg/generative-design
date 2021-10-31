const cWidth = 500;
const cHeight = 500;
const increment = 0.01;
const transparency = 255;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  console.log(`Canvas: ${width} x ${height}`);
  pixelDensity(1);

  const noiser = new Noiser(createImage(cWidth, cHeight), transparency, increment);

  noiser.setPixels();
  const image1 = noiser.image;
  console.log('IMAGE', image1);

  image(image1, 0, 0);
}
