// eslint-disable-next-line no-unused-vars
class Confetti extends Particle {
  constructor(x, y) {
    super(x, y);
    this.angle = random(TWO_PI);
  }

  // override
  show() {
    noStroke();
    fill(255, this.lifetime);

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    square(0, 0, this.size * 2);
    pop();
  }
}
