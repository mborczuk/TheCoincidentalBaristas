let results = document.getElementById('results-container');
let star_result = document.getElementById('star-result');
let dist_result = document.getElementById('dist-result');

function display_altitude() {
    // document.getElementById('altitude').innerHTML = Math.round(altitude / 3780 * 4000) / 100;
}

function display_results() {
    star_result.innerHTML = stars;
    dist_result = dist_result.innerHTML = (Math.round(distance / 3780 * 4000) / 100) + "m"

    results.style.visibility = 'visible';
    results.style.opacity = '1';
}