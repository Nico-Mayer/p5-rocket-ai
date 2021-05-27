function Rocket() {
  this.position = createVector(windowWidth / 2, windowHeight - 20);
  this.vel = createVector();
  this.acc = createVector();
  this.dna = new DNA();

  this.addForce = function (force) {
    this.acc.add(force);
  };

  this.update = function () {
    this.addForce(this.dna.genes[count]);
    this.vel.add(this.acc);
    this.position.add(this.vel);
    this.acc.mult(0);
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
}
