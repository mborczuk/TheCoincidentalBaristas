// BACKGROUND SETUP ================================
var level = 1;
var ground_y = 0;
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
  ground_y =  c.clientHeight - (fg.height / 2);
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
  // Rotate the plane
  if (thrown) {
    ctx.translate(planeX + (planeWidth / 2), planeY + (planeHeight / 2)); // move origin to center of plane
    ctx.rotate(-theta); // rotate by theta
    ctx.translate(-(planeX + (planeWidth / 2)), -(planeY + (planeHeight / 2))); // move origin back to (0, 0)
  }

  // Draw the plane
  ctx.drawImage(plane, planeX, planeY, planeWidth, planeHeight);

  // Revert transformations
  if (thrown) {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset all transformations
  }
}

// STAR SETUP ======================

var star = new Image();
star.src = "../images/star.png";

// go thru array of starPositions
// for each: see if on canvas, draw image, then update x
// go thru again to delete those not on canvas
function draw_existing_stars() {
  for (let i = 0; i < starPositions.length; i++) {
    // console.log("i: " + i);
    var starX = starPositions[i][0];
    // console.log(starX);
    var starY = starPositions[i][1];
    if (starX > 0) { // if on canvas
      ctx.drawImage(star, starX, starY, 25, 25); //25 by 25 star
      // console.log("star Position: " + starX + ", " + starY);
      var date = new Date();
      var time = ((date.getTime() - starttime)) / 1000;
      // console.log("vx: " + vx + ", time: " + time);
      starPositions[i][0] -= vx * time;
      // console.log("new star Position: " + starX);
    }
    // console.log("star Position: " + starX + ", " + starY);
  }
  // for (let i = starPositions.length - 1; i === 0; i++) {
  //   if (starPositions[i][0] >= 0) {
  //     starPositions.pop();
  //   }
  // }
}

function spawn_stars() {
  // console.log("starPositions length: " + starPositions.length);
  for (let i = 0; i < 10; i++) {
    if (Math.random() < 0.02) { //change possibility of spawning new star
      var starX = Math.floor(Math.random() * 25) + 950;
      var starY = Math.floor(Math.random() * 250) + 50;
      starPositions[starPositions.length] = new Array(2);
      starPositions[starPositions.length - 1][0] = starX;
      starPositions[starPositions.length - 1][1] = starY;
    }
  }
}

// must fix
function check_stars() { // check position of star vs plane
  for (let i = 0; i < starPositions.length; i++) {
    var starX = starPositions[i][0];
    var starY = starPositions[i][1];
    if ((starX >= (planeX - 25)) && (starX <= (planeX + 112)) &&
        (starY >= (planeY - 25)) && (starY <= (planeY + 64)))
    {
      stars++;
      i--;
    }
  }
}
