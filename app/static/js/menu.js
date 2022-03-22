upgrades = document.getElementsByClassName("upgrade-container");

for (let i = 0; i < upgrades.length; i++) {
    let levelNode = upgrades[i].querySelector('.upgrade-level');
    let price = upgrades[i].querySelector('.upgrade-price');
    // Initialize upgrade level & pricing
    if(prices[i][upgradeLevels[i]] != null) {
        levelNode.innerHTML = upgradeLevels[i] + 1
        price.innerHTML = "$" + prices[i][upgradeLevels[i]]
    }
    else {
        upgrades[i].querySelector('.level-label').innerHTML = "MAXED OUT";
        levelNode.innerHTML = ""
        price.innerHTML = ""
    }
    // Buy upgrades
    upgrades[i].addEventListener("click", function() {
        let clickedID = this.dataset.upgradeid;
        upgrade(clickedID);

        // Get level & price nodes
        let clickedLevel = this.querySelector('.upgrade-level');
        let clickedPrice = upgrades[i].querySelector('.upgrade-price');

        // Update based on new level
        if (upgradeLevels[clickedID] < prices[clickedID].length - 1) {
            clickedLevel.innerHTML = upgradeLevels[i] + 1
            clickedPrice.innerHTML = "$" + prices[clickedID][upgradeLevels[clickedID]]
        } else {
            upgrades[i].querySelector('.level-label').innerHTML = "MAXED OUT";
            clickedLevel.innerHTML = ""
            clickedPrice.innerHTML = ""
        }


        update_balance();
    });
}

// Update gaming state on play
document.getElementById('play').addEventListener("click", function() {
    hide_menu();
    gaming = true;
    save();
});

document.getElementById('replay').addEventListener("click", function() {
    hide_results();    
    gaming = false;
    save();
})

let menu = document.getElementById("menu-container");

function draw_menu() {
    update_balance();
    update_totalDistance();
    if (menu.style.display == "") {
        menu.style.display = "flex";
    }
}

function hide_menu() {
    if (menu.style.display == "flex") {
        menu.style.display = "";
    }
}

let balance = document.getElementById('balance');
function update_balance() {
    balance.innerHTML = "$" + cash
}

let total_distance = document.getElementById('totalDistance');
function update_totalDistance() {
    total_distance.innerHTML = "Progress: " + Math.round((totalDistance + roundedDistance) * 100) / 100 + "m";
}
