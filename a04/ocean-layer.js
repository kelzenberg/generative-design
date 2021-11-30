// eslint-disable-next-line no-unused-vars
class OceanLayer {
  constructor({ width, height, spacing, amplitude, period, xOffset, yOffset, phaseUpdate, color }) {
    this.width = width;
    this.height = height;
    this.spacing = spacing;
    this.amplitude = amplitude;
    this.period = period;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.phaseUpdate = phaseUpdate;
    this.color = color;

    this.waves = new Array(5)
      .fill(null)
      .map(
        () =>
          new Wave(
            random(this.amplitude.min, this.amplitude.max),
            random(this.period.min, this.period.max),
            random(this.xOffset.min, this.xOffset.max)
          )
      );
  }

  draw() {
    beginShape();
    vertex(0, this.height);
    for (let x = 0; x <= this.width; x += this.spacing) {
      let y = 0;

      for (const wave of this.waves) {
        y += wave.evaluate(x);
      }

      noStroke();
      fill(this.color);
      vertex(x, y + this.height / 2 + this.yOffset); // y + this.height / 2 = height center
    }
    vertex(this.width, this.height);
    endShape(CLOSE);

    for (const wave of this.waves) {
      wave.updatePhase(this.phaseUpdate);
    }
  }
}
