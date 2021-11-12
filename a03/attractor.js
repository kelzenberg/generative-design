// eslint-disable-next-line no-unused-vars
class Attractor {
  constructor(filling, x, y, mass) {
    this.filling = filling;
    this.mass = mass;
    this.size = sqrt(this.mass) * 75;
    this.position = createVector(x, y);
    this.fixedPosition = false;
  }

  toggleFixedPosition() {
    this.fixedPosition = !this.fixedPosition;
  }

  updatePosition(x, y) {
    if (this.fixedPosition) return;
    this.position = createVector(x, y);
  }

  attract(gravitationalC, vehicle) {
    if (!this.fixedPosition) return;

    const force = p5.Vector.sub(this.position, vehicle.position);
    const distanceSquared = constrain(force.magSq(), 25, 2500);
    const strength = gravitationalC * ((this.mass * vehicle.mass) / distanceSquared);
    force.setMag(strength);

    vehicle.applyForce(force);
  }

  show() {
    imageMode(CENTER);
    image(
      this.filling,
      this.position.x,
      this.position.y,
      this.size,
      (this.filling.height * this.size) / this.filling.width
    );
    imageMode(CORNER);
  }
}
