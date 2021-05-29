function Population() {
  this.size = 400;
  this.rockets = [];
  this.matingpool = [];
  this.avgFitness = 0;

  for (let i = 0; i < this.size; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function () {
    let maxfit = 0;
    for (let i = 0; i < this.size; i++) {
      this.rockets[i].calcFitness();
      this.avgFitness += this.rockets[i].fitness;
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    for (let i = 0; i < this.size; i++) {
      this.rockets[i].fitness /= maxfit;
    }
    this.matingpool = [];

    for (let i = 0; i < this.size; i++) {
      let n = this.rockets[i].fitness * 60;
      for (let j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
    this.avgFitness = this.avgFitness / this.size;
  };

  this.selection = function () {
    let newrockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newrockets[i] = new Rocket(child);
    }
    this.rockets = newrockets;
  };

  this.run = function () {
    for (let i = 0; i < this.size; i++) {
      this.rockets[i].render();
      this.rockets[i].update();
    }
  };
}
