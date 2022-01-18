// eslint-disable-next-line no-unused-vars
class Path {
  constructor(x1, y1, x2, y2) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
    this.radius = 20;
  }

  show() {
    stroke(255);
    strokeWeight(2);
    const { x: x1, y: y1 } = this.start;
    const { x: x2, y: y2 } = this.end;
    line(x1, y1, x2, y2);

    stroke(255, 100);
    strokeWeight(this.radius * 2);
    line(x1, y1, x2, y2);
  }
}
