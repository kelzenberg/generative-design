// eslint-disable-next-line no-unused-vars
class Aquarium extends p5.Vector {
  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z);
    this.glassColor = color(200, 250, 250, 127);
    this.width = 300;
    this.height = 100;
    this.depth = 200;
    this.wallThickness = 5;
  }

  show() {
    // Room ceiling lights
    pointLight(255, 255, 255, createVector(-this.width * 1.5, 500, -this.depth * 1.5));
    pointLight(255, 255, 255, createVector(0, 500, this.depth));

    // Glass material
    noStroke();
    specularMaterial(this.glassColor);
    shininess(20);

    // back wall
    push();
    translate(0, 0, -this.depth / 2 - this.wallThickness / 2);
    box(this.width + this.wallThickness, this.height, this.wallThickness);
    pop();

    // front wall
    push();
    translate(0, 0, this.depth / 2 + this.wallThickness / 2);
    box(this.width + this.wallThickness, this.height, this.wallThickness);
    pop();

    // left wall
    push();
    translate(-this.width / 2, 0, 0);
    rotate(radians(90), [0, 1, 0]);
    box(this.depth, this.height, this.wallThickness);
    pop();

    // right wall
    push();
    translate(this.width / 2, 0, 0);
    rotate(radians(90), [0, 1, 0]);
    box(this.depth, this.height, this.wallThickness);
    pop();

    // floor
    push();
    specularMaterial(180, 235, 235, 127);
    translate(0, this.height / 2 + this.wallThickness / 2, this.wallThickness / 2);
    rotate(radians(90), [1, 0, 0]);
    box(this.width + this.wallThickness * 2, this.depth + this.wallThickness * 2, this.wallThickness);
    pop();

    // water
    push();
    specularMaterial(30, 130, 175, 200);
    shininess(5);
    const offset = this.height * 0.2;
    translate(0, offset - this.wallThickness * 2 + 2, 0);
    box(this.width - this.wallThickness + 2, this.height - offset, this.depth + 2);
    pop();
  }
}
