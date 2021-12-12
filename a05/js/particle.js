// eslint-disable-next-line no-unused-vars
class Particle extends p5.Vector {
  constructor(x, y) {
    super(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(0.5, 2));
    this.acceleration = createVector(0, 0);
    this.lifetime = 255; // alpha transparency
    this.size = 4;
  }

  isFinished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  avoidEdges() {
    const factor = -random(0.2, 0.5);

    if (this.y >= height - this.size) {
      // bottom border
      this.y = height - this.size;
      this.velocity.y *= factor;
    } else if (this.y <= this.size) {
      // top border
      this.y = this.size;
      this.velocity.y *= factor;
    }

    if (this.x >= width - this.size) {
      // right border
      this.x = width - this.size;
      this.velocity.x *= factor;
    } else if (this.x <= this.size) {
      // left border
      this.x = this.size;
      this.velocity.x *= factor;
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.add(this.velocity);
    this.acceleration.set(0, 0);
    this.lifetime -= 1;
  }

  show() {
    stroke(255, this.lifetime);
    strokeWeight(2);
    fill(255, this.lifetime);
    ellipse(this.x, this.y, this.size * 2);
  }
}