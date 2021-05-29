let population;
let lifespan = 350;
let count = 0;
let generation = 0;
let alive;
let lifespanTracker;
let aliveTracker;
let genTracker;
let crashedTracker;
let traget;
let obstacles;
let distanceBtn = document.getElementById("distanceBtn");
let trailBtn = document.getElementById("trailBtn");
let showDistance = false;
let showTrail = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  obstacles = [];
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

  population = new Population();
  alive = population.size;
  setupInfos();
  target = createVector(windowWidth / 2, windowHeight * 0.1);
}

function draw() {
  background(55);
  fill(255, 133, 23);
  noStroke();
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
  for (i = 0; i < obstacles.length; i++) {
    obstacles[i].render();
  }
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
  lifespanTracker.html("Lifespan: " + count + "/" + lifespan);
  aliveTracker.html("Alive: " + alive);
  crashedTracker.html("Crashed: " + (population.size - alive));
}
