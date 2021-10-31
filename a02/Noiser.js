// const gradientValue = ({ val, max = Math.min(width, height), inv = false }) =>
// inv ? map(val, 0, max, 255, 0) : map(val, 0, max, 0, 255);

class Noiser {
  constructor(image, transparency, increment) {
    this.img = image;
    this.trans = transparency;
    this.inc = increment;
  }

  get image() {
    return this.img;
  }

  setPixels() {
    this.img.loadPixels();
    let yOff = 0;

    for (let y = 0; y < this.img.height; y++) {
      let xOff = 0;

      for (let x = 0; x < this.img.width; x++) {
        let index = (x + y * this.img.width) * 4;
        let rand = noise(xOff, yOff) * 255;
        const [r, g, b, brightness] = color(rand, this.trans).levels;

        this.img.pixels[index + 0] = r;
        this.img.pixels[index + 1] = g;
        this.img.pixels[index + 2] = b;
        this.img.pixels[index + 3] = brightness;

        xOff += this.inc;
      }
      yOff += this.inc;
    }

    this.image.updatePixels();
  }
}
