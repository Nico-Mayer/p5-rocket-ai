function Rocket(dna) {
  this.position = createVector(windowWidth / 2, windowHeight - 20);
  this.vel = createVector();
  this.acc = createVector();
  this.red = random(255);
  this.green = random(255);
  this.blue = random(255);
  this.fitness = 0;
  this.completed = false;
  this.crashed = false;
  this.time = 0;
  this.alive = true;
  this.trail = [];

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

  this.addForce = function (force) {
    this.acc.add(force);
  };

  this.update = function () {
    var d = dist(this.position.x, this.position.y, target.x, target.y);
    if (d < 20) {
      this.completed = true;
    }
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.position.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(8);
      this.time++;
    }
    if (this.crashed) {
      if (this.alive) {
        alive--;
        this.alive = false;
      }
    }
    var v = createVector(this.position.x, this.position.y);
    this.trail.push(v);
    if (this.trail.length > 60) {
      this.trail.splice(0, 1);
    }

    this.checkForCrash();
    this.addForce(this.dna.genes[count]);
  };

  this.render = function () {
    push();
    var d = dist(this.position.x, this.position.y, target.x, target.y);
    fill(255);
    textSize(18);
    text(floor(d), this.position.x, this.position.y - 10);
    this.renderTrail();
    translate(this.position.x, this.position.y);
    rotate(this.vel.heading());
    noStroke();
    fill(this.red, this.green, this.blue, 150);
    rectMode(CENTER);
    rect(0, 0, 27, 7);

    pop();
  };

  this.calcFitness = function () {
    var d = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = 1 / d;
    if (this.completed) {
      this.fitness *= 20 * (200 / this.time);
    }
    if (this.crashed) {
      this.fitness = this.fitness / 10;
    }
  };
  this.checkForCrash = function () {
    for (i = 0; i < obstacles.length; i++) {
      if (obstacles[i].checkCollision(this.position.x, this.position.y)) {
        this.crashed = true;
      }
    }
    // Check for Wall Crash
    if (
      this.position.x < 0 ||
      this.position.x > windowWidth ||
      this.position.y < 0 ||
      this.position.y > windowHeight
    ) {
      this.crashed = true;
    }
  };

  this.renderTrail = function () {
    stroke(this.red, this.green, this.blue, 80);
    beginShape();
    noFill();
    strokeWeight(3);
    for (var i = 0; i < this.trail.length; i++) {
      var v = this.trail[i];
      vertex(v.x, v.y);
    }
    endShape();
  };
}
