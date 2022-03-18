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
    planeY += 2 + speed * 0.1;
    speed++;
    if(planeY >= 428) {
      speed = 0;
      fall = false;
    }
  }
  if (thrown) {
    update_env_offset();
    update_plane();
    draw_existing_stars();
    spawn_stars();
    check_stars();
  }

  draw_plane();

  display_altitude();

  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(gameLoop);
}

var stopIt = () => {
  console.log("Stars: " + stars);
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};

gameLoop();
