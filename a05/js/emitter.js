// eslint-disable-next-line no-unused-vars
class Emitter {
  constructor(x, y, seedAmount, spreadAmount, particleImage) {
    this.position = createVector(x, y);
    this.seedAmount = seedAmount;
    this.spreadAmount = spreadAmount;
    this.particleImage = particleImage;

    this.seedParticles = new Array(this.seedAmount).fill(
      new Particle(this.position.x, this.position.y, this.particleImage, true)
    );
    this.childParticles = [];
  }

  applyForce(force) {
    for (const particle of this.seedParticles.concat(this.childParticles)) {
      particle.applyForce(force);
    }
  }

  explode(x, y) {
    for (let idx = 0; idx < this.spreadAmount; idx++) {
      this.childParticles.push(new Particle(x, y, this.particleImage));
    }
  }

  updateSeedParticles() {
    for (let idx = this.seedParticles.length - 1; idx >= 0; idx--) {
      const seed = this.seedParticles[idx];
      seed.update();

      if (seed.isExploded()) {
        this.explode(seed.x, seed.y);

        this.seedParticles.splice(idx, 1);
      }
    }
  }

  updateChildParticles() {
    for (let idx = this.childParticles.length - 1; idx >= 0; idx--) {
      const child = this.childParticles[idx];
      child.update();

      if (child.isFinished()) {
        this.childParticles.splice(idx, 1);
      }
    }
  }

  update() {
    this.updateSeedParticles();
    this.updateChildParticles();
  }

  show() {
    this.seedParticles.concat(this.childParticles).forEach(particle => particle.show());
  }
}
