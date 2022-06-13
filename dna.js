function DNA(genes, red, green, blue, redTrail, greenTrail, blueTrail) {
  this.colorMutate = false;
  this.alpha = 150;
  this.alphaTrail = 80;
  this.mutationRate = 0.003;
  this.highMutateGen = false;
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
    // Random gene Selection
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
    if (!finished && generation > 50) {
      this.mutationRate = 0.005;
    } else {
      this.mutationRate = 0.003;
    }
    if (generation != 0 && generation % 3 === 0) {
      this.mutationRate += 0.035;
      this.highMutateGen = true;
    }
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < this.mutationRate) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.5);
        mutated++;
      }
    }
    if (mutated > lifespan * 0.008 && !this.highMutateGen) {
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
