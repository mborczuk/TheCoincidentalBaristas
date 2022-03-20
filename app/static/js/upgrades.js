// weightlessness - $30
// aerodynamic - $40
// crane duration - $325
// throwing power - $90
// lightweight - $30
// rudder - $80
// friction - $100
// fuel - $180
// better model - $260
var upgrade = (upgradeID) => {
    if(upgradeID < upgradeLevels.length) {
      upgradeLevels[upgradeID]++;
      console.log(upgradeLevels);
    }
    switch(upgradeID) {
      case 0: // weight upgrade
        if(upgradeLevels[0] > 3) { // cannot go over level 3
          upgradeLevels[0] = 3;
          return;
        }
        if(ay > 0) {
          ay = ay - 5000;
        }
        break;
      case 1: // speed upgrade
        if(upgradeLevels[1] > 3) { // cannot go over level 3
          upgradeLevels[1] = 3;
          return;
        }
        dragUpgrade = upgradeLevels[upgradeID];
        break;
      case 2: // crane duration upgrade
        if(upgradeLevels[2] > 2) { // cannot go over level 2
          upgradeLevels[2] = 2;
          return;
        }
        craneTime = 2 + craneTime;
        break;
      case 3: // throwing power upgrade
        if(upgradeLevels[3] > 5) { // cannot go over level 5
          upgradeLevels[3] = 5;
          return;
        }
        velocityUpscale = upgradeLevels[upgradeID];
        break;
      case 4: // lightweight upgrade
        if(upgradeLevels[4] > 4) { // cannot go over level 4
          upgradeLevels[4] = 4;
          return;
        }
        mass = mass - 1;
        break;
      case 5: // rudder upgrade
        if(upgradeLevels[5] > 4) { // cannot go over level 4
          upgradeLevels[5] = 4;
          return;
        }
        rudder = true;
        if(upgradeLevels[upgradeID] > 1) {
          angle_modifier = angle_modifier + 2;
        }
        break;
      case 6: // friction reduction upgrade
        if(upgradeLevels[6] > 5) { // cannot go over level 5
          upgradeLevels[6] = 5;
          return;
        }
        kineticFrictionCoefficient = kineticFrictionCoefficient - 0.1;
        break;
      case 7: // fuel upgrade
        if(upgradeLevels[7] > 3) { // cannot go over level 3
          upgradeLevels[7] = 3;
          return;
        }
        fuelRate = fuelRate - 0.2; 
        break;
      case 8: // plane model upgrade
        if(upgradeLevels[8] > 4) { // cannot go over level 4
          upgradeLevels[8] = 4;
          return;
        }
        maxFuel += 5;
        ay = ay - 1500;
        mass -= 1;
        velocityScale = velocityScale + 2;
        break;
      default:
        console.log("Not an upgrade!");
    }
  };

