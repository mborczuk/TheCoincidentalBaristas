//access canvas and buttons via DOM
var c = document.getElementById("game_canvas"); // Get canvas
var ctx = c.getContext("2d"); // Get canvas context

var requestID;

var mouseX;
var mouseY;

var altitude = 0;
var distance = 0;

var planeX = 10;
var planeY = 428;
var thrown = false;

// stars (flight stats)
var stars = 0; // add to as collected
var starWorth = 5; // increase with upgrade
var starPositions = [];

// cranes
var craneTime = 3; // starting crane multiplier lasts 3s?

var clear = (e) => {
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var stopIt = () => {
  console.log("stopIt invoked...");
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};

function clamp(n, min, max) {
  if (n < min) {
    return min
  } else if (n > max) {
    return max
  }
  return n
}

function wrap(n, min, max) {
  if (n < min) {
    return max - Math.abs(min - n);
  }
  else if (n > max) {
    return min + Math.abs(n - max);
  }
  return n;
}

function inRect(px, py, x0, y0, x1, y1) {
  return (px >= x0) && (px <= x1) && (py >= y0) && (py <= y1);
}