// eslint-disable-next-line no-unused-vars
class Mover {
  constructor(x, y) {
    this.mass = 1;
    this.size = 32;
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(3));
  }

  applyForce(force) {
    this.acceleration = force.mult(this.mass);
  }

  update() {
    // let mouse = createVector(mouseX, mouseY);
    // this.acceleration = p5.Vector.sub(mouse, this.position);
    // this.acceleration.setMag(0.5);

    this.velocity.add(this.acceleration);
    // this.velocity.limit(5);
    this.position.add(this.velocity);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.position.x, this.position.y, this.size);
  }
}
