prices = [[30, 120, 250, null], [40, 170, 320, null], [325, 1125, null], [90, 180, 290, 400, 410, null], [120, 480, 1120, null], [100, 120, 140, 160, 200, null], [180, 430, 720, null]]
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
      if (upgradeLevels[upgradeID] < prices[upgradeID].length) {
        upgradeLevels[upgradeID]++;
      }
      switch(parseInt(upgradeID)) {
        case 0: // weight upgrade
          console.log("hi");
          if(upgradeLevels[0] > 3) { // cannot go over level 3
            upgradeLevels[0] = 3;
            break;
          }
          if(ay > 0) {
            ay = ay - 5000;
            mass = mass - 1;
            cash -= cost;
          }
          break;
        case 1: // speed upgrade
          if(upgradeLevels[1] > 3) { // cannot go over level 3
            upgradeLevels[1] = 3;
            break;
          }
          dragUpgrade = upgradeLevels[upgradeID];
          cash -= cost;
          break;
        case 2: // crane duration upgrade
          if(upgradeLevels[2] > 2) { // cannot go over level 2
            upgradeLevels[2] = 2;
            break;
          }
          craneTime = 125 + craneTime;
          cash -= cost;
          break;
        case 3: // throwing power upgrade
          if(upgradeLevels[3] > 5) { // cannot go over level 5
            upgradeLevels[3] = 5;
            break;
          }
          cash -= cost;
          velocityUpscale = upgradeLevels[upgradeID];
          break;
        case 4: // rudder upgrade
          if(upgradeLevels[4] > 3) { // cannot go over level 3
            upgradeLevels[4] = 3;
            break;
          }
          rudder = true;
          if(upgradeLevels[4] > 1) {
            angle_modifier += 2;
          }
          console.log(angle_modifier);
          cash -= cost;
          break;
        case 5: // friction reduction upgrade
          if(upgradeLevels[5] > 5) { // cannot go over level 5
            upgradeLevels[5] = 5;
            break;
          }
          kineticFrictionCoefficient = kineticFrictionCoefficient - 0.1;
          cash -= cost;
          break;
        case 6: // fuel upgrade
          if(upgradeLevels[6] > 3) { // cannot go over level 3
            upgradeLevels[6] = 3;
            break;
          }
          fuelRate = fuelRate - 0.2;
          cash -= cost;
          break;
        default:
          console.log("Not an upgrade!");
      }
    }
  };
