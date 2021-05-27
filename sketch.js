let population;
let lifespan = 300;
let count = 0;
let lifespanTracker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  population = new Population();
  lifespanTracker = createP();
  lifespanTracker.position(30, windowHeight - 50);
}

function draw() {
  background(55);
  lifespanTracker.html(count);
  population.run();
  count++;
}

function DNA() {
  this.genes = [];

  for (var i = 0; i < lifespan; i++) {
    this.genes[i] = p5.Vector.random2D();
  }
}

function Population() {
  this.size = 100;
  this.rockets = [];

  for (let i = 0; i < this.size; i++) {
    this.rockets[i] = new Rocket();
  }

  this.run = function () {
    for (let i = 0; i < this.size; i++) {
      this.rockets[i].render();
      this.rockets[i].update();
    }
  };
}
