// eslint-disable-next-line no-unused-vars
class Attractor {
  constructor(filling, mass) {
    this.filling = filling;
    this.mass = mass;
    this.displaySize = sqrt(this.mass) * 75;
    this.position = createVector(mouseX, mouseY);
    this.fixedPosition = false;
  }

  calculateSize() {
    this.displaySize = sqrt(this.mass) * 75;
  }

  toggleFixedPosition() {
    this.fixedPosition = !this.fixedPosition;
  }

  updatePosition(x, y) {
    if (this.fixedPosition) return;
    this.position = createVector(x, y);
  }

  attract(gravitationalC, vehicle) {
    if (!this.fixedPosition) {
      // don't attract if following mouse
      return;
    }

    if (this.mass > 0.01) {
      // decrease mass (& size) while attracting
      this.mass -= 1 / frameRate().toFixed() / 1000;
      this.calculateSize();
    } else {
      this.mass = 0;
    }

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
      this.displaySize,
      (this.filling.height * this.displaySize) / this.filling.width
    );
    imageMode(CORNER);
  }
}
