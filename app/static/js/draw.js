// BACKGROUND SETUP ================================
var level = 1;
bg_loaded = false;
mg_loaded = false;
fg_loaded = false;

// Ground horizontal offsets
let bg_offset_y = 0;
let mg_offset_y = 0;
let fg_offset_y = 0;

// Ground horizontal offsets
let bg_offset_x = 0;
let mg_offset_x = 0;
let fg_offset_x = 0;

// Get ground images
var bg = new Image();
bg.src = `../images/bg${level}.png`;
bg.addEventListener('load', function() {
  bg_loaded = true;
  bg_offset_y = 0;
});

var mg = new Image();
mg.src = `../images/m${level}.png`;
mg.addEventListener('load', function() {
  mg_loaded = true;
  mg_offset_y = c.clientHeight - (mg.height / 3);
});

var fg = new Image();
fg.src = `../images/g${level}.png`;
fg.addEventListener('load', function() {
  fg_loaded = true;
  fg_offset_y = c.clientHeight - (fg.height / 2);
});


function fill_image(img, initial_x, y, img_width, img_height) {
  for (let w = initial_x; w < c.clientWidth * 2; w += img_width) {
    ctx.drawImage(img, 
      initial_x + w, y, 
      img_width, img_height
    );
  }
}
  
function draw_bg() {
  if (bg_loaded) {
    fill_image(bg, bg_offset_x, bg_offset_y, c.clientWidth, c.clientHeight);
  }
  if (mg_loaded) {
    fill_image(mg, mg_offset_x, mg_offset_y, mg.width / 2, mg.height / 2);
  }
  if (fg_loaded) {
    fill_image(fg, fg_offset_x, fg_offset_y, fg.width, fg.height);
  }
}

// Environment Offsets

function env_offset_x() {
  bg_offset_x -= dx * 0.001;
  bg_offset_x = wrap(bg_offset_x, -1 * c.clientWidth, 0);
  mg_offset_x -= dx * 0.005;
  mg_offset_x = wrap(mg_offset_x, -1 * c.clientWidth, 0);
  fg_offset_x -= dx * 0.01;
  fg_offset_x = wrap(fg_offset_x, -1 * c.clientWidth, 0);
}

function env_offset_y() {
  return 0
}

function update_env_offset() {
    env_offset_x();
    env_offset_y();
}

// AIPLANE SETUP ======================

var plane = new Image(); 
plane.src = "../images/plane_1.png";

var planeWidth = 87;
var planeHeight = 39;

function draw_plane() {
  ctx.drawImage(plane, planeX, planeY, planeWidth, planeHeight);
}
