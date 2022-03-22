let results = document.getElementById('results-container');
let star_result = document.getElementById('star-result');
let dist_result = document.getElementById('dist-result');

function display_altitude() {
    document.getElementById('altitude').innerHTML = Math.round(altitude / 3780 * 4000) / 100 +"m";
}

function display_results() {
    star_result.innerHTML = stars;
    dist_result = dist_result.innerHTML = roundedDistance + "m"
    document.getElementById('total-result').innerHTML = "$" + calculateCash();

    results.style.visibility = 'visible';
    results.style.opacity = '1';
}

function hide_results() {
    results.style.visibility = 'hidden';
    results.style.opacity = '0';
}

function display_velocity() {
    document.getElementById('velocity').innerHTML = Math.round(velocity / 37.8) / 1000 + "m/s";
}

function display_fuel() {
    document.getElementById('fuel').innerHTML = Math.round(fuel);
}

function display_distance() {
    document.getElementById('distance').innerHTML = roundedDistance + "m";
}