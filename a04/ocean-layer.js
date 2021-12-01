// eslint-disable-next-line no-unused-vars
class OceanLayer {
  constructor({ width, height, xOffset, yOffset, spacing, amplitude, period, phaseUpdate, boatAmount, color }) {
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.width = width;
    this.height = height;
    this.center = (this.height + this.yOffset) / 2;
    this.spacing = spacing;
    this.amplitude = amplitude;
    this.period = period;
    this.phaseUpdate = phaseUpdate;
    this.color = color;

    const waveAmount = 5;
    this.waves = new Array(waveAmount)
      .fill(null)
      .map(
        () =>
          new Wave(
            random(this.amplitude.min, this.amplitude.max),
            random(this.period.min, this.period.max),
            random(this.xOffset.min, this.xOffset.max)
          )
      );

    this.boats = new Array(boatAmount)
      .fill(null)
      .map(
        () =>
          new Boat(
            random(50, this.width - 50),
            random(this.center - this.amplitude.max * waveAmount, this.center + this.amplitude.max * waveAmount) + 100,
            5,
            [random(0, 255), random(0, 255), random(0, 255)]
          )
      )
      .sort((boatA, boatB) => boatA.target.y - boatB.target.y);
  }

  draw() {
    beginShape();
    vertex(0, this.height); // bottom left shape corner
    for (let x = 0; x <= this.width; x += this.spacing) {
      let y = 0;

      for (const wave of this.waves) {
        y += wave.evaluate(x);
      }

      noStroke();
      fill(this.color);
      vertex(x, y + this.center); // half of window height + y-offset
    }
    vertex(this.width, this.height); // bottom right shape corner
    endShape(CLOSE);

    for (const wave of this.waves) {
      wave.updatePhase(this.phaseUpdate);
    }

    for (const boat of this.boats) {
      boat.update();
      boat.draw();
    }
  }
}
