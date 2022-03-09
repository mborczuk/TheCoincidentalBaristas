// Team IDon'tKnow -- Julia (Lia) Nelson, Michael Borczuk
// SoftDev pd1
// K32 -- canvas based DVD screensaver
// 2022-02-17
// time spent: 0.7 hours

// model for HTML5 canvas-based animation

// SKEELTON


//access canvas and buttons via DOM
var c = document.getElementById("playground");// GET CANVAS
var dotButton = document.getElementById("buttonCircle");// GET DOT BUTTON
var stopButton = document.getElementById("buttonStop");// GET STOP BUTTON
var dvdButton = document.getElementById("buttonDVD"); // GET DVD BUTTON
//prepare to interact with canvas in 2D
var ctx = c.getContext("2d");// YOUR CODE HERE

//set fill color to team color
ctx.fillStyle = "aqua";// YOUR CODE HERE

var requestID;  //init global var for use with animation frames


//var clear = function(e) {
var clear = (e) => {
  console.log("clear invoked...")
  ctx.clearRect(0,0,500,500);
};


var imgWidth = 100;
var imgHeight = 50;
var imgX = 0;
var imgY = 500;
var velocity = 500;
var theta = 45 * Math.PI / 180;
var vx = velocity * Math.cos(theta);
// console.log(vx);
var vy = -1 * velocity * Math.sin(theta);
var dx = 0;
var dy = 0;
var date = new Date();
var starttime = date.getTime();

var DVD = () => {
  // on button press, recalculate the x and y coordinates of the dvd logo
  imgX = 0;
  imgY = 500;
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
  //dx = vx * time;
  //dy = vy * time + 0.5 * -9.8 * time * time;
  //imgX += (dx / 3779.5275590551);
  //imgY -= (dy / 3779.5275590551);
  imgX += vx
  imgY += vy
  vy += 0.03
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

var radius = 0;
var growing = true;


//var drawDot = function() {
var drawDot = () => {
  console.log("drawDot invoked...")
  clear(null);
  ctx.beginPath();
  ctx.arc(250, 250, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  if(radius == 250) {
    growing = false;
  }
  if(radius == 0) {
    growing = true;
  }
  if(growing) {
    radius += 1;
  } else {
    radius -= 1;
  }
  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(drawDot);
  
  // YOUR CODE HERE

  /*
    ...to
    Wipe the canvas,
    Repaint the circle,

    ...and somewhere (where/when is the right time?)
    Update requestID to propagate the animation.
    You will need
    window.cancelAnimationFrame()
    window.requestAnimationFrame()

   */
};


//var stopIt = function() {
var stopIt = () => {
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
};




dotButton.addEventListener( "click", drawDot );
stopButton.addEventListener( "click",  stopIt );
dvdButton.addEventListener("click", DVD );
