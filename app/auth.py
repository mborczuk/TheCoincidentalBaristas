from flask import Flask, Blueprint, request, session, render_template, redirect, g
from functools import wraps
import os, sqlite3, json, urllib
import db_builder

bp = Blueprint('auth', __name__)

def logged_in():
    """Returns whether a user is logged in or not."""
    print(session.keys())
    return 'username' in session.keys()

def guest_only(f):
    """Denotes a page where users that are not logged in can access."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if logged_in():
            return redirect("/")
        return f(*args, **kwargs)
    return decorated_function

@guest_only
@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':

        # Get information from request.form since it is submitted via post
        username = request.form['username']
        password = request.form['password']
        logister = True
        login = True

        error = ""
        if not username:
            error = "Error: No username entered!"
        elif not password:
            error = "Error: No password entered!"
        elif db_builder.login(username, password):
            error = "Error: Account not found!"
        else: 
            error = ""
       
        if error:
            # If incorrect, give feedback to the user
            return render_template('landing.html', error_log=error, logister=logister, login=login)
        else:
            # Store user info into a cookie
            session['username'] = username
            return redirect("/game")

    return render_template('login.html')

@guest_only
@bp.route('/register', methods=['GET','POST'])
def register():

    if request.method == "POST":

        new_username = request.form["username"]
        new_password = request.form["password"]
        logister = True
        login = False

        error = ""
        if not new_username:
            error = "Error: No username entered!"
        elif not new_password:
            error = "Error: No password entered!"
        elif db_builder.signup(new_username, new_password):
            error = "Error: Username already exists"
        else:
            error = ""

        if error:
            return render_template("landing.html", error_reg=error, logister=logister, login=login)
        else:
            session['username'] = new_username
            return redirect("/game")

    if request.method == 'GET':
        if logged_in():
            return redirect("/game")
        else:
            return render_template('landing.html')

@bp.route('/logout', methods=['GET', 'POST'])
def logout():

    # Once again check for a key before popping it
    if logged_in():
        session.pop('username')

    # After logout, return to login page
    return redirect("/")