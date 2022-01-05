// eslint-disable-next-line no-unused-vars
class Emitter {
  constructor(x, y, texture, seedAmount, spreadAmount = 0) {
    this.position = createVector(x, y);
    this.texture = texture;
    this.seedAmount = seedAmount;
    this.spreadAmount = spreadAmount;

    this.particles = new Array(seedAmount).fill(
      spreadAmount === 0
        ? new Seeder(this.position.x, this.position.y, this.texture)
        : new Spreader(this.position.x, this.position.y, this.texture, this.seedAmount)
    );
  }

  isFinished() {
    return this.particles.length === 0;
  }

  applyForce(force) {
    for (const particle of this.particles) {
      particle.applyForce(force);
    }
  }

  update() {
    for (let idx = this.particles.length - 1; idx >= 0; idx--) {
      const particle = this.particles[idx];
      particle.update();

      if (particle.seedEmitter) {
        // is Spreader particle
        if (particle.shouldExplode()) {
          particle.explode();
        }
      }

      if (particle.isFinished()) {
        this.particles.splice(idx, 1);
      }
    }
  }

  show() {
    this.particles.forEach(particle => particle.show());
  }
}
