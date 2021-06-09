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

//Edit Mode vars
let overBox = false;
let resizeMode = false;
let editPosMode = false;
let addMode = true;
let tempArr = [];

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
let showTrail = false;

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

  //_________GAME MODE__________
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
    for (i = 0; i < obstacles.length; i++) {
      obstacles[i].render();
    }
  }
  //_________EDIT MODE__________
  if (editMode) {
    checkOverObstacle();
    for (var i = 0; i < tempArr.length; i++) {
      tempArr[i].render();
      if (mouseIsPressed && tempArr[i].rezisable && resizeMode) {
        tempArr[i].width = constrain(mouseX - tempArr[i].x, 20, windowWidth);
        tempArr[i].height = constrain(mouseY - tempArr[i].y, 20, windowHeight);
      }

      if (mouseIsPressed && tempArr[i].dragabele && editPosMode) {
        tempArr[i].x = mouseX - xOffset;
        tempArr[i].y = mouseY - yOffset;
      }
    }
  }
}

//_______________________EDIT MODE TEST AREA_______________________
function keyPressed() {
  if (keyCode == 82) {
    resizeMode = true;
    editPosMode = false;
    addMode = false;
  }
  if (keyCode == 84) {
    editPosMode = true;
    resizeMode = false;
    addMode = false;
  }
  if (keyCode == 65) {
    addMode = true;
    editPosMode = false;
    resizeMode = false;
  }

  for (var i = 0; i < tempArr.length; i++) {
    if (tempArr[i].mouseOver && keyCode == 68) {
      tempArr.splice(i, 1);
      console.log("moin");
    }
  }
}
function mousePressed() {
  if (!overBox && addMode) {
    tempArr.push(new Obstacle("RECT", mouseX, mouseY, 60, 60));
  }
  for (var i = 0; i < tempArr.length; i++) {
    if (tempArr[i].mouseOver && resizeMode) {
      tempArr[i].rezisable = true;
    } else if (tempArr[i].mouseOver && editPosMode) {
      tempArr[i].dragabele = true;
      xOffset = mouseX - tempArr[i].x;
      yOffset = mouseY - tempArr[i].y;
    }
  }
}

function mouseReleased() {
  for (var i = 0; i < tempArr.length; i++) {
    tempArr[i].rezisable = false;
    tempArr[i].dragabele = false;
  }
}

function checkOverObstacle() {
  let count = 0;
  for (var i = 0; i < tempArr.length; i++) {
    if (tempArr[i].checkMouseOver()) {
      tempArr[i].mouseOver = true;
      count++;
    } else {
      tempArr[i].mouseOver = false;
    }
  }
  if (count > 0) {
    overBox = true;
  } else {
    overBox = false;
  }
}
//______________________END________________________________________

function setupInfos() {
  //Buttons
  distanceBtn.onclick = function () {
    showDistance = !showDistance;
  };
  trailBtn.onclick = function () {
    showTrail = !showTrail;
  };
  editBtn.onclick = function () {
    if (!editMode) {
      document.getElementById("editModeCaption").style.visibility = "visible";
      tempArr = [...obstacles];
      obstacles = [];
    } else if (editMode) {
      document.getElementById("editModeCaption").style.visibility = "hidden";
      obstacles = [...tempArr];
      tempArr = [];
    }

    editMode = !editMode;
    simulating = !simulating;
    population = new Population();
    generation = 0;
    count = 0;
    alive = population.size;
    crashed = 0;
    completed = 0;
    clear();
  };
  playBtn.onclick = function () {
    simulating = !simulating;
    if (editMode) {
      obstacles = [...tempArr];
      tempArr = [];
      editMode = false;
      simulating = true;
    }
    clear();
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
