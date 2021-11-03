// eslint-disable-next-line no-unused-vars
function Particle(maxSpeed, thickness, downforce) {
  this.pos = createVector(random(width), random(height));
  this.velo = createVector(0, 0);
  this.accel = createVector(0, 0);
  this.gravitation = p5.Vector.fromAngle(90 * (PI / 180)).setMag(downforce / 10);
  this.maxSpeed = maxSpeed;
  this.prevPos = this.pos.copy();
  this.hue = 0;
  this.strokeWeight = thickness;

  this.update = function () {
    this.velo.add(this.accel);
    this.velo.limit(this.maxSpeed);
    this.pos.add(this.velo);
    this.accel.mult(0); // reset acceleration to 0
  };

  this.applyForce = function (vector) {
    this.accel.add(vector);
    this.accel.add(this.gravitation);
  };

  this.follow = function (zOff, strength, chaosFactor) {
    let angle = noise(this.pos.x, this.pos.y, zOff) * TWO_PI * chaosFactor;
    const vector = p5.Vector.fromAngle(angle);
    vector.setMag(strength);
    this.applyForce(vector);
  };

  this.show = function () {
    stroke(this.hue, 255, 255, 25);
    strokeWeight(this.strokeWeight);

    this.hue = this.hue + 1;
    if (this.hue > 255) {
      this.hue = 0;
    }

    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  };

  this.updatePrev = function () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
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
