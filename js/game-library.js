// GAME LIBRARY for HTML CANVAS

// GLOBAL VARIABLES
let mouseX;
let mouseY;

let keyPressed = {};
let projectiles = [];

// EVENT STUFF

// Update position of mouse, (mouseX, mouseY), when mouse moved
document.addEventListener("mousemove", mousemoveHandlerGameLib);

function mousemoveHandlerGameLib(e) {
  // Get rectangle info about canvas location
  let cnvRect = cnv.getBoundingClientRect();

  // Calc mouse coordinates using mouse event and canvas location info
  mouseX = Math.round(e.clientX - cnvRect.left);
  mouseY = Math.round(e.clientY - cnvRect.top);
}

// Update keyPressed object on keydown (e.code: true)
document.addEventListener("keydown", keydownHandlerGameLib);

function keydownHandlerGameLib(e) {
  keyPressed[e.code] = true;
}

// Update keyPressed object on keyup (e.code: false)
document.addEventListener("keyup", keyupHandlerGameLib);

function keyupHandlerGameLib(e) {
  keyPressed[e.code] = false;
}

// USEFUL GAME FUNCTIONS

// Determine the distance between (x1, y1) and (x2, y2)
function dist(x1, y1, x2, y2) {
  let dX = x1 - x2;
  let dY = y1 - y2;

  return Math.sqrt(dX * dX + dY * dY);
}

// Determine if point (x, y) is in rect object (x, y, w, h)
function ptInRect(x, y, rect) {
  if (
    x >= rect.x &&
    x <= rect.x + rect.w &&
    y >= rect.y &&
    y <= rect.y + rect.h
  ) {
    // is inside
    return true;
  } else {
    // is outside
    return false;
  }
}

// Determine if two rect objects (x, y, w, h) collide
function rectCollide(rect1, rect2) {
  if (
    rect1.x + rect1.w >= rect2.x &&
    rect1.x <= rect2.x + rect2.w &&
    rect1.y + rect1.h >= rect2.y &&
    rect1.y <= rect2.y + rect2.h
  ) {
    // colliding
    return true;
  } else {
    // not colliding
    return false;
  }
}

// Universal Circle Check (checks if inside and checks if colliding)
// Thank you to Steve for this one
// found @ https://stackoverflow.com/questions/59633860/check-if-point-is-inside-circle#:~:text=You%20can%20adjust%20the%20comparison,it%20is%20outside%20the%20circle.
/**
 * @description Check if a pt is in, on or outside of a circle.
 * @param {[float]} pt The point to test. An array of two floats - x and y coordinates.
 * @param {[float]} center The circle center. An array of two floats - x and y coordinates.
 * @param {float} r The circle radius.
 * @returns {-1 | 0 | 1} -1 if the point is inside, 0 if it is on and 1 if it is outside the circle.
 */
function ptInCircle(pt, center, r) {
  const lhs = Math.pow(center[0] - pt[0], 2) + Math.pow(center[1] - pt[1], 2);
  const rhs = Math.pow(r, 2);
  // Returns -1 if the point is inside, 0 if it is on and 1 if it is outside the circle
  return lhs < rhs ? -1 : lhs === rhs ? 0 : 1;
}

// Constrain val so that it must be between low and high
function constrain(val, low, high) {
  if (val <= low) {
    val = low + 1;
  } else if (val >= high) {
    val = high - 1;
  }
  return val;
}
