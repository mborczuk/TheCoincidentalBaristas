//access canvas and buttons via DOM
var c = document.getElementById("game_canvas"); // Get canvas
var ctx = c.getContext("2d"); // Get canvas context

var requestID; 

function clear() {
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var lastID = 0;
var thrown = false;

// stars (flight stats)
var stars = 0; // add to as collected
var starWorth = 5; // increase with upgrade

// cranes
var craneTime = 3; // starting crane multiplier lasts 3s?

var gameLoop = () => {
  clear();
  draw_bg();
  
  if (thrown) {
    update_env_offset();
    update_plane();
  }

  draw_plane();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset all transformations
  
  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(gameLoop);
}

var stopIt = () => {
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};

gameLoop();