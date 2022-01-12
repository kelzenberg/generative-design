// eslint-disable-next-line no-unused-vars
class Vehicle extends p5.Vector {
  constructor(x, y) {
    super(x, y);

    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 8;
    this.maxForce = 0.1; // limits magnitude of steering
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
    const force = p5.Vector.sub(target, this);
    force.setMag(this.maxSpeed);
    force.sub(this.velocity);
    force.limit(this.maxForce);
    return force;
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  edges() {
    if (this.y >= height - this.size) {
      // bottom border
      this.y = height - this.size;
      this.velocity.y *= -1;
    } else if (this.y <= this.size) {
      // top border
      this.y = this.size;
      this.velocity.y *= -1;
    }

    if (this.x >= width - this.size) {
      // right border
      this.x = width - this.size;
      this.velocity.x *= -1;
    } else if (this.x <= this.size) {
      // left border
      this.x = this.size;
      this.velocity.x *= -1;
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
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
    rotate(this.velocity.heading());
    triangle(-this.size, -this.size / 2, -this.size, this.size / 2, this.size, 0);
    pop();
  }
}

// eslint-disable-next-line no-unused-vars
class Target extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.velocity = createVector(2, 5);
  }

  show() {
    fill(255, 0, 0);
    noStroke();

    push();
    translate(this.x, this.y);
    circle(0, 0, this.size * 2);
    pop();
  }
}
