// velocity + position, time, acceleration
var velocity = 150;
var theta = 1;
var vx = velocity * Math.cos(theta);
var vy = velocity * Math.sin(theta);
var dx = 0;
var dy = 0;
var ay = 9.8 * 3780;
var kineticFrictionCoefficient = 0.7;
var ax = -ay * kineticFrictionCoefficient;

var velocityUpscale = 0;

// Drag
var dFvx = 0;
var dFvy = 0;
var dragUpgrade = 0;
var mass = 20;

function update_velocity() {
  date = new Date();

  // Time in between frames
  var time = ((date.getTime() - starttime)) / 1000; // add 0.5 of a second so the plane starts a little faster (looks smoother)
  starttime = date.getTime();
  vy = vy + ay * time; // recalculate velocity each frame (another kinematics equation)
  velocity = Math.sqrt(
    (vx * vx) + (vy * vy)
  ); // recalculate velocity
}

function update_drag() {
  // F_drag = 0.5pCAv^2
  // 0.32 is coefficient, .025 is estimated area of paper airplane
  // opposite direction of motion

  var dragForce = 1/2 * 1.2754 * 0.16 * .025 * velocity * velocity;
  dragForce *= (1 - 0.1 * dragUpgrade);

  // 5 kg avg paper mass, F/m = a
  dFvx = dragForce / mass * time * Math.cos(theta);
  dFvy = dragForce / mass * time * Math.sin(theta);

  // console.log("dragForce:" + dFvx + ", " + dFvy);
  // console.log("velocity:" + dx+ ", " + dy)
}

function update_delta() {
  dx = (vx - dFvx) * time;
  dy = (vy - dFvy) * time + 0.5 * -9.8 * time * time;
  // console.log("velocity:" + dx+ ", " + dy)
}

function update_plane() {
    // console.log(velocity);
    update_velocity();

    // Time in between frames
    var time = ((date.getTime() - starttime)) / 1000; // add 0.5 of a second so the plane starts a little faster (looks smoother)
    starttime = date.getTime();
    console.log(planeY);
    if(planeY <= 428) {
      vy = vy + ay * time; // recalculate velocity each frame (another kinematics equation)
      velocity = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2)); // recalculate velocity
      theta = Math.atan(vy / vx) * -1; // recalculate theta
      // console.log(theta);
      //F_drag = 0.5pCAv^2
      //0.32 is coefficient, .025 is estimated area of paper airplane
      //opposite direction of motion
      update_drag();
      // console.log("dragForce:" + dFvx + ", " + dFvy);
      // console.log("velocity:" + dx+ ", " + dy)
      update_delta();
    } else {
      theta = 0;
      dy = 0;
      vx = vx + ax * time;
      dx = (vx) * time;
    }

    // actual distance the plane SHOULD have gone
    realX += dx; // distance
    realY += dy; // altitude

    if(dx <= 0) {
      console.log("hori: " + (realX / 3780)); // actual horizontal distance
      thrown = false;
      stopIt();
    }
  };
  