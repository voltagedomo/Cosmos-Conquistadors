// HELPER FUNCTIONS

// DRAW START SCREEN
function startScreen() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  ctx.font = "48px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("Press ENTER to Begin!", 100, 300);
}

// TEST LOGIC
function testLogic() {
  movePlayer();
  checkTestOver();
  shootProjectile();
}

// GAME LOGIC
function gameLogic() {
  movePlayer();
  checkGameOver();
}

// MOVE PLAYER
function movePlayer() {
  if (keyPressed["ArrowLeft"]) {
    player.x += -player.speed;
  } else if (keyPressed["ArrowRight"]) {
    player.x += player.speed;
  }

  if (keyPressed["ArrowUp"]) {
    player.y += -player.speed;
  } else if (keyPressed["ArrowDown"]) {
    player.y += player.speed;
  }
}

// SHOOTING
let n = 0;
function projectilesCheck(e) {
  if (e.code === "Space") {
    n++;
  }
}

function shootProjectile() {
  if (projectiles.length < n) {
    projectiles.push(
      (projectile = {
        x: player.x + player.w / 2,
        y: player.y + 1,
        w: 5,
        h: 5,
        color: "white",
        speed: 5,
        hit: false,
        called: true,
      })
    );
  }
}

function updateProjectile() {
  for (let i = 0; i < projectiles.length; i++) {
    if (
      !projectiles[i].called ||
      projectiles[i].x < 0 ||
      projectiles[i].x + projectiles[i].w > cnv.width ||
      projectiles[i].y < 0 ||
      projectiles[i].y + projectiles[i].h > cnv.height
    ) {
      projectiles.splice(i, 1);
    }

    if (ptInRect(projectiles[i].x, projectiles[i].y, player2)) {
      projectiles[i].hit = true;
      projectiles[i].color = "#333";
    } else {
      projectiles[i].hit = false;
      projectiles[i].color = "white";
    }
  }
}

// CHECK TEST OVER
function checkTestOver() {
  // Game over if player touches enemy
  for (let i = 0; i < projectiles.length; i++) {
    if (rectCollide(projectiles[i], player2)) {
      state = "gameover";
    }
  }
}

// CHECK GAME OVER
function checkGameOver() {
  // Game over if player leaves canvas
  if (
    player.x < 0 ||
    player.x + player.w > cnv.width ||
    player.y < 0 ||
    player.y + player.h > cnv.height
  ) {
    state = "gameover";
  }
}

// TEST SCREEN
function testScreen() {
  // Background
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // Draw player 2 / enemy
  ctx.fillStyle = player2.color;
  ctx.fillRect(player2.x, player2.y, player2.w, player2.h);

  // Draw projectiles
  for (let i = 0; i < projectiles.length; i++) {
    if (projectiles[i].called) {
      ctx.fillStyle = "white";
      ctx.fillRect(
        projectiles[i].x,
        (projectiles[i].y -= projectiles[i].speed),
        projectiles[i].w,
        projectiles[i].h
      );
    }
  }
}

// DRAW GAME SCREEN
function gameScreen() {
  // Background
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

// TEST GAME OVER SCREEN
function testOver() {
  // Background
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Game Over Text
  ctx.font = "48px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", 100, 300);

  ctx.font = "24px Calibri";
  ctx.fillText("Press ENTER to return to Start Screen.", 100, 350);
}

// GAME OVER SCREEN
function gameOver() {
  // Background
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Game Over Text
  ctx.font = "48px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", 100, 300);

  ctx.font = "24px Calibri";
  ctx.fillText("Press ENTER to return to Start Screen.", 100, 350);
}

// RESET VARIABLES
function reset() {
  state = "start";

  for (let i = 0; i < projectiles.length; i++) {
    projectiles[i].called = false;
  }

  n = 0;

  player = {
    x: 388,
    y: 288,
    w: 25,
    h: 25,
    color: "blue",
    speed: 5,
  };
  player2 = {
    x: 388,
    y: 88,
    w: 25,
    h: 25,
    color: "red",
    speed: 5,
    status: "alive",
  };
}
