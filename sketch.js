let population;
let lifespan = 800;
let count = 0;
let generation = 0;
let targetSize = 60;
let alive;
let completed = 0;
let crashed = 0;

// Menu Trackers
let genTracker;
let avgFitnessTracker;
let lifespanTracker;
let aliveTracker;
let crashedTracker;
let distanceBtn = document.getElementById("distanceBtn");
let trailBtn = document.getElementById("trailBtn");

let traget;
let obstacles;
let showDistance = false;
let showTrail = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  obstacles = [];
  createObstacles();

  population = new Population();
  alive = population.size;
  setupInfos();
  target = createVector(windowWidth / 2, windowHeight * 0.1);
}

function draw() {
  background(55);
  renderTarget();
  renderInfos();
  population.run();
  count++;
  if (
    count == lifespan ||
    alive == 0 ||
    crashed + completed == population.size
  ) {
    population.evaluate();
    population.selection();
    generation++;
    hits = 0;
    count = 0;
    alive = population.size;
    crashed = 0;
    completed = 0;
  }
  for (i = 0; i < obstacles.length; i++) {
    obstacles[i].render();
  }
}

function setupInfos() {
  genTracker = createP();
  genTracker.position(30, 10);
  avgFitnessTracker = createP();
  avgFitnessTracker.position(30, 35);
  lifespanTracker = createP();
  lifespanTracker.position(30, 60);
  aliveTracker = createP();
  aliveTracker.position(30, 85);
  crashedTracker = createP();
  crashedTracker.position(30, 110);

  //Buttons
  distanceBtn.onclick = function () {
    showDistance = !showDistance;
  };
  trailBtn.onclick = function () {
    showTrail = !showTrail;
  };
}

function renderInfos() {
  genTracker.html("Generation: " + generation);
  avgFitnessTracker.html(
    "Avg Fitness: " + floor(population.avgFitness * 100000)
  );
  lifespanTracker.html("Lifespan: " + count + "/" + lifespan);
  aliveTracker.html("Alive: " + alive);
  crashedTracker.html("Crashed: " + crashed);
}

function renderTarget() {
  fill("#4c4cff");
  noStroke();
  ellipse(target.x, target.y, targetSize, targetSize);
  fill("#FF4C4C");
  ellipse(target.x, target.y, 45, 45);
  fill("#FFFF7F");
  ellipse(target.x, target.y, 25, 25);
}

function createObstacles() {
  obstacles[0] = new Obstacle(
    "RECT",
    windowWidth / 2 - (windowWidth * 0.45) / 2,
    windowHeight * 0.35,
    windowWidth * 0.45,
    35
  );
  obstacles[1] = new Obstacle(
    "RECT",
    windowWidth - 400,
    windowHeight * 0.55,
    190,
    35
  );
  obstacles[2] = new Obstacle("RECT", 200, windowHeight * 0.25, 270, 35);
  obstacles[3] = new Obstacle("RECT", 900, 50, 30, 190);
  obstacles[4] = new Obstacle(
    "ELLIPSE",
    windowWidth / 2,
    windowHeight * 0.75,
    70,
    70
  );

  /* obstacles[0] = new Obstacle(
    "RECT",
    0,
    windowHeight * 0.65,
    windowWidth - 400,
    35
  );
  obstacles[1] = new Obstacle(
    "RECT",
    0 + 400,
    windowHeight * 0.35,
    windowWidth - 400,
    35
  ); */
}
