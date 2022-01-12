// eslint-disable-next-line no-unused-vars
class Vehicle extends p5.Vector {
  constructor(x, y) {
    super(x, y);

    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.lifetime = 255;
    this.size = 16;
  }

  isFinished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  seek(target) {
    //
  }

  update() {
    this.velocity.add(this.acceleration);
    this.add(this.velocity);
    this.acceleration.set(0, 0);
    // this.lifetime -= 1;
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);

    push();
    translate(this.x, this.y);
    triangle(-this.size, -this.size / 2, -this.size, this.size / 2, this.size, 0);
    pop();
  }
}
