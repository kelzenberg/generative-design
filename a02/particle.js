// eslint-disable-next-line no-unused-vars
function Particle() {
  this.pos = createVector(random(width), random(height));
  this.velo = createVector(0, 0);
  this.accel = createVector(0, 0);
  this.maxSpeed = 4;

  this.update = function () {
    this.velo.add(this.accel);
    this.velo.limit(this.maxSpeed);
    this.pos.add(this.velo);
    this.accel.mult(0); // reset acceleration to 0
  };

  this.applyForce = function (force) {
    this.accel.add(force);
  };

  this.follow = function (vectors, scale, cols) {
    const x = floor(this.pos.x / scale);
    const y = floor(this.pos.y / scale);
    const idx = x + y * cols;
    this.applyForce(vectors[idx]);
  };

  this.show = function () {
    stroke(0);
    point(this.pos.x, this.pos.y);
  };

  this.edges = function () {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  };
}
