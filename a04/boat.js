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
    triangle(x, y - 5, x + 20, y - 40 - 5, x + 20, y - 5); // LB, T, RB (anti-clockwise)

    // Mast
    fill('grey');
    rect(x + 20 + 1.5, y - 45 - 5, 2, 55);

    // Großsegel
    fill('white');
    triangle(x + 25, y - 5, x + 25, y - 40 - 5, x + 60, y - 5); // LB, T, RB (anti-clockwise)

    // Rumpf
    fill(this.color);
    beginShape();
    vertex(x - 20 + 5, y);
    vertex(x + 65 + 5, y);
    vertex(x + 55 + 5, y + 15);
    vertex(x + 0 + 5, y + 15);
    endShape(CLOSE);
  }
}
