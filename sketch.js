let population;
let lifespan = 300;
let count = 0;
let lifespanTracker;
let traget;

function setup() {
  createCanvas(windowWidth, windowHeight);
  population = new Population();
  lifespanTracker = createP();
  lifespanTracker.position(30, windowHeight - 50);
  target = createVector(windowWidth / 2, windowHeight * 0.1);
}

function draw() {
  background(55);
  ellipse(target.x, target.y, 20, 20);
  lifespanTracker.html(count);
  population.run();
  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
  }
}

function DNA(genes) {
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
}
