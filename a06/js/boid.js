// eslint-disable-next-line no-unused-vars
class Boid extends p5.Vector {
  constructor(x, y, z) {
    super(x, y, z);

    this.velocity = p5.Vector.random3D().setMag(random(2, 4));
    // this.velocity = createVector(-1, 1, 0).setMag(random(2, 4));
    this.acceleration = createVector(0, 0, 0);
    this.heading = createVector(1, 1, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.2; // limits magnitude of steering
    this.size = 4;
    this.theta = PI / 2;
    this.lookAhead = 20;
    this.perceptionRadius = 50;
    this.color = color(random(255), random(255), random(255));
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  pursue(object) {
    const target = object.copy();
    const prediction = object.velocity.copy();
    prediction.mult(16);
    target.add(prediction);

    fill(0, 255, 0);
    circle(target.x, target.y, 16);

    return this.seek(target);
  }

  evade(object) {
    let pursuit = this.pursue(object);
    pursuit.mult(-1);
    return pursuit;
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
      difference.div(distance);
      steeringForce.add(difference);
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

    this.acceleration.add(this.alignWith(closestBoids));
    this.acceleration.add(this.cohesionWith(closestBoids));
    this.acceleration.add(this.separationFrom(closestBoids));
  }

  bounceWalls(walls) {
    walls.map(([min, max], idx) => {
      switch (idx) {
        case 0: // xRange
          if (this.x >= max) {
            this.x = max;
            this.velocity.x *= -1;
          } else if (this.x <= min) {
            this.x = min;
            this.velocity.x *= -1;
          }
          break;
        case 1: // yRange
          if (this.y >= max) {
            this.y = max;
            this.velocity.y *= -1;
          } else if (this.y <= min) {
            this.y = min;
            this.velocity.y *= -1;
          }
          break;
        case 2: // zRange
          if (this.z >= max) {
            this.z = max;
            this.velocity.x *= -1;
          } else if (this.z <= min) {
            this.z = min;
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

    // sphere(0.1);
    // stroke(0);
    // strokeWeight(3);
    // line(0, 0, 0, this.heading.x, this.heading.y, this.heading.z);

    // translate(this.heading);
    // sphere(0.1);

    rotate(radians(45), [0, 0, 1]);
    rotate(radians(180), [0, 1, 0]);

    // body
    push();
    ellipsoid(this.size * 2, this.size / 2, this.size / 2);
    pop();

    // eye left
    push();

    fill(lerpColor(this.color, color(0), 0.5));
    translate(-5.5, 0, 1);
    sphere(0.5);
    pop();

    // eye right
    push();
    fill(lerpColor(this.color, color(0), 0.5));
    translate(-5.5, 0, -1);
    sphere(0.5);
    pop();

    // fin left
    push();
    fill(lerpColor(this.color, color(255), 0.5));
    translate(-2, 0, 2);
    rotate(radians(60), [0, 1, 0]);
    ellipsoid(this.size / 6, this.size / 10, this.size);
    pop();

    // fin right
    push();
    fill(lerpColor(this.color, color(255), 0.5));
    translate(-2, 0, -2);
    rotate(radians(-60), [0, 1, 0]);
    ellipsoid(this.size / 6, this.size / 10, this.size);
    pop();

    // fin top
    push();
    fill(lerpColor(this.color, color(255), 0.5));
    translate(0, -1, 0);
    rotate(radians(90), [1, 0, 0]);
    rotate(radians(70), [0, 1, 0]);
    ellipsoid(this.size / 3, this.size / 10, this.size);
    pop();

    // back fin top
    push();
    fill(lerpColor(this.color, color(255), 0.5));
    translate(8, -1, 0);
    rotate(radians(90), [1, 0, 0]);
    rotate(radians(30), [0, 1, 0]);
    ellipsoid(this.size / 5, this.size / 10, this.size / 2);
    pop();

    // back fin bottom
    push();
    fill(lerpColor(this.color, color(255), 0.5));
    translate(8, 1, 0);
    rotate(radians(-90), [1, 0, 0]);
    rotate(radians(30), [0, 1, 0]);
    ellipsoid(this.size / 5, this.size / 10, this.size / 2);
    pop();

    pop();
  }
}
