// eslint-disable-next-line no-unused-vars
class Boid extends p5.Vector {
  constructor(x, y, z, colour = color(random(42, 255), random(42, 255), random(42, 255))) {
    super(x, y, z);

    this.velocity = p5.Vector.random3D().setMag(random(2, 4));
    this.acceleration = createVector(0, 0, 0);
    this.direction = createVector(0, 0, 0);
    this.heading = createVector(-1, 0, 0);
    this.maxSpeed = 0.05;
    this.maxForce = 0.2; // limits magnitude of steering
    this.size = 0.5; // default: 1
    this.theta = PI / 2;
    this.lookAhead = 20;
    this.perceptionRadius = 25;
    this.color = colour;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  pursue(boid) {
    const target = boid.copy();
    const prediction = boid.velocity.copy().mult(16);
    target.add(prediction);

    const difference = p5.Vector.sub(target, this);
    difference.setMag(this.maxSpeed);
    difference.sub(this.velocity);
    difference.limit(this.maxForce);
    return difference;
  }

  evade(boid) {
    return this.pursue(boid).mult(-1);
  }

  alignWith(boids) {
    const steeringForce = createVector();

    boids.forEach(boid => steeringForce.add(boid.velocity));

    steeringForce.div(boids.length);
    steeringForce.setMag(this.maxSpeed);
    steeringForce.sub(this.velocity);
    steeringForce.limit(this.maxForce);

    return steeringForce;
  }

  cohesionWith(boids) {
    const steeringForce = createVector();

    boids.forEach(boid => steeringForce.add(boid));

    steeringForce.div(boids.length);
    steeringForce.sub(this);
    steeringForce.setMag(this.maxSpeed);
    steeringForce.sub(this.velocity);
    steeringForce.limit(this.maxForce);

    return steeringForce;
  }

  separationFrom(boids) {
    const steeringForce = createVector();

    boids.forEach(boid => {
      const difference = p5.Vector.sub(this, boid);
      const distance = dist(this.x, this.y, this.z, boid.x, boid.y, boid.z);

      if (distance != 0) {
        difference.div(distance);
        steeringForce.add(difference);
      }
    });

    steeringForce.div(boids.length);
    steeringForce.setMag(this.maxSpeed);
    steeringForce.sub(this.velocity);
    steeringForce.limit(this.maxForce);

    return steeringForce;
  }

  flockWith(boids) {
    const closestBoids = boids.filter(
      boid => boid != this && dist(this.x, this.y, this.z, boid.x, boid.y, boid.z) < this.perceptionRadius
    );

    if (closestBoids.length <= 0) return;

    this.applyForce(this.alignWith(closestBoids));
    this.applyForce(this.cohesionWith(closestBoids));
    this.applyForce(this.separationFrom(closestBoids));
  }

  avoidBoid(boid) {
    const distance = dist(this.x, this.y, this.z, boid.x, boid.y, boid.z);

    if (distance < this.perceptionRadius / 2) {
      this.applyForce(this.evade(boid).limit(this.maxForce));
    }
  }

  avoidWalls(walls) {
    const wallVectors = [
      createVector(walls[0][0], this.y, this.z), // left
      createVector(walls[0][1], this.y, this.z), // right
      createVector(this.x, walls[1][0], this.z), // top
      createVector(this.x, walls[1][1], this.z), // bottom
      createVector(this.x, this.y, walls[2][0]), // back
      createVector(this.x, this.y, walls[2][1]), // front
    ];

    const distances = wallVectors.map(wall => dist(this.x, this.y, this.z, wall.x, wall.y, wall.z));
    const minDistance = Math.min(...distances);
    const nearestWall = wallVectors[distances.indexOf(minDistance)];

    push();
    stroke(0);
    strokeWeight(5);
    line(this.x, this.y, this.z, nearestWall.x, nearestWall.y, nearestWall.z);

    noStroke();
    translate(nearestWall.x, nearestWall.y, nearestWall.z);
    normalMaterial();
    sphere(1);
    pop();

    const fakeBoid = new Boid(nearestWall.x, nearestWall.y, nearestWall.z);
    fakeBoid.velocity = createVector(0, 0, 0);
    const evadeForce = this.evade(fakeBoid);

    const foo = p5.Vector.sub(nearestWall, evadeForce).add(nearestWall);

    push();
    stroke(0, 255, 0);
    strokeWeight(5);
    line(nearestWall.x, nearestWall.y, nearestWall.z, foo.x, foo.y, foo.z);

    noStroke();
    translate(foo.x, foo.y, foo.z);
    fill(0, 255, 0);
    // sphere(1);
    pop();

    if (this.perceptionRadius / (this.size * 16) < minDistance) return;
    this.applyForce(evadeForce);
  }

  resetPosition(width, height, depth) {
    if (abs(this.x) > width / 2 || abs(this.y) > height / 2 || abs(this.z) > depth / 2) {
      const { x, y, z } = createVector(0, 0, 0);
      this.x = x;
      this.y = y;
      this.z = z;
      this.velocity = p5.Vector.random3D().setMag(random(2, 4));
    }
  }

  update() {
    const oldPosition = this.copy();
    this.add(this.velocity);

    this.direction = p5.Vector.sub(this, oldPosition);
    const dirLocal = this.direction.copy().mult(500).add(this);

    push();
    stroke(0, 200, 255);
    strokeWeight(12);
    line(this.x, this.y, this.z, dirLocal.x, dirLocal.y, dirLocal.z);

    noStroke();
    translate(dirLocal.x, dirLocal.y, dirLocal.z);
    fill(0, 200, 255);
    sphere(1);
    pop();

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.set(0, 0, 0);
  }

  // credit to my brother Gerrit Ansorge because I have no clue about 3D heading calculations
  rotateToHeading() {
    const { x: dx, y: dy, z: dz } = this.direction;
    const { x: hx, y: hy, z: hz } = this.heading;

    const axOver = dy * hy + dz * hz;
    const axUnder = sqrt(sq(dy) + sq(dz)) * sqrt(sq(hy) + sq(hz));
    const ax = axUnder === 0 ? 0 : acos(axOver / axUnder);

    const ayOver = dx * hx + dz * hz;
    const ayUnder = sqrt(sq(dx) + sq(dz)) * sqrt(sq(hx) + sq(hz));
    const ay = ayUnder === 0 ? 0 : acos(ayOver / ayUnder);

    const azOver = dx * hx + dy * hy;
    const azUnder = sqrt(sq(dx) + sq(dy)) * sqrt(sq(hx) + sq(hy));
    const az = azUnder === 0 ? 0 : acos(azOver / azUnder);

    const rx = hy * dz - hz * dy;
    const ry = hz * dx - hx * dz;
    const rz = hx * dy - hy * dx;

    const xRadian = rx <= 0 ? ax * -1 : ax;
    const yRadian = ry <= 0 ? ay * -1 : ay;
    const zRadian = rz <= 0 ? az * -1 : az;

    rotate(xRadian, [1, 0, 0]);
    rotate(yRadian, [0, 1, 0]);
    rotate(zRadian, [0, 0, 1]);
  }

  show() {
    push();
    fill(this.color);

    translate(this.x, this.y, this.z);

    this.rotateToHeading();
    // TODO: only rotation on Z-axis

    // rotate(radians(45), [0, 0, 1]);
    // rotate(radians(180), [0, 1, 0]);

    const xAxis = createVector(10, 0, 0);
    const yAxis = createVector(0, 10, 0);
    const zAxis = createVector(0, 0, 10);

    push();
    strokeWeight(10);
    stroke(255, 0, 0); // red = x
    line(0, 0, 0, xAxis.x, xAxis.y, xAxis.z);
    stroke(0, 255, 0); // green = y
    line(0, 0, 0, yAxis.x, yAxis.y, yAxis.z);
    stroke(0, 0, 255); // blue = z
    line(0, 0, 0, zAxis.x, zAxis.y, zAxis.z);
    pop();

    push();
    rotateZ(-millis() / 1000);
    noFill();
    stroke(255);
    strokeWeight(5);
    box(5, 5, 5);
    pop();

    const isShark = this.color.levels.join(',') == color(20).levels.join(',');
    scale(isShark ? this.size * 2 : this.size);

    // body
    push();
    ellipsoid(8, 2, 2);
    pop();

    // eye left
    push();
    fill(isShark ? color(220, 50, 50) : lerpColor(this.color, color(0), 0.5));
    translate(-5.5, 0, 1);
    sphere(0.5);
    pop();

    // eye right
    push();
    fill(isShark ? color(220, 50, 50) : lerpColor(this.color, color(0), 0.5));
    translate(-5.5, 0, -1);
    sphere(0.5);
    pop();

    // fin left
    push();
    fill(lerpColor(this.color, color(255), 0.5));
    translate(-2, 0, 2);
    rotate(radians(60), [0, 1, 0]);
    ellipsoid(0.66, 0.4, 4);
    pop();

    // fin right
    push();
    fill(lerpColor(this.color, color(255), 0.5));
    translate(-2, 0, -2);
    rotate(radians(-60), [0, 1, 0]);
    ellipsoid(0.66, 0.4, 4);
    pop();

    // fin top
    push();
    if (isShark) {
      fill(lerpColor(this.color, color(255, 0, 0), 0.4));
      translate(0, -1.5, 0);
      rotate(radians(90), [1, 0, 0]);
      rotate(radians(40), [0, 1, 0]);
    } else {
      fill(lerpColor(this.color, color(255), 0.5));
      translate(0, -1, 0);
      rotate(radians(90), [1, 0, 0]);
      rotate(radians(70), [0, 1, 0]);
    }
    ellipsoid(1.33, 0.4, 4);
    pop();

    // back fin top
    push();
    fill(lerpColor(this.color, color(255), 0.5));
    translate(8, -1, 0);
    rotate(radians(90), [1, 0, 0]);
    rotate(radians(30), [0, 1, 0]);
    ellipsoid(0.8, 0.4, 2);
    pop();

    // back fin bottom
    push();
    fill(lerpColor(this.color, color(255), 0.5));
    translate(8, 1, 0);
    rotate(radians(-90), [1, 0, 0]);
    rotate(radians(30), [0, 1, 0]);
    ellipsoid(0.8, 0.4, 2);
    pop();

    pop();
  }
}
