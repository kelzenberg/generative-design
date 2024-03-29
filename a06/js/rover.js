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
class Rover {
  constructor() {
    this.cam = createRoverCam();
    this.cam.usePointerLock();

    this.cam.setState({
      active: true,
      enableControl: true,
      // position: [0, -130, 130], // ➡️ ⬇️ ⤵️
      // position: [-180, -120, 125], // ➡️ ⬇️ ⤵️
      // position: [-144, -19, 97], // ➡️ ⬇️ ⤵️
      // position: [-31, -13, -15], // ➡️ ⬇️ ⤵️
      position: [5, 2, 16], // ➡️ ⬇️ ⤵️
      // rotation: [radians(-90), radians(45), 0], // pan, tilt, undefined
      // rotation: [radians(-30), radians(35), 0], // pan, tilt, undefined
      // rotation: [radians(-39), radians(15), 0], // pan, tilt, undefined
      // rotation: [radians(15), radians(15), 0], // pan, tilt, undefined
      rotation: [radians(257), radians(3.5), 0], // pan, tilt, undefined
      // offset: [0, 0], // height, rotational
      fov: 1.5, // default: 1
      speed: 0.5,
      sensitivity: 0.05,
    });
  }

  getCam() {
    return this.cam;
  }

  drawHelp() {
    const xAxis = createVector(2, 0, 0);
    const yAxis = createVector(0, 2, 0);
    const zAxis = createVector(0, 0, 2);

    push();
    strokeWeight(10);
    stroke(255, 0, 0); // red = x
    line(0, 0, 0, xAxis.x, xAxis.y, xAxis.z);
    stroke(0, 255, 0); // green = y
    line(0, 0, 0, yAxis.x, yAxis.y, yAxis.z);
    stroke(0, 0, 255); // blue = z
    line(0, 0, 0, zAxis.x, zAxis.y, zAxis.z);
    pop();

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

    fill(0, 0, 0, 180);
    noStroke();
    rect(0, 0, 155, helpTexts.length * 15 + 10);

    fill(220);
    helpTexts.forEach((v, idx) => text(v, 5, (idx + 1) * 15));

    pop();
  }
}
