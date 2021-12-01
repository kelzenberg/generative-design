// eslint-disable-next-line no-unused-vars
class Boat {
  constructor(x, y, maxVelocity, color) {
    this.target = createVector(x, y);
    this.position = createVector(0, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxVelocity = maxVelocity;
    this.color = color;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  steerWith(desired) {
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  striveTo(target) {
    const desiredVelocity = p5.Vector.sub(target, this.position); // Vector pointing from position to target
    const distanceToTarget = desiredVelocity.mag();

    const speed = distanceToTarget > 100 ? this.maxVelocity : map(distanceToTarget, 0, 100, 0, this.maxVelocity);
    desiredVelocity.setMag(speed);

    const arrive = this.steerWith(desiredVelocity);
    arrive.mult(1); // force scaling

    this.applyForce(arrive);
  }

  update() {
    this.striveTo(this.target);
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  draw() {
    const x = this.position.x;
    const y = this.position.y;
    noStroke();

    // Fock
    fill('white');
    triangle(x, y - 2.5, x + 10, y - 20 - 2.5, x + 10, y - 2.5); // LB, T, RB (anti-clockwise)

    // Mast
    fill('grey');
    rect(x + 10 + 1.5, y - 22 - 2.5, 2, 25);

    // Großsegel
    fill('white');
    triangle(x + 15, y - 2.5, x + 15, y - 20 - 2.5, x + 30, y - 2.5); // LB, T, RB (anti-clockwise)

    // Rumpf
    fill(this.color);
    beginShape();
    vertex(x - 10 + 2.5, y);
    vertex(x + 32 + 2.5, y);
    vertex(x + 27 + 2.5, y + 7);
    vertex(x + 0 + 2.5, y + 7);
    endShape(CLOSE);
  }
}
