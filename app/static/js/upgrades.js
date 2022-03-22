prices = [[30, 120, 250], [40, 170, 320], [325, 1125], [90, 180, 290, 400, 410], [30, 120, 250, 420], [80, 300, 450, 650], [100, 120, 140, 160, 200], [180, 430, 720], [260, 870, 1500, 2550]]
var canBuy = (cost) => {
  if(cash >= cost) {
    return true;
  }
  return false;
}
var upgrade = (upgradeID) => {
    cost = prices[upgradeID][upgradeLevels[upgradeID]]; // get cost of the upgrade
    console.log(cost);
    if (canBuy(cost)) {
      if (upgradeLevels[upgradeID] < prices[upgradeID].length - 1) {
        upgradeLevels[upgradeID]++;
      }
      switch(upgradeID) {
        case 0: // weight upgrade
          if(upgradeLevels[0] > 3) { // cannot go over level 3
            upgradeLevels[0] = 3;
            return;
          }
          if(ay > 0) {
            ay = ay - 5000;
            cash -= cost;
          }
          break;
        case 1: // speed upgrade
          if(upgradeLevels[1] > 3) { // cannot go over level 3
            upgradeLevels[1] = 3;
            return;
          }
          dragUpgrade = upgradeLevels[upgradeID];
          cash -= cost;
          break;
        case 2: // crane duration upgrade
          if(upgradeLevels[2] > 2) { // cannot go over level 2
            upgradeLevels[2] = 2;
            return;
          }
          craneTime = 125 + craneTime;
          cash -= cost;
          break;
        case 3: // throwing power upgrade
          if(upgradeLevels[3] > 5) { // cannot go over level 5
            upgradeLevels[3] = 5;
            return;
          }
          cash -= cost;
          velocityUpscale = upgradeLevels[upgradeID];
          break;
        case 4: // lightweight upgrade
          if(upgradeLevels[4] > 4) { // cannot go over level 4
            upgradeLevels[4] = 4;
            return;
          }
          mass = mass - 1;
          cash -= cost;
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
          cash -= cost;
          break;
        case 6: // friction reduction upgrade
          if(upgradeLevels[6] > 5) { // cannot go over level 5
            upgradeLevels[6] = 5;
            return;
          }
          kineticFrictionCoefficient = kineticFrictionCoefficient - 0.1;
          cash -= cost;
          break;
        case 7: // fuel upgrade
          if(upgradeLevels[7] > 3) { // cannot go over level 3
            upgradeLevels[7] = 3;
            return;
          }
          fuelRate = fuelRate - 0.2;
          cash -= cost;
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
          cash -= cost;
          break;
        default:
          console.log("Not an upgrade!");
      }
    }
  };
