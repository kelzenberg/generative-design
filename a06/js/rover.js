let rover;

/* Mouse: click : toggle pointer lock
       left/right : yaw
       up/down : pitch

 Keys: a/d : yaw | left/right*
       w/s : forward/backward
       e/q : up/down
       r/f : pitch | elevation*
       ←/→ : left/right
       ↑/↓ : forward/backward
       +/- : field of view

* when pointerLock is enabled */
const helpTexts = [
  '[ Mouse (on click) ]',
  '  left/right: pan',
  '  up/down: tilt',
  '[ Keyboard ]',
  '  a/d: left/right',
  '  w/s: fwd/bkwd',
  '  q/e: down/up',
  '  space: jump',
  '  h: help',
  '[ Framerate: X ]',
];

// eslint-disable-next-line no-unused-vars
function createRover() {
  rover = createRoverCam();
  rover.usePointerLock();

  rover.setState({
    active: true,
    enableControl: true,
    // position: [0, 0, 200], // ➡️ ⬇️ ⤵️
    position: [-250, -25, 125], // ➡️ ⬇️ ⤵️
    // rotation: [radians(-90), radians(0), 0], // pan, tilt, undefined
    rotation: [radians(-30), radians(35), 0], // pan, tilt, undefined
    // offset: [0, 0], // height, rotational
    offset: [-120, 0], // height, rotational
    fov: 1, // default: 1
    speed: 0.5,
    sensitivity: 0.05,
  });
}

// eslint-disable-next-line no-unused-vars
function drawHelp() {
  textFont(f);
  push();

  // taken & modified from https://editor.p5js.org/jwdunn1/sketches/iI-2XX0Hw
  // credit to James Dunn (https://github.com/jwdunn1)
  camera(0, 0, height / 2.0 / tan((PI * 30.0) / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
  translate(-width / 2 + 20, -height / 2 + 20, 0);
  scale(1.5);
  // (credit end)

  const framerate = frameRate().toFixed();
  if (framerate % 5 == 0) {
    helpTexts[helpTexts.length - 1] = `[ Framerate: ${framerate} ]`;
  }

  fill(0, 0, 0, 200);
  noStroke();
  rect(0, 0, 155, helpTexts.length * 15 + 10);

  fill(127);
  helpTexts.forEach((v, idx) => text(v, 5, (idx + 1) * 15));
  pop();
}
