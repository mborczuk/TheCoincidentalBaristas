from flask import Flask, Blueprint, request, session, render_template, redirect, g
from functools import wraps
import os, sqlite3, json, urllib
import db_builder

bp = Blueprint('auth', __name__)

def logged_in():
    """Returns whether a user is logged in or not."""
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
        error = db_builder.login(username, password)

        if error:
            # If incorrect, give feedback to the user
            return render_template('login.html', error=error)
        else:
            # Store user info into a cookie
            session['username'] = username
            return redirect("/")

    return render_template('login.html')

@guest_only
@bp.route('/register', methods=['GET','POST'])
def register():

    if request.method == "POST":
        new_username = request.form["new_username"]
        new_password = request.form["new_password"]
        confirm_password = request.form["confirm_password"]

        error_message = ""
        if not new_username:
            error_message = "Error: No username entered!"
        elif not new_password:
            error_message = "Error: No password entered!"
        elif confirm_password != new_password:
            error_message = "Error: Passwords do not match!"

        if error_message:
            return render_template("register.html", error_message=error_message)

        error_message = db_builder.signup(new_username, new_password)

        if error_message:
            return render_template("register.html", error_message=error_message)
        else:
            session['username'] = new_username
            return redirect("/")

    if request.method == 'GET':
        if logged_in():
            return redirect("/")
        else:
            return render_template('register.html')

@bp.route('/logout', methods=['GET', 'POST'])
def logout():

    # Once again check for a key before popping it
    if logged_in():
        session.pop('username')

    # After logout, return to login page
    return redirect("/")