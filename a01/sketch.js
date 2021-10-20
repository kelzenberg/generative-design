function setup() {
  createCanvas(500, 500);
  console.log(`Canvas: ${width} x ${height}`);
}

let inc = 0.01;
let start = 0;

function draw() {
  background(64);
  stroke(255);
  noFill();

  let xOff = start;

  beginShape();
  for (let x = 0; x < width; x++) {
    let y = noise(xOff) * height;
    vertex(x, y);

    xOff += inc;
  }
  endShape();

  start += inc;
}
