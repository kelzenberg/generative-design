// eslint-disable-next-line no-unused-vars
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
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

    if (this.position.y >= height - this.size) {
      // bottom border
      this.position.y = height - this.size;
      this.velocity.y *= factor;
    } else if (this.position.y <= this.size) {
      // top border
      this.position.y = this.size;
      this.velocity.y *= factor;
    }

    if (this.position.x >= width - this.size) {
      // right border
      this.position.x = width - this.size;
      this.velocity.x *= factor;
    } else if (this.position.x <= this.size) {
      // left border
      this.position.x = this.size;
      this.velocity.x *= factor;
    }
  }

  update() {
    // let mouse = createVector(mouseX, mouseY);
    // this.acc = p5.Vector.sub(mouse, this.pos);
    // this.acc.setMag(0.1);

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
    this.lifetime -= 1;
  }

  show() {
    stroke(255, this.lifetime);
    strokeWeight(2);
    fill(255, this.lifetime);
    ellipse(this.position.x, this.position.y, this.size * 2);
  }
}
