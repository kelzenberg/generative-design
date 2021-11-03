// eslint-disable-next-line no-unused-vars
function Particle({ filling, canvas, size, chaosFactor, strength, downforce, maxVelocity, colors }) {
  this.filling = filling;
  this.size = size;
  this.canvas = canvas;
  this.position = createVector(random(canvas.width), random(canvas.height));
  this.prevPosition = this.position.copy();
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.chaosFactor = chaosFactor;
  this.strength = strength;
  this.gravitationVector = p5.Vector.fromAngle(random(90, 110) * (PI / 180)).setMag(downforce / 10);
  this.rotationAngle = floor(random(0, 180));
  this.hasInversRotation = random(0, 1) > 0.5;
  this.maxVelocity = maxVelocity;

  this.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // reset acceleration to 0
  };

  this.updatePrev = function () {
    this.prevPosition.x = this.position.x;
    this.prevPosition.y = this.position.y;
  };

  this.follow = function (zOff) {
    const angle = noise(this.position.x, this.position.y, zOff) * TWO_PI * this.chaosFactor;
    const forceVector = p5.Vector.fromAngle(angle).setMag(this.strength);

    this.acceleration.add(this.gravitationVector);
    this.acceleration.add(forceVector);
  };

  this.edges = function () {
    if (this.position.x > this.canvas.width) {
      this.position.x = 0;
      this.updatePrev();
    }
    if (this.position.x < 0) {
      this.position.x = this.canvas.width;
      this.updatePrev();
    }
    if (this.position.y > this.canvas.height) {
      this.position.y = 0;
      this.updatePrev();
    }
    if (this.position.y < 0) {
      this.position.y = this.canvas.height;
      this.updatePrev();
    }
  };

  this.show = function (showFunction) {
    showFunction(this);
    this.updatePrev();
  };
}
