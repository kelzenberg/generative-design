// eslint-disable-next-line no-unused-vars
class Particle extends p5.Vector {
  constructor(x, y, hue, isSpreader = false) {
    super(x, y);

    this.isSpreader = isSpreader;
    if (this.isSpreader) {
      this.velocity = createVector(0, random(-(height * 0.022), -(height * 0.01)));
    } else {
      this.velocity = p5.Vector.random3D();
      this.velocity.mult(random(1, 6));
    }

    this.hue = hue;
    this.acceleration = createVector(0, 0);
    this.lifetime = 255;
    this.size = 2;
  }

  isFinished() {
    return this.lifetime < 0;
  }

  isExploded() {
    return this.velocity.y >= 0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    if (!this.isSpreader) {
      this.velocity.mult(0.95);
    }

    this.velocity.add(this.acceleration);
    this.add(this.velocity);
    this.acceleration.set(0, 0);
    this.lifetime -= 2;
  }

  show() {
    push();
    translate(this.x, this.y, 0);
    ambientMaterial(this.hue.map(value => (value * this.lifetime) / 255));
    noStroke();
    sphere(this.size);
    pop();
  }
}
