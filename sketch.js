let population;
let lifespan = 500;
let count = 0;
let generation = 0;
let alive;
let lifespanTracker;
let aliveTracker;
let genTracker;
let crashedTracker;
let traget;
let rx;
let ry;
let rw;
let rh;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rw = windowWidth * 0.45;
  rx = windowWidth / 2 - rw / 2;
  ry = windowHeight * 0.35;
  rh = 40;
  population = new Population();
  alive = population.size;
  setupInfos();
  target = createVector(windowWidth / 2, windowHeight * 0.1);
}

function draw() {
  background(55);
  ellipse(target.x, target.y, 40, 40);
  renderInfos();
  population.run();
  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    generation++;
    hits = 0;
    count = 0;
    alive = population.size;
  }
  createObstacle();
}
function createObstacle() {
  push();
  fill(255);
  rect(rx, ry, rw, rh);
  pop();
}

function setupInfos() {
  genTracker = createP();
  genTracker.position(30, 10);
  lifespanTracker = createP();
  lifespanTracker.position(30, 35);
  aliveTracker = createP();
  aliveTracker.position(30, 60);
  crashedTracker = createP();
  crashedTracker.position(30, 85);
}
function renderInfos() {
  genTracker.html("Generation: " + generation);
  lifespanTracker.html("Lifespan: " + count + "/" + lifespan);
  aliveTracker.html("Alive: " + alive);
  crashedTracker.html("Crashed: " + (population.size - alive));
}
