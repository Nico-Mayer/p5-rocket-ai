function DNA(genes) {
  this.mutationRate = 0.002;
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
    }
  }

  this.crossover = function (partner) {
    let newgenes = [];
    let midpoint = floor(random(this.genes.length));
    for (var i = 0; i < partner.genes.length; i++) {
      if (i > midpoint) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  };

  this.mutation = function () {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < this.mutationRate) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.2);
      }
    }
  };
}
