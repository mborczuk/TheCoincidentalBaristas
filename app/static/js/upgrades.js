var upgrade = (upgradeID, level) => {
    switch(upgradeID) {
      case 0: // weight upgrade
        if(ay > 0) {
          ay = 9.8 * 3780 - (10000 * level);
        }
        break;
      case 1: // speed upgrade
        dragUpgrade = level;
        break;
      case 2: // crane duration upgrade
        craneTime = level * 2 + 3;
        break;
      case 3: // throwing power upgrade
        velocityUpscale = level;
        break;
      case 4: // lightweight upgrade
        mass = 20 - 0.1 * level;
        break;
      case 5: // rudder upgrade
        rudder = true;
        if(level > 1) {
          angle_modifier = 5 + level * 2;
        }
        break;
      case 6: // friction reduction upgrade
        kineticFrictionCoefficient = 1.1 - 0.1 * level;
        break;
      case 7: // fuel upgrade
        fuelRate = 1 - level * 0.2; 
        break;
      case 8: // plane model upgrade
        maxFuel += level * 5;
        ay = 9.8 * 3780 - (1000 * level);
        velocityScale = 15 + level;
        break;
      default:
        console.log("Not an upgrade!");
    }
  };

