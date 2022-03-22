function save() {
    console.log("loggedIn: " + loggedIn);
    if(loggedIn) {
      document.getElementById("secret").value = [totalDistance, cash, upgradeLevels, gaming];
      document.getElementById("submit").submit();
    }
  }
function load() {
  
}