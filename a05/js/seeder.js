// eslint-disable-next-line no-unused-vars
class Seeder extends Particle {
  constructor(x, y, texture) {
    super(x, y, texture);
  }

  isFinished() {
    return this.isLapsed();
  }
}
