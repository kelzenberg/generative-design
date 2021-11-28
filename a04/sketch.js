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

  let hou = hour();
  let min = minute();
  let sec = second();
  let mil = millis();

  fill('white');
  noStroke();
  text(`${hou}:${min}:${sec}`, cWidth / 2 - 20, 100); // debug

  translate(cWidth / 2, cHeight / 2);
  rotate(-PI / 2);

  strokeWeight(12);
  noFill();

  stroke(255, 100, 150, 255);
  let milAngle = map(mil, 0, 60 * 1000, 0, TWO_PI);
  arc(0, 0, cWidth / 2, cHeight / 2, 0, milAngle);

  push();
  rotate(milAngle);
  stroke(255, 100, 150, 255);
  line(0, 0, 80, 0);
  pop();

  stroke(255, 100, 150, 150);
  let minAngle = map(min, 0, 60, 0, TWO_PI);
  arc(0, 0, cWidth / 2 - 20, cHeight / 2 - 20, 0, minAngle);

  push();
  rotate(minAngle);
  stroke(255, 100, 150, 150);
  line(0, 0, 60, 0);
  pop();

  stroke(255, 100, 150, 50);
  let houAngle = map(hou % 12, 0, 12, 0, TWO_PI);
  arc(0, 0, cWidth / 2 - 40, cHeight / 2 - 40, 0, houAngle);

  push();
  rotate(houAngle);
  stroke(255, 100, 150, 50);
  line(0, 0, 40, 0);
  pop();
}

// eslint-disable-next-line no-unused-vars
// function windowResized() {
//   resizeCanvas(cWidth, cHeight);
// }
