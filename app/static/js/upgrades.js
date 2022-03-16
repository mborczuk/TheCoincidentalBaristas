var upgrade = (upgradeID, level) => {
    switch(upgradeID) {
      case 0: // weight upgrade
        ay = ay - 10000;
        console.log(ay);
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
        mass = 5 - 0.1 * level;
        break;
      case 5: // rudder upgrade
        if(level == 1) {
          rudder == true;
        } else {
          
        }
        break;
      default:
        console.log("aksjdhajsd");
    }
  };
  