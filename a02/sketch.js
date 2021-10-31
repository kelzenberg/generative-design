const cWidth = 200;
const cHeight = 200;
const inc = 0.01;
const scale = 10;
let cols, rows;
let fr;

const particles = [];
const particleAmount = 100;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  console.log(`Canvas: ${width} x ${height}`);
  pixelDensity(1);

  cols = floor(width / scale);
  rows = floor(height / scale);
  fr = createP('');

  for (let idx = 0; idx < particleAmount; idx++) {
    particles[idx] = new Particle();
  }
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(255);

  let yOff = 0;
  let zOff = 0;
  for (let y = 0; y < rows; y++) {
    let xOff = 0;

    for (let x = 0; x < cols; x++) {
      let angle = noise(xOff, yOff, zOff) * TWO_PI;

      const vector = p5.Vector.fromAngle(angle);
      xOff += inc;

      stroke(0, 100);
      push();
      translate(x * scale, y * scale);
      rotate(vector.heading());
      line(0, 0, scale, 0);
      pop();
    }
    yOff += inc;
    // zOff += inc / 10.0;
  }

  particles.map(particle => {
    particle.update();
    particle.edges();
    particle.show();
  });

  fr.html('Framerate: ' + floor(frameRate()));
}
