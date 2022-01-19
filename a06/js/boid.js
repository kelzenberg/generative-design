// eslint-disable-next-line no-unused-vars
class Boid extends p5.Vector {
  constructor(x, y, z) {
    super(x, y, z);

    // this.velocity = p5.Vector.random3D().setMag(random(2, 4));
    this.velocity = createVector(-1, 1, 0).setMag(random(2, 4));
    this.acceleration = createVector(0, 0, 0);
    this.heading = createVector(1, 1, 0);
    this.maxSpeed = 0.1;
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
    translate(-5.5, 0, 1);
    sphere(0.5);
    pop();

    // eye right
    push();
    translate(-5.5, 0, -1);
    sphere(0.5);
    pop();

    // fin left
    push();
    translate(-2, 0, 2);
    rotate(radians(60), [0, 1, 0]);
    ellipsoid(this.size / 6, this.size / 10, this.size);
    pop();

    // fin right
    push();
    translate(-2, 0, -2);
    rotate(radians(-60), [0, 1, 0]);
    ellipsoid(this.size / 6, this.size / 10, this.size);
    pop();

    // fin top
    push();
    translate(0, -1, 0);
    rotate(radians(90), [1, 0, 0]);
    rotate(radians(70), [0, 1, 0]);
    ellipsoid(this.size / 3, this.size / 10, this.size);
    pop();

    // back fin top
    push();
    translate(8, -1, 0);
    rotate(radians(90), [1, 0, 0]);
    rotate(radians(30), [0, 1, 0]);
    ellipsoid(this.size / 5, this.size / 10, this.size / 2);
    pop();

    // back fin bottom
    push();
    translate(8, 1, 0);
    rotate(radians(-90), [1, 0, 0]);
    rotate(radians(30), [0, 1, 0]);
    ellipsoid(this.size / 5, this.size / 10, this.size / 2);
    pop();

    pop();
  }
}
