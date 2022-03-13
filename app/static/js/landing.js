
// LOGISTER PANEL TOGGLING

var play_btn = document.getElementById('play-btn');
var toggle_logister = document.getElementById('logister-toggle');
var logister_open = false;
var on_login = true

var login_panel = document.getElementById('login-container');
var design_panel = document.getElementById('design-container');

toggle_logister.addEventListener('click', function() {
    if (!logister_open) {
        // Swap button styles
        play_btn.classList.remove('btn-fill');
        play_btn.classList.add('btn-outline');
        toggle_logister.classList.remove('btn-outline');
        toggle_logister.classList.add('btn-fill')

        // Open the logister panel
        
        logister_open = true;
        if (on_login) {
            login_panel.style.display = 'grid';
        } else {
            register_panel.style.display = 'grid';
        }
        design_panel.style.display = 'none';
    }
}); 

play_btn.addEventListener('click', function() {
    if (logister_open) {
        // Swap button styles
        play_btn.classList.remove('btn-outline');
        play_btn.classList.add('btn-fill');
        toggle_logister.classList.remove('btn-fill');
        toggle_logister.classList.add('btn-outline');
    
        logister_open = false;
        login_panel.style.display = 'none';
        design_panel.style.display = 'block';
    }

});