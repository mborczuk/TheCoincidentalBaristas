//access canvas and buttons via DOM
var c = document.getElementById("game_canvas"); // Get canvas
var ctx = c.getContext("2d"); // Get canvas context

var requestID;  //init global var for use with animation frames

//var clear = function(e) {
var clear = (e) => {
  // console.log("clear invoked...")
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

// img
var imgWidth = 100;
var imgHeight = 50;
var imgX = 0;
var imgY = 300;

// Background Setup ================================
var level = 1;

// Get ground images
var bg = new Image();
bg.src = `../images/bg${level}.png`;

var mg = new Image();
mg.src = `../images/m${level}.png`;

var fg = new Image();
fg.src = `../images/g${level}.png`;

// Ground horizontal offsets
bg_offset_x = 0;
mg_offset_x = 0;
fg_offset_x = 0;

// Ground vertical offsets
bg_offset_y = 0;
mg_offset_y = c.clientHeight - (mg.height / 3)
fg_offset_y = c.clientHeight - (fg.height / 2);

// velocity + position, time, acceleration
var velocity = 150;
var theta = 1;
var vx = velocity * Math.cos(theta);
var vy = velocity * Math.sin(theta);
var dx = 0;
var dy = 0;
var date = new Date();
var starttime = date.getTime();
var ay = 9.8 * 3780;

// drag
var dFvx = 0;
var dFvy = 0;
var dragUpgrade = 0;
var mass = 20;

// mouse
var mouseX;
var mouseY;
var mouseDown;

var lastID = 0;
var thrown = false;
var plane = new Image(); // initialize Image object
plane.src = "../images/paperairplane.png"; // populate with plane image

// stars (flight stats)
var stars = 0; // add to as collected
var starWorth = 5; // increase with upgrade

// cranes
var craneTime = 3; // starting crane multiplier lasts 3s?

var velocityUpscale = 0;

var upgrade = (upgradeID, level) => {
  switch(upgradeID) {
    case 0: // weight upgrade
      ay = ay - 10000;
      console.log(ay);
      break;
    case 1: // speed upgrade
      dragUpgrade = level;
      break;
    case 2: // crane duration upgrade
      craneTime = level * 2 + 3;
      break;
    case 3: // throwing power upgrade
      velocityUpscale = level;
      break;
    case 4: // lightweight upgrade
      mass = 5 - 0.1 * level;
      break;
    case 5:
      console.log("bye");
      break;
    default:
      console.log("aksjdhajsd");
  }
};
var mouseDownFunc = (e) => {
  if(!thrown) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    ctx.fillStyle = "red";
    mouseDown = true; // you probably don't need to do this
    // console.log(mouseX);
    starttime = date.getTime();
  }
}
var mouseMoveFunc = (e) => {
  if(mouseDown == true && (requestID - lastID) >= 10) { // update every 10 frames
    console.log(requestID);
    console.log(lastID);
    lastID = requestID; // last time we updated is now current time
    mouseX = e.offsetX; // set mouseX
    mouseY = e.offsetY; // set mouseY
    date = new Date();
    starttime = date.getTime(); // set new start time
    //console.log(mouseX);
    // var plane = new Image(); // initialize Image object
    // plane.src = "../images/paperairplane.png"; // populate with plane image
    // // clear(null);
    // // ctx.drawImage(plane, e.offsetX - imgWidth / 2, e.offsetY - imgHeight / 2, imgWidth, imgHeight); // this looks terrible
  }
  if(mouseDown == true) {
    //console.log("h");
    // ctx.fillRect(e.offsetX, e.offsetY, 5, 5); // draw line
    ctx.fillStyle = "black";
    // clear(null);
    ctx.drawImage(plane, e.offsetX - imgWidth / 2, e.offsetY - imgHeight / 2, imgWidth, imgHeight);
  }

}
// on mouseup
var mouseUpFunc = (e) => {
  if(!thrown) {
      // console.log(e.offsetX);
    date = new Date();
    var time = (date.getTime() - starttime) / 1000; // get current time
    // console.log(time);
    mouseDown = false; // mouse is not down anymore
    if(e.offsetX == mouseX) {
      console.log("lol"); // do nothing if the positions are the same
      clear(null);
      return;
    }
    if(e.offsetX >= mouseX) { // can only throw to the right
      // TODO - fix bug in throwing

      // set velocity using distance formula, scale because otherwise the plane will never take off
      velocity = 40000;// 10 * Math.sqrt(Math.pow(e.offsetX - mouseX, 2) + Math.pow(e.offsetY - mouseY, 2)) / (time);
      velocity *= (1 + 0.1 * velocityUpscale); //Throwing Power Upgrade
      theta = Math.PI / 4; // Math.atan((e.offsetY - mouseY) / (e.offsetX - mouseX)) * -1; // arctan for theta
      vx = velocity * Math.cos(theta); // get x and y components of velocity
      vy = -1 * velocity * Math.sin(theta);
      ctx.fillStyle = "green";
      ctx.fillRect(e.offsetX, e.offsetY, 5, 5);
      //console.log(e.offsetX - mouseX);
      console.log("velocity" + velocity);
      console.log("theta " + theta * 180 / Math.PI);
      thrown = true; // the plane has been thrown
      imgX = e.offsetX - imgWidth / 2; // draw image so center is at mouseX and mouseY
      imgY = e.offsetY - imgHeight / 2;
      realX = e.offsetX - imgWidth / 2; // draw image so center is at mouseX and mouseY
      realY = e.offsetY - imgHeight / 2;
      date = new Date();
      starttime = date.getTime();
    }
  }
}

