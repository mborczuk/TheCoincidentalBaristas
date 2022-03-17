function display_altitude() {
    document.getElementById('altitude').innerHTML = Math.floor(altitude / 3780 * 100) / 100;
}