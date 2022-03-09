from flask import Flask, Blueprint, request, session, render_template, redirect, url_for, g
import os, sqlite3, json, urllib

app = Flask(__name__)


# Utility function to check if there is a session
def logged_in():
    return session.get('username') is not None

@app.route("/", methods=['GET', 'POST'])
def landing():
     return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def log_in():
    method = request.method
    # Check for session existance
    if method == 'GET':
      if logged_in():
        return redirect(url_for('landing'))
      else:
        # If not logged in, show login page
        return render_template('login.html', error=False)

    if method == 'POST':

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
        return redirect(url_for('landing'))

@app.route('/register', methods=['GET','POST'])
def register():
    method = request.method
    # Check for session existence
    if method == "GET":
        if logged_in():

            return redirect(url_for('landing'))
        else:
            # If not logged in, show regsiter page
            return render_template('register.html', error_message="")

    if method == "POST":
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
            return redirect(url_for('landing'))

@app.route('/logout', methods=['GET', 'POST'])
def logout():

    # Once again check for a key before popping it
    if logged_in():
        session.pop('username')

    # After logout, return to login page
    return redirect(url_for('landing'))
@app.route("/game") 
def test_tmplt():
    return render_template('game.html')
'''
def create_app():
    app = Flask(__name__, static_url_path='', static_folder='static')
    # Configure app key & DB location
    app.config.from_mapping(
        SECRET_KEY = os.urandom(32),
    )

    # Ensure the DB location exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    return app

app = create_app()

# Connect Authentication Blueprint
# app.register_blueprint(auth.bp)
'''
if __name__ == "__main__":
    app.debug = True
    app.run()