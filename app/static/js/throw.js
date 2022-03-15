let date = new Date();
let mouseDown = false;
let starttime;

var grab_airplane = (e) => {
    if(!thrown) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
      mouseDown = true;
      starttime = date.getTime();
    }
  }
  
var hold_airplane = (e) => {
    if (mouseDown && (requestID - lastID) >= 10) { // update every 10 frames

        lastID = requestID; // last time we updated is now current time
        mouseX = e.offsetX; // set mouseX
        mouseY = e.offsetY; // set mouseY
        var new_date = new Date();
        starttime = new_date.getTime(); // set new start time
    }

    if (mouseDown) {
        planeX = e.offsetX - planeWidth / 2;
        planeY = e.offsetY - planeHeight / 2;
    }
}

var throw_airplane = (e) => {
    if(!thrown) {
      date = new Date();
      let time = (date.getTime() - starttime) / 1000; // get current time
      mouseDown = false; // mouse is not down anymore

      if(e.offsetX >= mouseX) { // can only throw to the right
        // TODO - fix bug in throwing
  
        // set velocity using distance formula, scale because otherwise the plane will never take off
        velocity = 10 * Math.sqrt(Math.pow(e.offsetX - mouseX, 2) + Math.pow(e.offsetY - mouseY, 2)) / (time);
        velocity *= (1 + 0.1 * velocityUpscale); //Throwing Power Upgrade
        theta = Math.atan((e.offsetY - mouseY) / (e.offsetX - mouseX)) * -1; // arctan for theta
        vx = velocity * Math.cos(theta); // get x and y components of velocity
        vy = -1 * velocity * Math.sin(theta);
        ctx.fillStyle = "green";
        ctx.fillRect(e.offsetX, e.offsetY, 5, 5);

        thrown = true; // the plane has been thrown
        imgX = e.offsetX - planeWidth / 2; // draw image so center is at mouseX and mouseY
        imgY = e.offsetY - planeHeight / 2;
        realX = e.offsetX - planeWidth / 2; // draw image so center is at mouseX and mouseY
        realY = e.offsetY - planeHeight / 2;
        date = new Date();
        starttime = date.getTime();
      }
    }
  }

c.addEventListener('mousedown', grab_airplane);
c.addEventListener('mousemove', hold_airplane);
c.addEventListener('mouseup', throw_airplane);