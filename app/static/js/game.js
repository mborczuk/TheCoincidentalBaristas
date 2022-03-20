//access canvas and buttons via DOM
var c = document.getElementById("game_canvas"); // Get canvas
var ctx = c.getContext("2d"); // Get canvas context

var requestID;
var speed = 0;

function clear() {
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var lastID = 0;

var gameLoop = () => {
  clear();
  draw_bg();
  if(fall) {
    free_fall();
  }
  if (thrown) {
    update_env_offset();
    update_plane();
    update_stars();
    draw_stars();
    spawn_stars();
  }

  draw_plane();
  display_altitude();
  display_velocity();
  display_fuel();
  display_distance();
  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(gameLoop);
}

var stopIt = () => {
  display_results();
  console.log("Stars: " + stars);
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
  stars = 0;
};

gameLoop();
