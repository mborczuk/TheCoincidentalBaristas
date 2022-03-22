// velocity + position, time, acceleration
var velocity = 0;
var theta = 1;
var vx = velocity * Math.cos(theta);
var vy = velocity * Math.sin(theta);
var dx = 0;
var dy = 0;
var ay = 9.8 * 3780;
var kineticFrictionCoefficient = 1.1;
var ax = -ay * kineticFrictionCoefficient;

var velocityUpscale = 0;
var maxFuel = 20;
var fuel = maxFuel;
var roundedDistance = 0;



// Drag
var dFvx = 0;
var dFvy = 0;
var dragUpgrade = 0;
var mass = 20;

function calculateCash() { // calculate and add to cash
  let cashToAdd = Math.round(actualStars * 5 + roundedDistance * 0.7);
  roundedDistance = 0;
  actualStars = 0;
  cash += cashToAdd;
  return cashToAdd;
}
function update_velocity(time) {
  vy = vy + ay * time; // recalculate velocity each frame (another kinematics equation)
  velocity = Math.sqrt(
    (vx * vx) + (vy * vy)
  ); // recalculate velocity
}

function update_drag(time) {
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

function update_delta(time) {
  dx = (vx - dFvx) * time;
  dy = (vy - dFvy) * time + 0.5 * -9.8 * time * time;
  // console.log("velocity:" + dx+ ", " + dy)
}

function land_plane() {
  if (dx <= 0 && altitude <= 0) {
    // console.log("hori: " + roundedDistance); // actual horizontal distance
    totalDistance += roundedDistance;
    thrown = false;
    velocity = 0;
    theta = 0;
    stopIt();
  }
}

function free_fall() {
  planeY += 2 + speed * 0.1;
  speed++;
  if(planeY >= 428) {
    speed = 0;
    fall = false;
  }
}

function update_plane() {
    // Time in between frames
    var date = new Date();
    var time = ((date.getTime() - starttime)) / 1000; // add 0.5 of a second so the plane starts a little faster (looks smoother)
    starttime = date.getTime();
    if (altitude > 0) {
      update_velocity(time);
      theta = Math.atan(vy / vx) * -1; // recalculate theta
      update_drag(time);
      update_delta(time);
    } else {
      theta = -Math.abs(theta);
      dy = 0;
      velocity = vx;
      vx = vx + ax * time;
      dx = (vx) * time;
    }
    // actual distance the plane SHOULD have gone
    distance += dx / 5;
    altitude -= dy / 40;
    roundedDistance = Math.round(distance / 37.8) / 100;

    if (altitude < 0) {
      altitude = 0;
    }

    // Reposition plane to frame it better
    if (planeX > c.clientWidth / 4) {
      planeX -= 5;
    }

    if (planeY < c.clientHeight / 3) {
      planeY += 1;
    }

    if (altitude < 200) {
      planeY += dy / 40;
    }

    // PlaneY desync on landing fix
    if (altitude == 0 || planeY >= ground_y) {
      planeY = ground_y - planeHeight;
    }

    land_plane();
  };
