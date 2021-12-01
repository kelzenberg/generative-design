let cWidth = 500; // canvas width
let cHeight = 500; // canvas height

let oceanLayer = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(cWidth, cHeight);
  createFrameRate(cWidth, cHeight);
  background(20);

  oceanLayer = [
    // hour
    // new OceanLayer({
    //   width: cWidth,
    //   height: cHeight,
    //   xOffset: { min: 0, max: TWO_PI }, // left/right shift
    //   yOffset: -400, // up/down shift
    //   spacing: 1, // smoothness of wave
    //   amplitude: { min: 5, max: 5 }, // height +/-
    //   period: { min: cWidth / 4, max: cWidth }, // spikeyness
    //   phaseUpdate: 0.01, // wave speed
    //   boatAmountFn: () => hour() % 12,
    //   color: [random(0, 255), random(0, 255), random(0, 255)],
    // }),
    // // minute
    // new OceanLayer({
    //   width: cWidth,
    //   height: cHeight,
    //   xOffset: { min: 0, max: TWO_PI }, // left/right shift
    //   yOffset: 50, // up/down shift
    //   spacing: 1, // smoothness of wave
    //   amplitude: { min: 10, max: 10 }, // height +/-
    //   period: { min: -cWidth / 4, max: -cWidth }, // spikeyness
    //   phaseUpdate: 0.025, // wave speed
    //   boatAmountFn: () => Math.floor(minute() / 10),
    //   color: [random(0, 255), random(0, 255), random(0, 255)],
    // }),
    // second
    new OceanLayer({
      width: cWidth,
      height: cHeight,
      xOffset: { min: 0, max: TWO_PI }, // left/right shift
      yOffset: 500, // up/down shift
      spacing: 1, // smoothness of wave
      amplitude: { min: 10, max: 10 }, // height +/-
      period: { min: cWidth / 4, max: cWidth }, // spikeyness
      phaseUpdate: 0.04, // wave speed
      boatAmountFn: () => Math.floor(second() / 10),
      color: [random(0, 255), random(0, 255), random(0, 255)],
    }),
  ];
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(20, 255);
  drawFrameRate();

  for (const layer of oceanLayer) {
    layer.draw();
  }

  let hou = hour();
  let min = minute();
  let sec = second();
  // let mil = millis();
  let scaling = Math.min(cWidth, cHeight);

  fill('white');
  noStroke();
  text(`${hou}:${min}:${sec}`, cWidth / 2 - 20, 100); // debug

  // translate(cWidth / 2, cHeight / 2);
  // rotate(-PI / 2);

  // strokeWeight(scaling / (12 * 5));
  // noFill();

  // // seconds
  // stroke(255, 85);
  // let milAngle = map(sec, 0, 60, 0, TWO_PI);
  // arc(0, 0, cWidth / cHeight + scaling * 0.6, cHeight / cWidth + scaling * 0.6, 0, milAngle);
  // push();
  // rotate(milAngle);
  // line(0, 0, map(80, 0, 80, 0, scaling / 5), 0);
  // pop();

  // // minutes
  // stroke(255, 170);
  // let minAngle = map(min, 0, 60, 0, TWO_PI);
  // arc(0, 0, cWidth / cHeight + scaling * 0.6 - 20, cHeight / cWidth + scaling * 0.6 - 20, 0, minAngle);
  // push();
  // rotate(minAngle);
  // line(0, 0, map(60, 0, 80, 0, scaling / 5), 0);
  // pop();

  // // hours
  // stroke(255, 255);
  // let houAngle = map(hou % 12, 0, 12, 0, TWO_PI);
  // arc(0, 0, cWidth / cHeight + scaling * 0.6 - 40, cHeight / cWidth + scaling * 0.6 - 40, 0, houAngle);
  // push();
  // rotate(houAngle);
  // line(0, 0, map(40, 0, 80, 0, scaling / 5), 0);
  // pop();
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
