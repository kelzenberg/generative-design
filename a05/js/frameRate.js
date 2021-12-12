const frameRateConfig = {
  graphic: null, // texture for plane
  fontSize: 16, // framerate font size
  cWidth: null,
  cHeight: null,
};

let showFrameRate = false; // draw framerate
console.log('Display the framerate by setting "showFrameRate = true" in the console.');

// eslint-disable-next-line no-unused-vars
function createFrameRate(cWidth, cHeight) {
  const { fontSize } = frameRateConfig;
  const graphic = createGraphics(fontSize + fontSize / 8, fontSize + fontSize / 8);
  graphic.textSize(fontSize);
  graphic.noStroke();

  frameRateConfig.cWidth = cWidth;
  frameRateConfig.cHeight = cHeight;
  frameRateConfig.graphic = graphic;
}

// eslint-disable-next-line no-unused-vars
function drawFrameRate() {
  if (!showFrameRate) return;

  const { graphic, fontSize, cWidth, cHeight } = frameRateConfig;

  graphic.fill('white');
  graphic.rect(0, 0, fontSize + fontSize / 8, fontSize + fontSize / 8);
  graphic.fill('black');
  graphic.text(frameRate().toFixed(), 0, fontSize);

  push();
  translate(-cWidth / 2 + fontSize, -cHeight / 2 + fontSize);

  noStroke();
  texture(graphic);
  plane(graphic.width, graphic.height);
  pop();
}
