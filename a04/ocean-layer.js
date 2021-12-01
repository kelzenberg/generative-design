// eslint-disable-next-line no-unused-vars
class OceanLayer {
  constructor({ width, height, xOffset, yOffset, spacing, amplitude, period, phaseUpdate, boatAmountFn, color }) {
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.width = width;
    this.height = height;
    this.center = (this.height + this.yOffset) / 2;
    this.spacing = spacing;
    this.amplitude = amplitude;
    this.period = period;
    this.phaseUpdate = phaseUpdate;
    this.boatAmountFn = boatAmountFn;
    this.color = color;

    this.waveAmount = 5;
    this.waves = new Array(this.waveAmount)
      .fill(null)
      .map(
        () =>
          new Wave(
            random(this.amplitude.min, this.amplitude.max),
            random(this.period.min, this.period.max),
            random(this.xOffset.min, this.xOffset.max)
          )
      );

    this.boats = [];
  }

  drawWaves() {
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
  }

  draw() {
    this.drawWaves();

    for (const wave of this.waves) {
      wave.updatePhase(this.phaseUpdate);
    }

    const currentBoatAmount = this.boatAmountFn();
    const diff = this.boats.length - currentBoatAmount;

    if (diff > 0) {
      this.boats = this.boats
        .map(boat => {
          boat.leaveTowards(this.width + 50, boat.target.y);
          return Math.round(boat.position.x) === Math.round(boat.target.x) ? null : boat;
        })
        .filter(Boolean);
    } else if (diff < 0) {
      this.boats.push(
        new Boat(
          random(50, this.width - 50),
          random(
            this.center - this.amplitude.max * this.waveAmount,
            this.center + this.amplitude.max * this.waveAmount
          ) + 100,
          5,
          [random(0, 255), random(0, 255), random(0, 255)]
        )
      );
    }

    this.boats = this.boats.sort((boatA, boatB) => boatA.target.y - boatB.target.y);

    for (const boat of this.boats) {
      boat.update();
      boat.draw();
    }
  }
}
