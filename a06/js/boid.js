// eslint-disable-next-line no-unused-vars
class Boid extends p5.Vector {
  constructor(x, y, z, colour = color(random(42, 255), random(42, 255), random(42, 255))) {
    super(x, y, z);

    this.velocity = p5.Vector.random3D().setMag(random(2, 4));
    // this.velocity = createVector(-1, 1, 0).setMag(random(2, 4));
    this.acceleration = createVector(0, 0, 0);
    this.heading = createVector(1, 1, 0);
    this.maxSpeed = 0.5;
    this.maxForce = 0.2; // limits magnitude of steering
    this.size = 0.5; // default: 1
    this.theta = PI / 2;
    this.lookAhead = 20;
    this.perceptionRadius = 50;
    this.color = colour;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  seek(target) {
    const force = p5.Vector.sub(target, this);
    let desiredSpeed = this.maxSpeed;

    force.setMag(desiredSpeed);
    force.sub(this.velocity);
    force.limit(this.maxForce);
    return force;
  }

  pursue(boid) {
    const target = boid.copy();
    const prediction = boid.velocity.copy();
    prediction.mult(16);
    target.add(prediction);

    return this.seek(target);
  }

  evade(boid) {
    let pursuit = this.pursue(boid);
    this.applyForce(pursuit.mult(-1));
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

  avoidWalls(walls) {
    const wallVectors = [
      createVector(walls[0][0], this.y, this.z), // left
      createVector(walls[0][1], this.y, this.z), // right
      createVector(this.x, walls[1][0], this.z), // top
      createVector(this.x, walls[1][1], this.z), // bottom
      createVector(this.x, this.y, walls[2][0]), // back
      createVector(this.x, this.y, walls[2][1]), // front
    ];

    const distances = wallVectors.map(v => dist(this.x, this.y, this.z, v.x, v.y, v.z));
    const minDistance = Math.min(...distances);
    const nearestWall = wallVectors[distances.indexOf(minDistance)];

    push();
    translate(nearestWall);
    normalMaterial();
    sphere(1);
    pop();

    push();
    stroke(0);
    strokeWeight(2);
    line(this.x, this.y, this.z, nearestWall.x, nearestWall.y, nearestWall.z);
    pop();

    if (this.perceptionRadius / (this.size * 16) < minDistance) return;

    const fakeBoid = new Boid(nearestWall.x, nearestWall.y, nearestWall.z);
    fakeBoid.velocity = createVector(0, 0, 0);
    this.evade(fakeBoid);
  }

  bounceWalls(walls) {
    const bufferToWall = 6;

    walls.map(([min, max], idx) => {
      switch (idx) {
        case 0: // xRange
          if (this.x >= max - bufferToWall) {
            this.x = max - bufferToWall - 2;
            this.velocity.x *= -1;
          } else if (this.x <= min + bufferToWall) {
            this.x = min + bufferToWall + 2;
            this.velocity.x *= -1;
          }
          break;
        case 1: // yRange
          if (this.y >= max - bufferToWall) {
            this.y = max - bufferToWall - 2;
            this.velocity.y *= -1;
          } else if (this.y <= min + bufferToWall) {
            this.y = min + bufferToWall + 2;
            this.velocity.y *= -1;
          }
          break;
        case 2: // zRange
          if (this.z >= max - bufferToWall) {
            this.z = max - bufferToWall - 2;
            this.velocity.x *= -1;
          } else if (this.z <= min + bufferToWall) {
            this.z = min + bufferToWall + 2;
            this.velocity.x *= -1;
          }
          break;

        default:
          break;
      }
    });
  }

  update() {
    this.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.set(0, 0, 0);
  }

  show() {
    push();
    fill(this.color);

    translate(this.x, this.y, this.z);
    rotate(radians(45), [0, 0, 1]);
    rotate(radians(180), [0, 1, 0]);

    scale(this.size);

    // body
    push();
    ellipsoid(8, 2, 2);
    pop();

    const isShark = this.color.levels.join(',') == color(20).levels.join(',');
    // eye left
    push();
    fill(isShark ? color(255, 100, 100) : lerpColor(this.color, color(0), 0.5));
    translate(-5.5, 0, 1);
    sphere(0.5);
    pop();

    // eye right
    push();
    fill(isShark ? color(255, 100, 100) : lerpColor(this.color, color(0), 0.5));
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
    fill(lerpColor(this.color, color(255), 0.5));
    translate(0, -1, 0);
    rotate(radians(90), [1, 0, 0]);
    rotate(radians(70), [0, 1, 0]);
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
