function setup() {
  createCanvas(500, 500);
  console.log(`Canvas: ${width} x ${height}`);

  noStroke();
}

let xOff1 = 0;
let xOff2 = 10000;
let yOff = 0;

function draw() {
  background(64);
  const x = map(noise(xOff1), 0, 1, 0, width);
  const y = map(noise(xOff2), 0, 1, 0, height);
  xOff1 += 0.01;
  xOff2 += 0.01;

  ellipse(x, y, 24, 24);
}
