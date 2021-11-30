const cWidth = 500; // canvas width
const cHeight = 500; // canvas height

const oceanLayer = new Array(3).fill(null);

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
  background(0);

  // const maxAmplitude = 80; // relative to cHeight
  // const maxPeriod = cWidth; // relative to cWidth
  // const maxOffset = TWO_PI;

  for (let idx = 0; idx < oceanLayer.length; idx += 1) {
    oceanLayer[idx] = new OceanLayer({
      width: cWidth,
      height: cHeight,
      spacing: 10,
      amplitude: { min: 20, max: 80 },
      period: { min: 100, max: cWidth },
      offset: { min: 0, max: TWO_PI },
      phaseUpdate: 0.05,
      color: [random(0, 255), random(0, 255), random(0, 255)],
    });
  }
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0, 0, 0);
  drawFrameRate();

  for (const layer of oceanLayer) {
    layer.draw();
  }

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
