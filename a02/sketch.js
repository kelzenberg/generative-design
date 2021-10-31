const cWidth = 500; // canvas width
const cHeight = 500; // canvas height
const inc = 0.08; // how often the noise field should update ~[0.01 - 0.8]
const scale = 5; // flow field scaling aka. length of each vector (1 = native pixel resolution, 10 = 1/10 of native pixel resolution) ~[3 - 20]
const strength = 0.5; // "gravitational" force of the vectors on dots ~[0.01 - 10]
const chaosFactor = 1; // the higher, the more inconsistent the vector angles get ~[0.1 - 4]
const particleAmount = 500; // amounts of particles on the canvas
const particleMaxSpeed = 7; // maximum particle travel speed ~[1- 10]
let cols, rows;
let flowfield;
let zOff = 0;

const particles = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(cWidth, cHeight);
  console.log(`Canvas: ${width} x ${height}`);
  pixelDensity(1);
  noiseDetail(64);

  cols = floor(width / scale);
  rows = floor(height / scale);
  console.log(`Cells: ${cols * rows} (${cols} cols x ${rows} rows)`);

  flowfield = new Array(cols * rows);

  for (let idx = 0; idx < particleAmount; idx++) {
    particles[idx] = new Particle(particleMaxSpeed);
  }

  background(255);
}

function drawFrameRate() {
  textSize(24);
  fill('white');
  noStroke();
  rect(10, height - 30, 27, 23);
  fill('black');
  text(frameRate().toFixed(), 10, height - 10);
}

// eslint-disable-next-line no-unused-vars
function draw() {
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

      // push();
      // translate(x * scale, y * scale);
      // rotate(vector.heading());
      // line(0, 0, scale, 0);
      // pop();
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

  drawFrameRate();
}
