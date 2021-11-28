// eslint-disable-next-line no-unused-vars
class Wave {
  constructor(amplitude, period, phase) {
    this.amplitude = amplitude;
    this.period = period;
    this.phase = phase;
  }

  evaluate(x) {
    return sin(this.phase + (TWO_PI * x) / this.period) * this.amplitude;
  }

  updatePhase(amount) {
    this.phase += amount;
  }
}
