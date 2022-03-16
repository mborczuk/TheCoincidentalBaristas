// velocity + position, time, acceleration
var velocity = 150;
var theta = 1;
var vx = velocity * Math.cos(theta);
var vy = velocity * Math.sin(theta);
var dx = 0;
var dy = 0;
var ay = 9.8 * 3780;

var velocityUpscale = 0;

// Drag
var dFvx = 0;
var dFvy = 0;
var dragUpgrade = 0;
var mass = 20;

function update_plane() {
    // console.log(velocity);
    // console.log(lastID);
    date = new Date();

    // Time in between frames
    var time = ((date.getTime() - starttime)) / 1000; // add 0.5 of a second so the plane starts a little faster (looks smoother)
    starttime = date.getTime();

    // Recalculate velocity
    vy = vy + ay * time; 
    // console.log(ay);
  
    // F_drag = 0.5pCAv^2
    //0.32 is coefficient, .025 is estimated area of paper airplane
    // Opposite direction of motion
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
    
    ctx.translate(planeX + (planeWidth / 2), planeY + (planeHeight / 2)); // move origin to center of plane
    ctx.rotate(-theta); // rotate by theta
    ctx.translate(-(planeX + (planeWidth / 2)), -(planeY + (planeHeight / 2))); // move origin back to (0, 0)

    // if(planeY >= 800) {
    //     console.log("hori: " + (realX / 3780)); // actual horizontal distance
    //     thrown = false;
    // stopIt();
  };
  