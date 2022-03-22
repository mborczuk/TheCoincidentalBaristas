upgrades = document.getElementsByClassName("upgrade-container");

for (let i = 0; i < upgrades.length; i++) {
    
    // Initialize upgrade level & pricing
    let levelNode = upgrades[i].querySelector('.upgrade-level');
    levelNode.innerHTML = upgradeLevels[i] + 1
    
    let price = upgrades[i].querySelector('.upgrade-price');
    price.innerHTML = "$" + prices[i][upgradeLevels[i]]

    // Buy upgrades
    upgrades[i].addEventListener("click", function() {
        let clickedID = this.dataset.upgradeid;
        upgrade(clickedID);
        
        let clickedLevel = this.querySelector('.upgrade-level');
        let clickedPrice = upgrades[i].querySelector('.upgrade-price');
        
        if (upgradeLevels[clickedID] < prices[clickedID].length - 1) {
            clickedLevel.innerHTML = upgradeLevels[i] + 1
            clickedPrice.innerHTML = "$" + prices[clickedID][upgradeLevels[clickedID]]
        } else {
            clickedLevel.innerHTML = "MAX"
            clickedPrice.innerHTML = ""
        }
    });
}