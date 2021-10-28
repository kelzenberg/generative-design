const cWidth = 500;
const cHeight = 500;

const gradientValue = ({ val, max = Math.min(width, height), inv = false }) =>
  inv ? map(val, 0, max, 255, 0) : map(val, 0, max, 0, 255);

function firstLayer(img, trans, inc) {
  let yOff = 0;
  img.loadPixels();
  noiseDetail(24);

  for (let y = 0; y < img.height; y++) {
    let xOff = 0;

    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let rand = noise(xOff, yOff) * 255;
      const [r, g, b, brightness] = color(rand, trans).levels;

      img.pixels[index + 0] = r;
      img.pixels[index + 1] = g;
      img.pixels[index + 2] = 255;
      img.pixels[index + 3] = brightness;

      xOff += inc;
    }
    yOff += inc;
  }

  img.updatePixels();
  return img;
}

function secondLayer(img, trans, inc) {
  let yOff = 0;
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    let xOff = 0;

    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let rand = noise(xOff, yOff) * 255;
      const [r, g, b, brightness] = color(rand, trans).levels;

      img.pixels[index + 0] = gradientValue({ val: y });
      img.pixels[index + 1] = gradientValue({ val: x });
      img.pixels[index + 2] = b;
      img.pixels[index + 3] = brightness;

      xOff += inc;
    }
    yOff += inc;
  }

  img.updatePixels();
  return img;
}

function thirdLayer(img, trans, inc) {
  let yOff = 0;
  img.loadPixels();
  noiseDetail(24, 0.65);

  for (let y = 0; y < img.height; y++) {
    let xOff = 0;

    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let rand = noise(xOff, yOff) * 255;
      const [r, g, b, brightness] = color(rand, trans).levels;

      img.pixels[index + 0] = 255;
      img.pixels[index + 1] = gradientValue({ val: x });
      img.pixels[index + 2] = b;
      img.pixels[index + 3] = brightness;

      xOff += inc;
    }
    yOff += inc;
  }

  img.updatePixels();
  return img;
}

function setup() {
  createCanvas(cWidth, cHeight);
  console.log(`Canvas: ${width} x ${height}`);
  pixelDensity(1);

  const img1 = createImage(cWidth, cHeight);
  const img2 = createImage(cWidth, cHeight);
  const img3 = createImage(cWidth, cHeight);

  blendMode(MULTIPLY);
  image(firstLayer(img1, 255, 0.04), 0, 0);
  image(secondLayer(img2, 128, 0.01), 0, 0);
  blendMode(OVERLAY);
  image(thirdLayer(img3, 255, 0.01), 0, 0);
}
