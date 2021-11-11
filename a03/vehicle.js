// eslint-disable-next-line no-unused-vars
class Vehicle {
  constructor(filling, x, y, maxHeight, size) {
    this.filling = filling;
    this.targetShapePosition = createVector(x, y);
    this.startPosition = createVector(random(25, width - 50), random(maxHeight + 25, height - 50));
    this.currentTarget = this.startPosition.copy();
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
    this.size = size;
    this.maxSpeed = 2;
    this.maxForce = 1;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  steerWith(desired) {
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  fleeFrom(target) {
    const desiredVelocity = p5.Vector.sub(target, this.startPosition); // Vector pointing from position to target
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
    const desiredVelocity = p5.Vector.sub(target, this.startPosition); // Vector pointing from position to target
    const distanceToTarget = desiredVelocity.mag();

    const speed = distanceToTarget > 100 ? this.maxSpeed : map(distanceToTarget, 0, 100, 0, this.maxSpeed);
    desiredVelocity.setMag(speed);

    const arrive = this.steerWith(desiredVelocity);
    arrive.mult(1); // force scaling

    this.applyForce(arrive);
  }

  applyBehaviors() {
    this.striveTo(this.currentTarget);
    this.fleeFrom(createVector(mouseX, mouseY));
  }

  update() {
    this.startPosition.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  show() {
    image(
      this.filling,
      this.startPosition.x,
      this.startPosition.y,
      this.size,
      (this.filling.height * this.size) / this.filling.width
    );
  }
}
