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
var theta = 45 * (Math.PI / 180);
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
    var plane = new Image(); // initialize Image object
    plane.src = "../images/paperairplane.png"; // populate with plane image
    // clear(null);
    // ctx.drawImage(plane, e.offsetX - imgWidth / 2, e.offsetY - imgHeight / 2, imgWidth, imgHeight); // this looks terrible
  }
  if(mouseDown == true) {
    //console.log("h");
    ctx.fillRect(e.offsetX, e.offsetY, 5, 5); // draw line
    ctx.fillStyle = "black";
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
  if(e.offsetX >= mouseX && e.offsetY < mouseY) { // can only throw the plane up and to the right
     velocity = Math.sqrt(Math.pow(e.offsetX - mouseX, 2) + Math.pow(e.offsetY - mouseY, 2)) / (time); // set velocity using distance formula, TODO - scale velocity (if necessary)
     theta = Math.atan((e.offsetY - mouseY) / (e.offsetX - mouseX)) * -1; // arctan for theta
     vx = velocity * Math.cos(theta); // get x and y components of velocity
     vy = velocity * Math.sin(theta);
     console.log(vx);
     console.log(vy);
     ctx.fillStyle = "green";
     ctx.fillRect(e.offsetX, e.offsetY, 5, 5);
     //console.log(e.offsetX - mouseX);
     console.log("velocity" + velocity);
     console.log("theta " + theta * 180 / Math.PI);
     thrown = true; // the plane has been thrown
     imgX = e.offsetX - imgWidth / 2; // draw image so center is at mouseX and mouseY
     imgY = e.offsetY - imgHeight / 2;
     date = new Date();
     starttime = date.getTime();
  }
  }
}


var drawPlane = () => {
  clear(null);
  console.log(velocity);
  // console.log(lastID);
  var plane = new Image(); // initialize Image object
  plane.src = "../images/paperairplane.png"; // populate with plane image
  date = new Date();
  var time = ((date.getTime() - starttime) + 500) / 1000; // add 0.5 of a second so the plane starts a little faster (looks smoother)
  // update x and y displacement separately
  dx = vx * time; 
  dy = vy * time + 0.5 * -9.8 * Math.pow(time, 2); // kinematics equation
  imgX += (dx / 3000);
  imgY -= (dy / 3000);
  ctx.drawImage(plane, imgX, imgY, imgWidth, imgHeight);
 
  if(imgY >= 500) {
    console.log("hori: " + imgX);
    imgX = imgX % 500;
    imgY = 450;
    ctx.drawImage(plane, imgX, imgY, imgWidth, imgHeight);
    thrown = false;
    stopIt();
  }
};

var gameLoop = () => {
  if(thrown) {
    drawPlane();
  }
  draw_bg(1);
  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(gameLoop);
}
//var stopIt = function() {
var stopIt = () => {
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};

c.addEventListener('mousedown', mouseDownFunc);
c.addEventListener('mousemove', mouseMoveFunc);
c.addEventListener('mouseup', mouseUpFunc);
// Decimal between 0-1
var loop_progress = 0

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