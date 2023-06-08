// JS GAME SKELETON

// CANVAS SETUP
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// GLOBAL VARIABLES
let state = "start";
let player = {
  x: 388,
  y: 288,
  w: 25,
  h: 25,
  color: "blue",
  speed: 5,
};

let projectile = {
  x: player.x,
  y: player.y,
  w: 5,
  h: 5,
  color: "white",
  speed: 5,
  hit: false,
};

let player2 = {
  x: 388,
  y: 88,
  w: 25,
  h: 25,
  color: "red",
  speed: 5,
  status: "alive",
};

// START DRAW FUNCTION ON PAGE LOAD
window.addEventListener("load", draw);

function draw() {
  // GAME STATE
  if (state === "start") {
    startScreen();
  } else if (state === "running") {
    gameLogic();
    gameScreen();
  } else if (state === "gameover") {
    gameOver();
  } else if (state === "test") {
    testScreen();
    testLogic();
  }

  // REDRAW
  requestAnimationFrame(draw);
}

// EVENT STUFF

// KEYDOWN EVENT
document.addEventListener("keydown", keydownHandler);

document.addEventListener("keyup", projectilesCheck);

function keydownHandler(e) {
  if (state === "start" && e.code === "Enter") {
    state = "running";
  } else if (state === "start" && e.code === "KeyT") {
    reset();
    state = "test";
  } else if (state === "gameover" && e.code === "Enter") {
    reset();
  }
}
