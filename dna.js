function DNA(genes, red, green, blue, redTrail, greenTrail, blueTrail) {
  this.mutationRate = 0.003;
  this.colorMutate = false;
  this.alpha = 150;
  this.alphaTrail = 80;
  if (genes) {
    this.genes = genes;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.redTrail = redTrail;
    this.greenTrail = greenTrail;
    this.blueTrail = blueTrail;
  } else {
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    this.redTrail = this.red;
    this.greenTrail = this.green;
    this.blueTrail = this.blue;
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
    }
  }

  this.crossover = function (partner) {
    let newgenes = [];
    // Midpoint Evolve
    /* let midpoint = floor(random(this.genes.length));
    for (var i = 0; i < partner.genes.length; i++) {
      if (i > midpoint) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    } */

    // Random gene Evolve
    for (var i = 0; i < partner.genes.length; i++) {
      var ran = random(0, 1);
      if (ran > 0.5) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }

    return new DNA(
      newgenes,
      this.red,
      this.green,
      this.blue,
      partner.redTrail,
      partner.greenTrail,
      partner.blueTrail
    );
  };

  this.mutation = function () {
    var mutated = 0;
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < this.mutationRate) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.2);
        mutated++;
      }
    }
    if (mutated > lifespan * 0.008) {
      this.colorMutate = true;
      this.red = random(255);
      this.green = random(255);
      this.blue = random(255);
      this.redTrail = random(255);
      this.greenTrail = random(255);
      this.blueTrail = random(255);
    }
  };
}
