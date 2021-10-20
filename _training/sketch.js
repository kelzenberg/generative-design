// One-time initialisation at program start
function setup() {
  createCanvas(windowWidth, windowHeight);
  print(`Canvas size is ${width}x${height}`);
}

// Called once per frame
function draw() {
  // Paint a black background (will completely erase the canvas)
  background("darkblue");
  noFill();

  // Two white dots
  stroke("white");
  strokeWeight(10);
  point(width * 0.5, height * 0.5);
  point(width * 0.5, height * 0.25);

  // A blue line
  stroke("#0099FF");
  strokeWeight(1);
  line(0, 0, width, height);
  line(0, height, width, 0);

  // An orange rectangle
  stroke("green");
  ellipse(width * 0.5, height * 0.5, width * 0.5, height * 0.8);
  stroke(255, 153, 0);
  rect(width * 0.25, height * 0.1, width * 0.5, height * 0.8);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
