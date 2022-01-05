// eslint-disable-next-line no-unused-vars
class Spreader extends Particle {
  constructor(x, y, texture, seedAmount) {
    super(x, y, texture);
    this.seedAmount = seedAmount;
    this.seedEmitter = null;
  }

  shouldExplode() {
    return this.velocity.y >= 0;
  }

  isExploded() {
    return !!this.seedEmitter;
  }

  isFinished() {
    return this.isLapsed() && this.isExploded() && this.seedEmitter.isFinished();
  }

  explode() {
    this.seedEmitter = new Emitter(this.x, this.y, this.texture, this.seedAmount, 0);
    this.seedEmitter.update();
    this.seedEmitter.show();

    this.lifetime = -1;
  }
}
