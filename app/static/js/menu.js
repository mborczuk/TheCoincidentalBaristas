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
        console.log(clickedID);
        upgrade(clickedID); // MAKE THIS RETURN TRUE/FALSE
        
        // Get level & price nodes
        let clickedLevel = this.querySelector('.upgrade-level');
        let clickedPrice = upgrades[i].querySelector('.upgrade-price');
        
        // Update based on new level
        // FIX -- never gets to last level
        if (upgradeLevels[clickedID] < prices[clickedID].length - 1) {
            clickedLevel.innerHTML = upgradeLevels[i] + 1
            clickedPrice.innerHTML = "$" + prices[clickedID][upgradeLevels[clickedID]]
        } else {
            clickedLevel.innerHTML = "MAX"
            clickedPrice.innerHTML = ""
        }

        update_balance();
    });
}

// Update gaming state on play
document.getElementById('play').addEventListener("click", function() {
    hide_menu();
    gaming = true;
});

document.getElementById('replay').addEventListener("click", function() {
    console.log("CLICKING");
    hide_results();
    gaming = false;
})

let menu = document.getElementById("menu-container");

function draw_menu() {
    update_balance();
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