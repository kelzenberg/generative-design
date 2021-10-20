function setup() {
  createCanvas(500, 500);
  pixelDensity(1);
  console.log(`Canvas: ${width} x ${height}`);
}

let inc = 0.01;

function draw() {
  let yOff = 0;
  loadPixels();

  for (let y = 0; y < height; y++) {
    let xOff = 0;

    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let rand = noise(xOff, yOff) * 255;
      pixels[index] = rand;
      pixels[index + 1] = rand;
      pixels[index + 2] = rand;
      pixels[index + 3] = 255;

      xOff += inc;
    }
    yOff += inc;
  }

  updatePixels();
  // noLoop();
}
