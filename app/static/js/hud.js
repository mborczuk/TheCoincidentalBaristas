function display_altitude() {
    document.getElementById('altitude').innerHTML = Math.round(altitude / 3780 * 4000) / 100;
}

function display_velocity() {
    document.getElementById('velocity').innerHTML = Math.round(velocity / 37.8) / 1000;
}

function display_fuel() {
    document.getElementById('fuel').innerHTML = Math.round(fuel);
}