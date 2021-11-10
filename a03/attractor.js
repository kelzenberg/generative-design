// eslint-disable-next-line no-unused-vars
class Attractor {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = sqrt(this.mass) * 10;
    this.position = createVector(x, y);
  }

  attract(gravitationalC, mover) {
    const force = p5.Vector.sub(this.position, mover.position);
    const distanceSquared = constrain(force.magSq(), 25, 2500);
    const strength = gravitationalC * ((this.mass * mover.mass) / distanceSquared);
    force.setMag(strength);

    mover.applyForce(force);
  }

  show() {
    fill(255, 200, 20);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}
