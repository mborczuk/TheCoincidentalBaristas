//access canvas and buttons via DOM
var c = document.getElementById("game_canvas"); // Get canvas
var ctx = c.getContext("2d"); // Get canvas context

var requestID; 

var mouseX;
var mouseY;

var planeX = 10;
var planeY = 428;

var clear = (e) => {
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var stopIt = () => {
  console.log("stopIt invoked...")
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

