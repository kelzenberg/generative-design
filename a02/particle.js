// eslint-disable-next-line no-unused-vars
function Particle(image, maxVelocity, size, downforce) {
  this.size = size;
  this.image = image;
  this.position = createVector(random(width), random(height));
  this.prevPosition = this.position.copy();
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
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

  this.applyForce = function (forceVector) {
    this.acceleration.add(this.gravitationVector);
    this.acceleration.add(forceVector);
  };

  this.follow = function (zOff, strength, chaosFactor) {
    const angle = noise(this.position.x, this.position.y, zOff) * TWO_PI * chaosFactor;
    const forceVector = p5.Vector.fromAngle(angle).setMag(strength);
    this.applyForce(forceVector);
  };

  this.show = function (graphic) {
    graphic.push();
    graphic.translate(this.position.x, this.position.y);
    graphic.rotate(this.rotationAngle * (PI / 180));
    this.rotationAngle += random(0, this.hasInversRotation ? -1 : 1);
    graphic.imageMode(CENTER);
    graphic.image(this.image, 0, 0, this.size, (this.image.height * this.size) / this.image.width);
    graphic.pop();

    this.updatePrev();
  };

  this.edges = function () {
    if (this.position.x > width) {
      this.position.x = 0;
      this.updatePrev();
    }
    if (this.position.x < 0) {
      this.position.x = width;
      this.updatePrev();
    }
    if (this.position.y > height) {
      this.position.y = 0;
      this.updatePrev();
    }
    if (this.position.y < 0) {
      this.position.y = height;
      this.updatePrev();
    }
  };
}
