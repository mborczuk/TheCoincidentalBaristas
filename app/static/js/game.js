//access canvas and buttons via DOM
var c = document.getElementById("game_canvas"); // Get canvas
var ctx = c.getContext("2d"); // Get canvas context

var requestID;
var speed = 0;

function clear() {
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var lastID = 0;

function render_game() {
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

    update_crane();
    draw_cranes();
    spawn_cranes();
  }

  draw_plane();
  display_altitude();
  display_velocity();
  display_fuel();
  display_distance();
}

var gameLoop = () => {
  clear();
  if (gaming) {
    render_game();
  } else {
    draw_bg();
    draw_menu();
  }

  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(gameLoop);
}

var reset = () => {
  stars = 0;
  cranes = 0;
  altitude = 0;
  velocity = 0;
  distance = 0;
  fuel = maxFuel;
  starPositions = [];
  cranePositions = [];
  planeX = 10;
  planeY = 428;
  roundedDistance = 0;
}

var stopIt = () => {
  display_results();
  console.log("Stars: " + stars);
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
  reset();
};

gameLoop();
