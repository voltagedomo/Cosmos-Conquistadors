// HELPER FUNCTIONS

// DRAW START SCREEN
function startScreen() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  ctx.font = "48px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("Press SPACE to Begin!", 100, 300);
}

// TEST LOGIC
function testLogic() {
  movePlayer();
  checkTestOver();
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

// CHECK TEST OVER
function checkTestOver() {
  // Game over if player touches enemy
  if (rectCollide(player, player2)) {
    state = "gameover";
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
  ctx.fillText("Press SPACE to return to Start Screen.", 100, 350);
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
  ctx.fillText("Press SPACE to return to Start Screen.", 100, 350);
}

// RESET VARIABLES
function reset() {
  state = "start";
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
