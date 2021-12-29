// eslint-disable-next-line no-unused-vars
class Emitter {
  constructor(x, y, particleImage) {
    this.position = createVector(x, y);
    this.particles = [];
    this.particleImage = particleImage;
  }

  startEmitting(amount) {
    for (let idx = 0; idx < amount; idx++) {
      this.particles.push(new Particle(this.position.x, this.position.y, this.particleImage));
    }
  }

  applyForce(force) {
    for (const particle of this.particles) {
      particle.applyForce(force);
    }
  }

  update() {
    for (const particle of this.particles) {
      particle.update();
      // particle.avoidEdges();
    }

    for (let idx = this.particles.length - 1; idx >= 0; idx--) {
      const currentParticle = this.particles[idx];
      if (currentParticle.isFinished() || currentParticle.hasExploded()) {
        this.particles.splice(idx, 1);
      }
    }
  }

  show() {
    this.particles.forEach(particle => particle.show());
  }
}
