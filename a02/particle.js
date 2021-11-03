// eslint-disable-next-line no-unused-vars
function Particle(image, maxSpeed, size, downforce) {
  this.size = size;
  this.image = image;
  this.pos = createVector(random(width), random(height));
  this.velo = createVector(0, 0);
  this.accel = createVector(0, 0);
  this.gravitationVector = p5.Vector.fromAngle(random(90, 110) * (PI / 180)).setMag(downforce / 10);
  this.rotationAngle = floor(random(0, 180));
  this.hasInversRotation = random(0, 1) > 0.5;
  this.maxSpeed = maxSpeed;
  this.prevPos = this.pos.copy();

  this.update = function () {
    this.velo.add(this.accel);
    this.velo.limit(this.maxSpeed);
    this.pos.add(this.velo);
    this.accel.mult(0); // reset acceleration to 0
  };

  this.updatePrev = function () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };

  this.applyForce = function (extraForceVector) {
    this.accel.add(this.gravitationVector);
    this.accel.add(extraForceVector);
  };

  this.follow = function (zOff, strength, chaosFactor) {
    const angle = noise(this.pos.x, this.pos.y, zOff) * TWO_PI * chaosFactor;
    const forceVector = p5.Vector.fromAngle(angle).setMag(strength);
    this.applyForce(forceVector);
  };

  this.show = function (graphic) {
    graphic.push();
    graphic.translate(this.pos.x, this.pos.y);
    graphic.rotate(this.rotationAngle * (PI / 180));
    this.rotationAngle += random(0, this.hasInversRotation ? -1 : 1);
    graphic.imageMode(CENTER);
    graphic.image(this.image, 0, 0, this.size, (this.image.height * this.size) / this.image.width);
    graphic.pop();

    this.updatePrev();
  };

  this.edges = function () {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  };
}
