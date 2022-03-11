//access canvas and buttons via DOM
var c = document.getElementById("game_canvas"); // Get canvas
var ctx = c.getContext("2d"); // Get canvas context

var requestID;  //init global var for use with animation frames

//var clear = function(e) {
var clear = (e) => {
  // console.log("clear invoked...")
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var imgWidth = 100;
var imgHeight = 50;

var imgX = 0;
var imgY = 300;

var velocity = 150;
var theta = 1;
var vx = velocity * Math.cos(theta);
var vy = velocity * Math.sin(theta);
var dx = 0;
var dy = 0;
var date = new Date();
var starttime = date.getTime();
var mouseX;
var mouseY;
var mouseDown;
var lastID = 0;
var thrown = false;
var ay = 9.8 * 3780; 
var plane = new Image(); // initialize Image object
plane.src = "../images/paperairplane.png"; // populate with plane image
var upgrade = (upgradeID, level) => {
  switch(upgradeID) {
    case 0: // weight upgrade
      ay = 9.8 * 3780 - (0.5 * level);
      break;
    case 1:
      console.log("bye");
      break;
    default:
      console.log("aksjdhajsd");
  }
}
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
    clear(null);
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
    }
    if(e.offsetX >= mouseX) { // can only throw to the right
      velocity = 10 * Math.sqrt(Math.pow(e.offsetX - mouseX, 2) + Math.pow(e.offsetY - mouseY, 2)) / (time); // set velocity using distance formula, scale because otherwise the plane will never take off
      theta = Math.atan((e.offsetY - mouseY) / (e.offsetX - mouseX)) * -1; // arctan for theta
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


var drawPlane = () => {
  clear(null);
  // console.log(velocity);
  // console.log(lastID);
  // var plane = new Image(); // initialize Image object
  // plane.src = "../images/paperairplane.png"; // populate with plane image
  date = new Date();
  // this is the time BETWEEN frames
  var time = ((date.getTime() - starttime)) / 1000; // add 0.5 of a second so the plane starts a little faster (looks smoother)
  starttime = date.getTime();
  vy = vy + ay * time; // recalculate velocity each frame (another kinematics equation)
  console.log(ay);
  // update x and y displacement separately
  dx = vx * time;
  dy = vy * time + 0.5 * ay * Math.pow(time, 2); // kinematics equation
  // //F_drag = 0.5pCAv^2
  // //0.32 is coefficient, .025 is estimated area of paper airplane
  // //opposite direction of motion
  // var dragForce = 1/2 * 1.2754 * 0.32 * .025 * velocity * velocity;
  // // .0045 kg avg paper mass
  // var dFvx = dragForce / .0045 * time * Math.cos(theta);
  // var dFvy = dragForce / .0045 * time * Math.sin(theta);
  // console.log("dragForce:" + dFvx + ", " + dFvy);
  // dx = (vx - dFvx) * time;
  // dy = (vy - dFvy) * time + 0.5 * -9.8 * time * time;
  console.log(vy);
  // actual distance the plane SHOULD have gone
  realX += dx; // distance
  realY += dy; // altitude
  // scale down distance so it looks normal
  imgX += dx / 20;
  imgY += dy / 20;
  ctx.drawImage(plane, imgX, imgY, imgWidth, imgHeight);

  if(imgY >= 800) {
    console.log("hori: " + (realX / 3780)); // actual horizontal distance
    thrown = false;
    stopIt();
  }
};

var gameLoop = () => {
  if(thrown) {
    drawPlane();
  }

  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(gameLoop);
}
var stopIt = () => {
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};

c.addEventListener('mousedown', mouseDownFunc);
c.addEventListener('mousemove', mouseMoveFunc);
c.addEventListener('mouseup', mouseUpFunc);
// Decimal between 0-1
var loop_progress = 0;

function draw_bg(level) {
  // create new image object to use as pattern
  var bg = new Image();
  bg.src = `../images/bg${level}.png`;
  bg.onload = function() {

    // create pattern
    var bg_ptrn = ctx.createPattern(bg, 'repeat');
    ctx.fillStyle = bg_ptrn;
    ctx.fillRect(0, 0, c.clientWidth, bg.height);
  }
}

gameLoop();
