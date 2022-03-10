//access canvas and buttons via DOM
var c = document.getElementById("game_canvas"); // Get canvas
var ctx = c.getContext("2d"); // Get canvas context

var requestID;  //init global var for use with animation frames

//var clear = function(e) {
var clear = (e) => {
  console.log("clear invoked...")
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
var test = (e) => {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
  console.log(mouseX);
  starttime = date.getTime();
}
var test2 = (e) => {
  console.log(e.offsetX);
  date = new Date();
  var time = (date.getTime() - starttime) / 1000;
  console.log(time);
  if(e.offsetX == mouseX) {
    console.log("lol");
  } else {
     velocity = Math.sqrt(Math.pow(e.offsetX - mouseX, 2) + Math.pow(e.offsetY - mouseY, 2)) / time;
     console.log("velocity" + velocity);
  }
}
var DVD = () => {
  // on button press, recalculate the x and y coordinates of the dvd logo
  imgX = 0;
  imgY = 300;
  starttime = date.getTime();
  // draw the logo
  drawDVD();
};

var drawDVD = () => {
  clear(null);
  var dvd = new Image(); // initialize Image object
  dvd.src = "/static/js/logo_dvd.jpg"; // populate with dvd logo
  date = new Date();
  var time = (date.getTime() - starttime) / 1000;
  dx = vx * time;
  dy = vy * time + 0.5 * -9.8 * time * time;
  imgX += (dx / 3000);
  imgY -= (dy / 3000);
  ctx.drawImage(dvd, imgX, imgY, imgWidth, imgHeight);
 
  if(imgY >= 500) {
    console.log("hori: " + imgX);
    imgX = imgX % 500;
    imgY = 450;
    ctx.drawImage(dvd, imgX, imgY, imgWidth, imgHeight);
    stopIt();
  } else {
    window.cancelAnimationFrame(requestID);
    requestID = window.requestAnimationFrame(drawDVD);
  }
};


//var stopIt = function() {
var stopIt = () => {
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};

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