// eslint-disable-next-line no-unused-vars
class Boid extends p5.Vector {
  constructor(x, y, z) {
    super(x, y, z);

    // this.velocity = p5.Vector.random3D().setMag(random(2, 4));
    this.velocity = createVector(-1, 1, 0).setMag(random(2, 4));
    this.acceleration = createVector(0, 0, 0);
    this.maxSpeed = 0.1;
    this.maxForce = 0.2; // limits magnitude of steering
    this.size = 4;
    this.theta = PI / 2;
    this.lookAhead = 20;
    this.perceptionRadius = 50;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  seek(target, arrive = false) {
    const force = p5.Vector.sub(target, this);
    let desiredSpeed = this.maxSpeed;

    if (arrive) {
      const distance = force.mag();
      const threshold = 100;
      desiredSpeed = map(distance, 0, threshold, 0, this.maxSpeed);
    }

    force.setMag(desiredSpeed);
    force.sub(this.velocity);
    force.limit(this.maxForce);
    return force;
  }

  arrive(target) {
    return this.seek(target, true);
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  pursue(vehicle) {
    const target = vehicle.copy();
    const prediction = vehicle.velocity.copy();
    prediction.mult(16);
    target.add(prediction);

    fill(0, 255, 0);
    circle(target.x, target.y, 16);

    return this.seek(target);
  }

  evade(vehicle) {
    let pursuit = this.pursue(vehicle);
    pursuit.mult(-1);
    return pursuit;
  }

  bounceEdges() {
    if (this.y >= height - this.size) {
      // bottom border
      this.y = height - this.size;
      this.velocity.y *= -1;
    } else if (this.y <= this.size) {
      // top border
      this.y = this.size;
      this.velocity.y *= -1;
    }

    if (this.x >= width - this.size) {
      // right border
      this.x = width - this.size;
      this.velocity.x *= -1;
    } else if (this.x <= this.size) {
      // left border
      this.x = this.size;
      this.velocity.x *= -1;
    }
  }

  teleportEdges() {
    if (this.y >= height + this.size) {
      // bottom border
      this.y = 0 - this.size;
    } else if (this.y <= 0 - this.size) {
      // top border
      this.y = height + this.size;
    }

    if (this.x >= width + this.size) {
      // right border
      this.x = 0 - this.size;
    } else if (this.x <= 0 - this.size) {
      // left border
      this.x = width + this.size;
    }
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

  update() {
    this.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.set(0, 0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);

    // push();
    // translate(this.x, this.y, this.z);
    // rotate(this.velocity.heading());
    // // const ax = atan2(sqrt(sq(this.velocity.y) + sq(this.velocity.z)), this.velocity.x);
    // // const ay = atan2(sqrt(sq(this.velocity.z) + sq(this.velocity.x)), this.velocity.y);
    // // const az = atan2(sqrt(sq(this.velocity.x) + sq(this.velocity.y)), this.velocity.z);
    // // rotate(this.velocity.angleBetween(createVector(1, 0, 0)), [1, 0, 0]);
    // // rotate(this.velocity.angleBetween(createVector(0, 1, 0)), [0, 1, 0]);
    // // rotate(this.velocity.angleBetween(createVector(0, 0, 1)), [0, 0, 1]);
    // // // console.log(this.velocity.angleBetween(createVector(1, 0, 0)));)
    // triangle(-this.size, -this.size / 2, -this.size, this.size / 2, this.size, 0);
    // pop();

    // const ax = atan2(sqrt(sq(this.velocity.y) + sq(this.velocity.z)), this.velocity.x);
    // const ay = atan2(sqrt(sq(this.velocity.z) + sq(this.velocity.x)), this.velocity.y);
    // const az = atan2(sqrt(sq(this.velocity.x) + sq(this.velocity.y)), this.velocity.z);
    // rotate(ax, [1, 0, 0]);
    // rotate(ay, [0, 1, 0]);
    // rotate(az, [0, 0, 1]);

    normalMaterial();

    // body
    push();
    translate(this.x, this.y, this.z);
    ellipsoid(this.size * 2, this.size / 2, this.size / 2);
    pop();

    // eye left
    push();
    translate(this.x + -5.5, this.y, this.z + 1);
    sphere(0.5);
    pop();

    // eye right
    push();
    translate(this.x + -5.5, this.y, this.z - 1);
    sphere(0.5);
    pop();

    // fin left
    push();
    translate(this.x + -2, this.y, this.z + 2);
    rotate(radians(60), [0, 1, 0]);
    ellipsoid(this.size / 6, this.size / 10, this.size);
    pop();

    // fin right
    push();
    translate(this.x + -2, this.y, this.z - 2);
    rotate(radians(-60), [0, 1, 0]);
    ellipsoid(this.size / 6, this.size / 10, this.size);
    pop();

    // fin top
    push();
    translate(this.x, this.y - 1.5, this.z);
    rotate(radians(90), [1, 0, 0]);
    rotate(radians(80), [0, 1, 0]);
    ellipsoid(this.size / 6, this.size / 10, this.size);
    pop();
  }
}
