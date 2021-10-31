// eslint-disable-next-line no-unused-vars
class Noiser {
  constructor(image) {
    this.img = image;
  }

  get image() {
    return this.img;
  }

  setPixels(increment, transparency, scale) {
    let yOff = 0;

    for (let y = 0; y < this.img.height; y++) {
      let xOff = 0;

      for (let x = 0; x < this.img.width; x++) {
        let angle = noise(xOff, yOff) * 255;
        xOff += increment;

        const vector = p5.Vector.fromAngle(angle);
        stroke(0);

        push();
        translate(x * scale, y * scale);
        rotate(vector.heading());
        line(0, 0, scale, 0);
        pop();
      }
      yOff += increment;
    }
  }
}
