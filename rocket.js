function Rocket(dna) {
  this.position = createVector(windowWidth / 2, windowHeight - 20);
  this.vel = createVector();
  this.acc = createVector();
  this.fitness = 0;
  this.completed = false;

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
    this.addForce(this.dna.genes[count]);
    if (d < 5) {
      this.completed = true;
    }
    if (!this.completed) {
      this.vel.add(this.acc);
      this.position.add(this.vel);
      this.acc.mult(0);
    }
  };

  this.render = function () {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.vel.heading());
    noStroke();
    fill(255, 150);
    rectMode(CENTER);
    rect(0, 0, 27, 7);
    pop();
  };

  this.calcFitness = function () {
    var d = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = 1 / d;
    if (this.completed) {
      this.fitness *= 3;
    }
  };
}
