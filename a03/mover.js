// eslint-disable-next-line no-unused-vars
class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = sqrt(this.mass) * 10;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  drag(coefficient) {
    // Direction of drag
    let drag = this.velocity.copy();
    drag.normalize();
    drag.mult(-1);

    // Magnitude of drag
    let speedSquared = this.velocity.magSq();
    drag.setMag(coefficient * speedSquared);

    this.applyForce(drag);
  }

  friction(mu) {
    let diff = height - (this.position.y + this.radius);
    if (diff < 1) {
      // Direction of friction
      let friction = this.velocity.copy();
      friction.normalize();
      friction.mult(-1);

      // Magnitude of friction
      let normal = this.mass;
      friction.setMag(mu * normal);

      this.applyForce(friction);
    }
  }

  applyForce(force) {
    this.acceleration.add(p5.Vector.div(force, this.mass));
  }

  edges() {
    if (this.position.y >= height - this.radius) {
      // bottom border
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    }

    if (this.position.x >= width - this.radius) {
      // right border
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x <= this.radius) {
      // left border
      this.position.x = this.radius;
      this.velocity.x *= -1;
    }
  }

  update() {
    // let mouse = createVector(mouseX, mouseY);
    // this.acceleration = p5.Vector.sub(mouse, this.position);
    // this.acceleration.setMag(0.5);

    this.velocity.add(this.acceleration);
    // this.velocity.limit(5);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}
