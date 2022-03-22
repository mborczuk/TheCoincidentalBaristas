let date = new Date();
let mouseDown = false;
let starttime;
let rudder = false;
// let boost = false;
let fall = false;
let angle_modifier = 5;
let fuelRate = 1; 
let velocityScale = 15;

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
        altitude = -1 * (planeY - ground_y + planeHeight); 
    }
}

var throw_airplane = (e) => {
    if(!thrown) {
        // console.log(e.offsetX);
      mouseDown = false; // mouse is not down anymore
      if(e.offsetX > mouseX) { // can only throw to the right
        // TODO - fix bug in throwing
        var new_date = new Date();
        var time = (new_date.getTime() - starttime) / 1000;
        // console.log(time);
        starttime = new_date.getTime();
        // set velocity using distance formula, scale because otherwise the plane will never take off
        velocity = velocityScale * Math.sqrt(Math.pow(e.offsetX - mouseX, 2) + Math.pow(e.offsetY - mouseY, 2)) / (time);
        // console.log(velocity);
        velocity *= (1 + 0.1 * velocityUpscale); //Throwing Power Upgrade
        theta = Math.atan((e.offsetY - mouseY) / (e.offsetX - mouseX)) * -1; // arctan for theta
        vx = velocity * Math.cos(theta); // get x and y components of velocity
        vy = -1 * velocity * Math.sin(theta);
        
        thrown = true; // the plane has been thrown
        
        altitude = -1 * (planeY - ground_y + planeHeight);
        date = new Date();
        starttime = date.getTime();
      } else {
        fall = true;
      }
    }
  }
  
var keyPressed = (e) => {
    // if(boost) {
    //   if(thrown && altitude > 0 && fuel > 0) {
    //     if(e.key == 's') {
    //       vx += 1000; // get x and y components of velocity
    //       fuel -= fuelRate * 2;
    //     }
    //   }
    // }
    if(rudder) { //turning the plane
      if(thrown && altitude > 0 && fuel > 0) {
          // console.log(theta);
          // first half of projectile motion
          if(theta > 0) {
            if(e.key == 'a') {
              if(theta < 1.5) { // plane can be changed within the range of 0.5 to 1.5 rad, can maybe be changed w upgrades 
                theta = Math.min(1.5, theta + angle_modifier * (Math.PI / 180));
                vx = velocity * Math.cos(theta); // get x and y components of velocity
                vy = -1 * velocity * Math.sin(theta);
                fuel -= fuelRate;
              }
            }
            if(e.key == 'd') {
              if(theta > 0.25) {
                theta = Math.max(0.25, theta - angle_modifier * (Math.PI / 180)); // 0.5 bc otherwise we get weird issues with 0 (and then the plane just flies horizontally forever)
                // can be upgraded with rudder upgrades
                vx = velocity * Math.cos(theta); // get x and y components of velocity
                vy = -1 * velocity * Math.sin(theta);
                fuel -= fuelRate;
              }
            }
          }
          // second half of projectile motion
          if(theta < 0) {
            if(e.key == 'a') {
              if(theta < -0.25) {
                theta = Math.min(-0.25, theta + angle_modifier * (Math.PI / 180));
                vx = velocity * Math.cos(theta); // get x and y components of velocity
                vy = -1 * velocity * Math.sin(theta);
                fuel -= fuelRate;
              }
            }
            if(e.key == 'd') {
              if(theta > -1.5) {
                theta = Math.max(-1.5, theta - angle_modifier * (Math.PI / 180));
                vx = velocity * Math.cos(theta); // get x and y components of velocity
                vy = -1 * velocity * Math.sin(theta);
                fuel -= fuelRate;
              }
            }
          }
      }
    }
  }

c.addEventListener('mousedown', grab_airplane);
c.addEventListener('mousemove', hold_airplane);
c.addEventListener('mouseup', throw_airplane);
document.addEventListener('keydown', keyPressed);