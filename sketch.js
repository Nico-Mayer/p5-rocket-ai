let population;
let lifespan = 300;
let count = 0;
let generation = 0;
let lifespanTracker;
let genTracker;
let traget;
let rx;
let ry;
let rw;
let rh;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rw = windowWidth * 0.55;
  rx = windowWidth / 2 - rw / 2;
  ry = windowHeight * 0.35;
  rh = 20;

  population = new Population();
  lifespanTracker = createP();
  lifespanTracker.position(30, 35);
  genTracker = createP();
  genTracker.position(30, 10);
  target = createVector(windowWidth / 2, windowHeight * 0.1);
}

function draw() {
  background(55);
  ellipse(target.x, target.y, 20, 20);
  createObstacle();
  genTracker.html("Generation: " + generation);
  lifespanTracker.html("Lifespan: " + count);
  population.run();
  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    generation++;
    count = 0;
  }
}
function createObstacle() {
  push();
  fill(255);
  rect(rx, ry, rw, rh);
  pop();
}
