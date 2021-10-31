const cWidth = 200; // canvas width
const cHeight = 200; // canvas height
const inc = 0.08; // how often the noise field should update ~[0.01 - 0.8]
const scale = 10; // length of each vector ~[4 - 20]
const strength = 0.1; // "gravitational" force of the vectors on dots ~[0.01 - 10]
const chaosFactor = 1; // the higher, the more inconsistent the vector angles get ~[0.1 - 4]
const particleAmount = 200; // amounts of particles on the canvas
let cols, rows;
let flowfield;
let zOff = 0;
let fr;

const particles = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  console.log(`Canvas: ${width} x ${height}`);
  pixelDensity(1);

  cols = floor(width / scale);
  rows = floor(height / scale);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (let idx = 0; idx < particleAmount; idx++) {
    particles[idx] = new Particle();
  }
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(255);

  let yOff = 0;
  for (let y = 0; y < rows; y++) {
    let xOff = 0;

    for (let x = 0; x < cols; x++) {
      const index = x + y * cols;
      let angle = noise(xOff, yOff, zOff) * TWO_PI * chaosFactor;
      const vector = p5.Vector.fromAngle(angle);
      vector.setMag(strength);
      flowfield[index] = vector;
      xOff += inc;

      stroke(0, 50);
      strokeWeight(1);

      push();
      translate(x * scale, y * scale);
      rotate(vector.heading());
      line(0, 0, scale, 0);
      pop();
    }

    yOff += inc;
    zOff += inc / 100.0;
  }

  particles.map(particle => {
    particle.follow(flowfield, scale, cols);
    particle.update();
    particle.edges();
    particle.show();
  });

  fr.html('Framerate: ' + floor(frameRate()));
}
