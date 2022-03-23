prices = [[30, 120, 250, null], [40, 170, 320, null], [325, 1125, null], [90, 180, 290, 400, 410, null], [120, 480, 1120, null], [100, 120, 140, 160, 200, null], [180, 430, 720, null]]

var canBuy = (cost, upgradeID) => {
  if(cash < cost) {
    return false;
  }
  if(upgradeLevels[upgradeID] >= prices[upgradeID].length - 1) {
    return false;
  }
  return true;
}
var upgrade = (upgradeID) => {
    cost = prices[upgradeID][upgradeLevels[upgradeID]]; // get cost of the upgrade
    if (canBuy(cost, upgradeID)) {
      if (upgradeLevels[upgradeID] < prices[upgradeID].length) {
        upgradeLevels[upgradeID]++;
      }
      switch(parseInt(upgradeID)) {
        case 0: // weight upgrade
          if(ay > 0) {
            ay = ay - 5000;
            mass = mass - 1;
            cash -= cost;
          }
          break;
        case 1: // speed upgrade
          dragUpgrade = upgradeLevels[upgradeID];
          cash -= cost;
          break;
        case 2: // crane duration upgrade
          craneTime = 125 + craneTime;
          cash -= cost;
          break;
        case 3: // throwing power upgrades
          cash -= cost;
          velocityUpscale = upgradeLevels[upgradeID];
          break;
        case 4: // rudder upgrade 
          rudder = true;
          if(upgradeLevels[4] > 1) {
            angle_modifier += 2;
          }
          cash -= cost;
          break;
        case 5: // friction reduction upgrade
          kineticFrictionCoefficient = kineticFrictionCoefficient - 0.1;
          cash -= cost;
          break;
        case 6: // fuel upgrade
          fuelRate = fuelRate - 0.2;
          maxFuel += 10;
          fuel = maxFuel;
          cash -= cost;
          break;
        default:
          console.log("Not an upgrade!");
      }
    }
  };
  if(loggedIn) { // apply upgrades if logged in
    tempCash = cash;
    cash = 100000000;
    for(var i = 0; i < tempUpgradeLevels.length; i++) {
      for(var j = 0; j < tempUpgradeLevels[i]; j++) {
        upgrade(i);
      }
    } 
    cash = tempCash
  }
 