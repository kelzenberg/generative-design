const frameRateConfig = {
  graphic: null, // graphic to draw framerate on
  fontSize: 16, // framerate font size
};

let showFrameRate = false; // draw framerate on graphic (or stop drawing)
console.log('Display the framerate by setting "showFrameRate = true" in the console.');

// eslint-disable-next-line no-unused-vars
function createFrameRate(cWidth, cHeight) {
  frameRateConfig.graphic = createGraphics(cWidth, cHeight);
  frameRateConfig.graphic.textSize(frameRateConfig.fontSize);
  frameRateConfig.graphic.noStroke();
}

// eslint-disable-next-line no-unused-vars
function drawFrameRate() {
  frameRateConfig.graphic.fill('white');
  frameRateConfig.graphic.rect(
    0,
    0,
    frameRateConfig.fontSize + frameRateConfig.fontSize / 8,
    frameRateConfig.fontSize + frameRateConfig.fontSize / 8
  );
  frameRateConfig.graphic.fill('black');
  frameRateConfig.graphic.text(frameRate().toFixed(), 0, frameRateConfig.fontSize);

  if (showFrameRate) {
    image(frameRateConfig.graphic, 0, 0);
  }
}
