// eslint-disable-next-line no-unused-vars
class Vehicle {
  constructor(filling, x, y, maxHeight, size, mass) {
    this.filling = filling;
    this.targetShapePosition = createVector(x, y);
    this.position = createVector(random(25, width - 50), random(maxHeight + 25, height - 50));
    this.currentTarget = this.position.copy();
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
    this.mass = mass;
    this.size = size;
    this.maxSpeed = 2;
    this.maxForce = 1;
  }

  applyForce(force) {
    this.acceleration.add(p5.Vector.div(force, this.mass));
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
    let diff = height - (this.position.y + this.size);
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

  edges() {
    if (this.position.y >= height - this.size) {
      // bottom border
      this.position.y = height - this.size;
      this.velocity.y *= -1;
    } else if (this.position.y <= this.size) {
      // top border
      this.position.y = this.size;
      this.velocity.y *= -1;
    }

    if (this.position.x >= width - this.size) {
      // right border
      this.position.x = width - this.size;
      this.velocity.x *= -1;
    } else if (this.position.x <= this.size) {
      // left border
      this.position.x = this.size;
      this.velocity.x *= -1;
    }
  }

  steerWith(desired) {
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  fleeFrom(target) {
    const desiredVelocity = p5.Vector.sub(target, this.position); // Vector pointing from position to target
    const distanceToTarget = desiredVelocity.mag();

    if (distanceToTarget > 50) {
      return createVector(0, 0);
    }

    desiredVelocity.setMag(this.maxSpeed);
    desiredVelocity.mult(-1);

    const flee = this.steerWith(desiredVelocity);
    flee.mult(5); // force scaling

    this.applyForce(flee);
  }

  striveTo(target) {
    const desiredVelocity = p5.Vector.sub(target, this.position); // Vector pointing from position to target
    const distanceToTarget = desiredVelocity.mag();

    const speed = distanceToTarget > 100 ? this.maxSpeed : map(distanceToTarget, 0, 100, 0, this.maxSpeed);
    desiredVelocity.setMag(speed);

    const arrive = this.steerWith(desiredVelocity);
    arrive.mult(1); // force scaling

    this.applyForce(arrive);
  }

  applyBehaviors() {
    this.striveTo(this.targetShapePosition);
    this.fleeFrom(createVector(mouseX, mouseY));
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  show() {
    image(
      this.filling,
      this.position.x,
      this.position.y,
      this.size,
      (this.filling.height * this.size) / this.filling.width
    );
  }
}
