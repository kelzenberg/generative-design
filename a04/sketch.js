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

  button = createButton('click me');
  button.position(0, 0);
  button.mousePressed(() => console.log('foo'));

  oceanLayer = [
    // hour
    new OceanLayer({
      width: cWidth,
      height: cHeight,
      xOffset: { min: 0, max: TWO_PI }, // left/right shift
      yOffset: -400, // up/down shift
      spacing: 1, // smoothness of wave
      amplitude: { min: 5, max: 5 }, // height +/-
      period: { min: cWidth / 4, max: cWidth }, // spikeyness
      phaseUpdate: 0.01, // wave speed
      boatAmountFn: () => hour() % 12,
      color: [random(0, 255), random(0, 255), random(0, 255)],
    }),
    // minute
    new OceanLayer({
      width: cWidth,
      height: cHeight,
      xOffset: { min: 0, max: TWO_PI }, // left/right shift
      yOffset: 50, // up/down shift
      spacing: 1, // smoothness of wave
      amplitude: { min: 10, max: 10 }, // height +/-
      period: { min: -cWidth / 4, max: -cWidth }, // spikeyness
      phaseUpdate: 0.025, // wave speed
      boatAmountFn: () => Math.floor(minute() / 5),
      color: [random(0, 255), random(0, 255), random(0, 255)],
    }),
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
  if (hour() >= 17) {
    background(0, 10, 35);
  } else {
    background(180, 225, 255);
  }

  drawFrameRate();

  for (const layer of oceanLayer) {
    layer.draw();
  }
}

// eslint-disable-next-line no-unused-vars
function windowResized() {
  setup();
}
