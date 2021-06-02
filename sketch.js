let population;
var multiplier = 100000000;
let lifespan = 800;
let count = 0;
let generation = 0;
let targetSize = 60;
let alive;
let completed = 0;
let crashed = 0;
let editMode = false;
let simulating = true;
let finished = false;

// Menu Trackers
let genTracker = document.getElementById("generationTracker");
let avgFitnessTracker = document.getElementById("avgFitnessTracker");
let lifespanTracker = document.getElementById("livespanTracker");
let aliveTracker = document.getElementById("aliveTracker");
let crashedTracker = document.getElementById("crashedTracker");

let distanceBtn = document.getElementById("distanceBtn");
let trailBtn = document.getElementById("trailBtn");
let editBtn = document.getElementById("editBtn");
let playBtn = document.getElementById("playBtn");

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

  if (!editMode) {
    if (
      count == lifespan ||
      alive == 0 ||
      crashed + completed == population.size
    ) {
      population.evaluate();
      population.selection();
      generation++;
      count = 0;
      alive = population.size;
      crashed = 0;
      completed = 0;
    }

    population.run();
    if (simulating) {
      count++;
    }
  }

  for (i = 0; i < obstacles.length; i++) {
    obstacles[i].render();
  }
}

function setupInfos() {
  //Buttons
  distanceBtn.onclick = function () {
    showDistance = !showDistance;
  };
  trailBtn.onclick = function () {
    showTrail = !showTrail;
  };
  editBtn.onclick = function () {
    editMode = !editMode;
    simulating = false;
    population = new Population();
    generation = 0;
    count = 0;
    alive = population.size;
    crashed = 0;
    completed = 0;
  };
  playBtn.onclick = function () {
    simulating = !simulating;
    if (editMode) {
      editMode = false;
      simulating = true;
    }
  };
}

function renderInfos() {
  if (completed > 0) {
    multiplier = 20000;
  }
  genTracker.innerHTML = "GEN: " + generation;
  avgFitnessTracker.innerHTML =
    "AVG FIT: " + floor(population.avgFitness * multiplier);
  lifespanTracker.innerHTML = "LIFESPANN: " + count + "/" + lifespan;
  aliveTracker.innerHTML = "ALIVE: " + alive;
  crashedTracker.innerHTML = "CRASHED: " + crashed;

  // Distance Btns
  if (showDistance) {
    distanceBtn.style.background = "green";
  } else {
    distanceBtn.style.background = "rgba(247, 248, 245, 0.5)";
  }

  // Show Trails Btn
  if (showTrail) {
    trailBtn.style.background = "green";
  } else {
    trailBtn.style.background = "rgba(247, 248, 245, 0.5)";
  }
  // Edit Mode Buttons
  if (editMode) {
    editBtn.style.background = "orange";
    let p = createP("Edit Mode");
    p.position(windowWidth / 2 - 50, 30);
    p.addClass("editModeCaption");
    p.addClass("blinking");
  } else {
    editBtn.style.background = "rgba(247, 248, 245, 0.5)";
  }

  // Play Btn
  if (simulating) {
    playBtn.innerHTML = "PAUSE";
    playBtn.style.background = "red";
  } else {
    playBtn.innerHTML = "PLAY";
    playBtn.style.background = "green";
  }
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
