function Population() {
  this.size = 200;
  this.rockets = [];
  this.matingpool = [];
  this.avgFitness = 0;
  this.pickRate = 0.01;

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
    var bestRockets = this.chooseBest();
    for (let i = 0; i < bestRockets.length; i++) {
      newrockets[i] = new Rocket(bestRockets[i].dna);
      newrockets[i].isBest = true;
    }

    for (let i = bestRockets.length; i < this.rockets.length; i++) {
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
      if (simulating) {
        this.rockets[i].update();
      }
    }
  };

  this.chooseBest = function () {
    var amountPicked = floor(this.size * this.pickRate);
    if (amountPicked < 1) {
      amountPicked = 1;
    }
    var bestRockets = [];
    //
    var sortedRockets = this.rockets.sort((a, b) => {
      if (a.fitness < b.fitness) {
        return 1;
      } else {
        return -1;
      }
    });

    for (let i = 0; i < amountPicked; i++) {
      bestRockets.push(sortedRockets[i]);
    }
    return bestRockets;
  };
}
