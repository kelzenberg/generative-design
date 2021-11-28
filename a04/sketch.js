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

  // let dotSpacing = 10;

  // for (let x = 0; x < cWidth; x += dotSpacing) {
  //   let y = 0;
  //   for (const wave of waves) {
  //     y += wave.evaluate(x);
  //   }

  //   noStroke();
  //   ellipse(x, y + height / 2, dotSpacing);
  // }

  // for (const wave of waves) {
  //   wave.updatePhase(0.05);
  // }

  let ho = hour();
  let mi = minute();
  let se = second();
  let mil = millis();

  fill('white');
  noStroke();
  text(`${ho}:${mi}:${se}`, cWidth / 2 - 20, cHeight / 2); // debug

  translate(cWidth / 2, cHeight / 2);
  rotate(-PI / 2);

  stroke(255, 100, 150);
  strokeWeight(12);
  noFill();
  let end1 = map(mil, 0, 60 * 1000, 0, TWO_PI);
  arc(0, 0, cWidth / 2, cHeight / 2, 0, end1);

  stroke(255, 100, 150, 150);
  let end2 = map(mi, 0, 60, 0, TWO_PI);
  arc(0, 0, cWidth / 2 - 20, cHeight / 2 - 20, 0, end2);

  stroke(255, 100, 150, 50);
  let end3 = map(ho % 12, 0, 12, 0, TWO_PI);
  arc(0, 0, cWidth / 2 - 40, cHeight / 2 - 40, 0, end3);
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
