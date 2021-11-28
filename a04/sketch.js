const cWidth = 500; // canvas width
const cHeight = 500; // canvas height

const waves = new Array(5).fill(null);

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
  background(0);

  const maxAmplitude = 80; // relative to cHeight
  const maxPeriod = cWidth; // relative to cWidth
  const maxOffset = TWO_PI;

  for (let idx = 0; idx < waves.length; idx += 1) {
    waves[idx] = new Wave(random(20, maxAmplitude), random(100, maxPeriod), random(0, maxOffset));
  }
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0, 0, 0);
  drawFrameRate();

  let dotSpacing = 10;

  for (let x = 0; x < cWidth; x += dotSpacing) {
    let y = 0;
    for (const wave of waves) {
      y += wave.evaluate(x);
    }

    noStroke();
    ellipse(x, y + height / 2, dotSpacing);
  }

  for (const wave of waves) {
    wave.updatePhase(0.05);
  }
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
