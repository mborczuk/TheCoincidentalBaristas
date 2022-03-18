function display_altitude() {
    document.getElementById('altitude').innerHTML = Math.round(altitude / 3780 * 4000) / 100;
}