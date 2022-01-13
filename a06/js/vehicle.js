// eslint-disable-next-line no-unused-vars
class Vehicle extends p5.Vector {
  constructor(x, y) {
    super(x, y);

    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.1; // limits magnitude of steering
    this.lifetime = 255;
    this.size = 16;
    this.theta = PI / 2;
    this.lookAhead = 20;

    this.currentPath = [];
    this.paths = [this.currentPath];
  }

  isFinished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  wander() {
    const direction = this.velocity.copy();
    direction.setMag(100);
    direction.add(this);

    // fill(255, 0, 0);
    // noStroke();
    // circle(direction.x, direction.y, 16);

    const radius = 50;

    // noFill();
    // stroke(255);
    // circle(direction.x, direction.y, radius * 2);
    // line(this.x, this.y, direction.x, direction.y);

    const theta = this.theta + this.velocity.heading();
    const x = radius * cos(theta);
    const y = radius * sin(theta);
    direction.add(x, y);

    // fill(0, 255, 0);
    // noStroke();
    // circle(direction.x, direction.y, 16);
    // stroke(255);
    // line(this.x, this.y, direction.x, direction.y);

    const steer = direction.sub(this);
    steer.setMag(this.maxForce);
    this.applyForce(steer);

    const displaceRange = 0.3;
    this.theta += random(-displaceRange, displaceRange);
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

  edges() {
    let hitEdge = false;

    if (this.y >= height - this.size) {
      // bottom border
      this.y = height - this.size;
      this.velocity.y *= -1;
      hitEdge = true;
    } else if (this.y <= this.size) {
      // top border
      this.y = this.size;
      this.velocity.y *= -1;
      hitEdge = true;
    }

    if (this.x >= width - this.size) {
      // right border
      this.x = width - this.size;
      this.velocity.x *= -1;
      hitEdge = true;
    } else if (this.x <= this.size) {
      // left border
      this.x = this.size;
      this.velocity.x *= -1;
      hitEdge = true;
    }

    if (hitEdge) {
      // comment in if vehicle is not bouncing off wales but teleports
      //   this.currentPath = [];
      //   this.paths.push(this.currentPath);
    }
  }

  follow(path) {
    // calculate future position
    const futurePosition = this.velocity.copy();
    futurePosition.mult(this.lookAhead).add(this);

    fill(255, 0, 0);
    noStroke();
    circle(futurePosition.x, futurePosition.y, 16);

    // find target on path
    const target = findProjection(path.start, futurePosition, path.end);

    fill(0, 255, 0);
    noStroke();
    circle(target.x, target.y, 16);

    const distance = p5.Vector.dist(futurePosition, target);
    return distance > path.radius ? this.seek(target) : createVector(0, 0);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.add(this.velocity);
    this.acceleration.set(0, 0);
    // this.lifetime -= 1;

    // this.currentPath.push(this.copy());
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);

    push();
    translate(this.x, this.y);
    rotate(this.velocity.heading());
    triangle(-this.size, -this.size / 2, -this.size, this.size / 2, this.size, 0);
    pop();

    // for (const path of this.paths) {
    //   beginShape();
    //   noFill();
    //   for (const { x, y } of path) {
    //     vertex(x, y);
    //   }
    //   endShape();
    // }
  }
}

// eslint-disable-next-line no-unused-vars
class Target extends Vehicle {
  constructor(x, y) {
    super(x, y);
    // this.velocity = p5.Vector.random2D().mult(4);
  }

  show() {
    fill(255, 0, 0);
    noStroke();

    push();
    translate(this.x, this.y);
    circle(0, 0, this.size * 2);
    pop();
  }
}
