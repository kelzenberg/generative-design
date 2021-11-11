// eslint-disable-next-line no-unused-vars
class Vehicle {
  constructor(filling, x, y, size) {
    this.filling = filling;
    this.position = createVector(random(width), random(height));
    this.target = createVector(x, y);
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
    const desiredVelocity = p5.Vector.sub(target, this.position); // Vector pointing from position to target
    const distanceToTarget = desiredVelocity.mag();

    if (distanceToTarget > 50) {
      return createVector(0, 0);
    }

    desiredVelocity.setMag(this.maxSpeed);
    desiredVelocity.mult(-1);

    return this.steerWith(desiredVelocity);
  }

  striveTo() {
    const desiredVelocity = p5.Vector.sub(this.target, this.position); // Vector pointing from position to target
    const distanceToTarget = desiredVelocity.mag();

    const speed = distanceToTarget > 100 ? this.maxSpeed : map(distanceToTarget, 0, 100, 0, this.maxSpeed);
    desiredVelocity.setMag(speed);

    return this.steerWith(desiredVelocity);
  }

  applyBehaviors() {
    const arrive = this.striveTo(this.target);
    const flee = this.fleeFrom(createVector(mouseX, mouseY));
    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
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
