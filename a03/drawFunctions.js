// eslint-disable-next-line no-unused-vars
function drawFishTank(liquidStart) {
  fill(255, 180, 0);
  rect(0, height - 60, width, 300, 2000); // sand

  fill(25, 200, 255, 100);
  noStroke();
  rect(0, liquidStart, width, height - liquidStart); // water

  fill(200, 200);
  rect(0, 0, 25, height); // left border
  rect(width - 25, 0, 25, height); // right border
  rect(0, height - 25, width, 25); // bottom border
}

// eslint-disable-next-line no-unused-vars
function drawWaterObjects() {
  const yAdjust = 45;
  waterObjects.map(obj => {
    imageMode(CORNER);
    image(
      obj.image,
      obj.xPos - obj.image.width / 2,
      height - obj.height - yAdjust,
      (obj.image.width * obj.height) / obj.image.height,
      obj.height
    );
    imageMode(CENTER);
  });
}

const gravitationalC = 50; // ~[1 - 50]

// eslint-disable-next-line no-unused-vars
function drawAttractorFor(vehicle) {
  if (attractor.mass === 0) {
    // previous attractor was "eaten", create a new one
    attractor = new Attractor(hotdog, random(0.2, 6));
  }

  attractor.updatePosition(mouseX, mouseY);
  attractor.attract(gravitationalC, vehicle);

  if (mouseClick) {
    attractor.toggleFixedPosition();
    mouseClicked();
  }

  attractor.show();
}
