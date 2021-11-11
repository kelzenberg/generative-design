// eslint-disable-next-line no-unused-vars
class Attractor {
  constructor(filling, x, y, mass) {
    this.filling = filling;
    this.mass = mass;
    this.size = sqrt(this.mass) * 75;
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
    image(
      this.filling,
      this.position.x,
      this.position.y,
      this.size,
      (this.filling.height * this.size) / this.filling.width
    );
  }
}