var keyPressed = (e) => {
  if(thrown) {
    if(e.key == 'a') {
      if(theta < Math.PI / 2) {
        theta = Math.min(Math.PI / 2, theta + 5 * (Math.PI / 180));
        vx = velocity * Math.cos(theta); // get x and y components of velocity
        vy = -1 * velocity * Math.sin(theta);
        // console.log(theta * 180 / Math.PI);
      }
    }
    if(e.key == 'd') {
      if(theta > 0) {
        theta = Math.max(0, theta - 5 * (Math.PI / 180));
        vx = velocity * Math.cos(theta); // get x and y components of velocity
        vy = -1 * velocity * Math.sin(theta);
        // console.log(theta * 180 / Math.PI);
      }
    }
  }
}
var drawPlane = () => {
  // clear(null);
  // console.log(velocity);
  // console.log(lastID);
  // var plane = new Image(); // initialize Image object
  // plane.src = "../images/paperairplane.png"; // populate with plane image
  date = new Date();
  // this is the time BETWEEN frames
  var time = ((date.getTime() - starttime)) / 1000; // add 0.5 of a second so the plane starts a little faster (looks smoother)
  starttime = date.getTime();
  vy = vy + ay * time; // recalculate velocity each frame (another kinematics equation)
  // velocity = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2)); // recalculate velocity
  theta = Math.atan(vy / vx) * -1; // recalculate theta
  console.log(theta);
  //F_drag = 0.5pCAv^2
  //0.32 is coefficient, .025 is estimated area of paper airplane
  //opposite direction of motion
  var dragForce = 1/2 * 1.2754 * 0.16 * .025 * velocity * velocity;
  dragForce *= (1 - 0.1 * dragUpgrade);
  // 5 kg avg paper mass, F/m = a
  dFvx = dragForce / mass * time * Math.cos(theta);
  dFvy = dragForce / mass * time * Math.sin(theta);
  // console.log("dragForce:" + dFvx + ", " + dFvy);
  // console.log("velocity:" + dx+ ", " + dy)
  dx = (vx - dFvx) * time;
  dy = (vy - dFvy) * time + 0.5 * -9.8 * time * time;
  // console.log("velocity:" + dx+ ", " + dy)
  // actual distance the plane SHOULD have gone
  realX += dx; // distance
  realY += dy; // altitude
  // scale down distance so it looks normal (maybe change)
  imgX += dx / 40;
  imgY += dy / 40;
  ctx.drawImage(plane, imgX, imgY, imgWidth, imgHeight);

  if(imgY >= 800) {
    console.log("hori: " + (realX / 3780)); // actual horizontal distance
    thrown = false;
    stopIt();
  }
};

var gameLoop = () => {
  clear();
  draw_bg();
  bg_offset_x -= dx * 0.001;
  bg_offset_x = wrap(bg_offset_x, -1 * c.clientWidth, 0);
  // console.log("OFFSET" + bg_offset_x);
  mg_offset_x -= dx * 0.005;
  mg_offset_x = wrap(mg_offset_x, -1 * c.clientWidth, 0);

  fg_offset_x -= dx * 0.01;
  fg_offset_x = wrap(fg_offset_x, -1 * c.clientWidth, 0);
  
  // console.log(translate_matrix);

  if (thrown) {
    drawPlane();
  }
  
  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(gameLoop);
}

var stopIt = () => {
  console.log("stopIt invoked...");
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};

c.addEventListener('mousedown', mouseDownFunc);
c.addEventListener('mousemove', mouseMoveFunc);
c.addEventListener('mouseup', mouseUpFunc);
document.addEventListener('keydown', keyPressed);
// Decimal between 0-1
var loop_progress = 0;

function wrap(n, min, max) {
  if (n < min) {
    return max - Math.abs(min - n);
  } 
  else if (n > max) {
    return min + Math.abs(n - max);
  } 
  return n;
}

function fill_image(img, initial_x, y, img_width, img_height) {
  for (let w = initial_x; w < c.clientWidth * 2; w += img_width) {
    // console.log("W:" + w);
    ctx.drawImage(img, 
      initial_x + w, y, 
      img_width, img_height
    );
  }
}

function draw_bg() {
  fill_image(bg, bg_offset_x, bg_offset_y, c.clientWidth, c.clientHeight);
  fill_image(mg, mg_offset_x, mg_offset_y, mg.width / 2, mg.height / 2);
  fill_image(fg, fg_offset_x, fg_offset_y, fg.width / 2, fg.height / 2);
  // fill_image(fg, fg_offset_x, fg_offset_y, fg.width / 2, fg.height / 2);
  // ctx.drawImage(bg, 
  //   bg_offset_x, 
  //   bg_offset_y, 
  //   c.clientWidth, bg.height
  // );

  // ctx.drawImage(mg, 
  //   mg_offset_x, 
  //   mg_offset_y, 
  //   mg.width / 2, mg.height / 2
  // );

  // ctx.drawImage(fg, 
  //   fg_offset_x, 
  //   fg_offset_y, 
  //   fg.width / 2, fg.height / 2
  // );
}

gameLoop();
