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

var clear = (e) => {
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var stopIt = () => {
  console.log("stopIt invoked...");
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};

function wrap(n, min, max) {
  if (n < min) {
    return max - Math.abs(min - n);
  } 
  else if (n > max) {
    return min + Math.abs(n - max);
  } 
  return n;
}

