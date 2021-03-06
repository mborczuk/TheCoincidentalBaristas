
// LOGISTER PANEL TOGGLING

var play_btn = document.getElementById('play-btn');
var toggle_logister = document.getElementById('logister-toggle');
var logister_open = false;
var login_open = null;

var login_toggle = document.getElementById('login-toggle');
var register_toggle = document.getElementById('register-toggle');

var login_panel = document.getElementById('login-container');
var register_panel = document.getElementById('register-container');
var design_panel = document.getElementById('design-container');

function toggle_btn(alt, focus) {
    focus.classList.remove('btn-outline');
    focus.classList.add('btn-fill');
    alt.classList.remove('btn-fill');
    alt.classList.add('btn-outline');
}

// OPEN LOGISTER PANEL

function holder(){
    return login;
}

function holder2(){
    return logister;
}

logister_open = holder2();
login_open = holder();
console.log(login_open);

function open_logister() {
    // Swap button styles
    toggle_btn(play_btn, toggle_logister)

    // Open the logister panel
    
    logister_open = true;
    if (login_open) {
        login_panel.style.display = 'grid';
    } else {
        register_panel.style.display = 'grid';
    }
    design_panel.style.display = 'none';
}

// CLOSE LOGISTER PANEL

function close_logister() {
    // Swap button styles
    toggle_btn(toggle_logister, play_btn);

    // Close logister panel

    logister_open = false;
    login_panel.style.display = 'none';
    register_panel.style.display = 'none';
    design_panel.style.display = 'block';
}

// TOGGLE REGISTER PANEL

function open_register() {
    // Swap button styles
    login_open = false;
    toggle_btn(login_toggle, register_toggle);
    login_panel.style.display = 'none';
    register_panel.style.display = 'grid';

}

function close_register() {
    // Swap button styles

    login_open = true
    toggle_btn(register_toggle, login_toggle)
    login_panel.style.display = 'grid';
    register_panel.style.display = 'none';
}

toggle_logister.addEventListener('click', function() {
    if (!logister_open) {
        open_logister();
    }
}); 

play_btn.addEventListener('click', function() {
    if (logister_open) {
        close_logister();
    }
});

register_toggle.addEventListener('click', function(){
    if (login_open){
        open_register();
    }
})

login_toggle.addEventListener('click', function() {
    if (!login_open){
        close_register();
    }
})

// Update Panels based on js variables

if (logister_open) {
    open_logister();
} else {
    close_logister();
}