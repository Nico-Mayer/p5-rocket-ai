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
let canWidth = 800;
let canHeight = 900;

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
let populationSlider = document.getElementById("populationSlider");
let populationValue = document.getElementById("populationValue");
let lifespanSlider = document.getElementById("lifespanSlider");
let lifespanValue = document.getElementById("lifespanValue");

let traget;
let obstacles;
let showDistance = false;
let showTrail = true;

function setup() {
  const canvas = createCanvas(canWidth, canHeight);
  canvas.parent("container");
  obstacles = [];
  createObstacles(canWidth, canHeight);
  population = new Population();
  alive = population.size;
  setupInfos();
  target = new Target(canWidth / 2, canHeight * 0.1, targetSize);
}

function draw() {
  clear();
  background(0, 100);
  target.render();
  //renderInfos();

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
    target.checkMouseOver();
    for (var i = 0; i < tempArr.length; i++) {
      tempArr[i].render();
      if (mouseIsPressed && tempArr[i].rezisable && resizeMode) {
        tempArr[i].width = constrain(mouseX - tempArr[i].x, 20, canWidth);
        tempArr[i].height = constrain(mouseY - tempArr[i].y, 20, canHeight);
      }

      if (mouseIsPressed && tempArr[i].dragabele && editPosMode) {
        tempArr[i].x = mouseX - xOffset;
        tempArr[i].y = mouseY - yOffset;
      }
    }
    if (mouseIsPressed && target.dragabele && editPosMode) {
      target.x = mouseX;
      target.y = mouseY;
    }
  }
}

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
  if (target.mouseOver) {
    target.dragabele = true;
  }
}

function mouseReleased() {
  for (var i = 0; i < tempArr.length; i++) {
    tempArr[i].rezisable = false;
    tempArr[i].dragabele = false;
  }
  target.dragabele = false;
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
    distanceBtn.classList.toggle("border-secondary");
    distanceBtn.classList.toggle("border-l-8");
    distanceBtn.classList.toggle("border-l-4");
  };
  trailBtn.onclick = function () {
    trailBtn.classList.toggle("border-l-8");
    trailBtn.classList.toggle("border-l-4");
    trailBtn.classList.toggle("border-white");

    showTrail = !showTrail;
  };

  editBtn.onclick = function () {
    playBtn.classList.toggle("inactive");
    trailBtn.classList.toggle("inactive");
    distanceBtn.classList.toggle("inactive");

    editBtn.classList.toggle("border-yellow-300");
    editBtn.classList.toggle("text-yellow-300");
    editBtn.classList.toggle("animate-pulse");
    editBtn.classList.toggle("border-l-4");
    editBtn.classList.toggle("border-l-8");

    if (!editMode) {
      tempArr = [...obstacles];
      obstacles = [];
    } else if (editMode) {
      obstacles = [...tempArr];
      tempArr = [];
    }

    editMode = !editMode;
    simulating = !simulating;
    defaultValues();
  };
  playBtn.onclick = function () {
    if (simulating) {
      playBtn.innerHTML = "START";
    } else {
      playBtn.innerHTML = "STOP";
    }
    playBtn.classList.toggle("border-secondary");
    playBtn.classList.toggle("text-red-400");
    playBtn.classList.toggle("text-secondary");

    playBtn.classList.toggle("border-l-8");
    playBtn.classList.toggle("border-l-4");

    simulating = !simulating;
    defaultValues();
  };

  populationSlider.oninput = function () {
    populationValue.innerHTML = populationSlider.value;
  };

  lifespanSlider.oninput = function () {
    this.lifespan = lifespanSlider.value;
    console.log(this.lifespan);
    lifespanValue.innerHTML = lifespanSlider.value;
  };
}

function defaultValues() {
  population = new Population();
  generation = 0;
  count = 0;
  alive = population.size;
  crashed = 0;
  completed = 0;
  clear();
}

/* function renderInfos() {
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
} */
