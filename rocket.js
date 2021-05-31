function Rocket(dna) {
  this.position = createVector(windowWidth / 2, windowHeight - 20);
  this.vel = createVector();
  this.acc = createVector();
  this.fitness = 0;
  this.completed = false;
  this.crashed = false;
  this.time = 0;
  this.alive = true;
  this.trail = [];
  this.isBest = false;

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
    // Check if Rocket hits Target
    if (d < targetSize / 2) {
      finished = true;
      this.completed = true;
      if (this.alive) {
        completed++;
        this.alive = false;
      }
    }
    // Check if Rocked is Crasehd
    if (this.crashed) {
      if (this.alive) {
        crashed++;
        alive--;
        this.alive = false;
      }
    }
    // Move Rocket
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.position.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(10);
      this.time++;
    }

    // Stores every location for the Trai
    if (showTrail) {
      var currPos = createVector(this.position.x, this.position.y);
      this.trail.push(currPos);
      if (this.trail.length > 65) {
        this.trail.splice(0, 1);
      }
    } else {
      this.trail = [];
    }

    this.checkForCrash();
    this.addForce(this.dna.genes[count]);
  };

  this.render = function () {
    var alpha = this.dna.alpha;
    if (this.isBest) {
      alpha = 255;
    }
    if (this.dna.colorMutate) {
      var alpha = random(255);
    }
    push();
    if (showDistance || this.isBest) {
      var d = dist(this.position.x, this.position.y, target.x, target.y);
      fill(255);
      textSize(18);
      text(floor(d), this.position.x, this.position.y - 10);
    }
    if (showTrail) {
      this.renderTrail();
    }
    translate(this.position.x, this.position.y);
    rotate(this.vel.heading());
    noStroke();
    fill(this.dna.red, this.dna.green, this.dna.blue, alpha);
    rectMode(CENTER);
    rect(0, 0, 27, 7);

    pop();
  };

  this.calcFitness = function () {
    var d = dist(this.position.x, this.position.y, target.x, target.y);
    if (this.completed) {
      this.fitness = 1.0 / 16 + 10000.0 / (this.time * this.time);
    } else {
      this.fitness = 1 / (d * d);
    }
    if (this.crashed) {
      this.fitness = this.fitness / (1500 / this.time);
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
    var alpha = this.dna.alphaTrail;
    if (this.dna.colorMutate) {
      alpha = random(255);
    }
    stroke(this.dna.redTrail, this.dna.greenTrail, this.dna.blueTrail, alpha);
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
