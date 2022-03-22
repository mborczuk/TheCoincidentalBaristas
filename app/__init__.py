from flask import Flask, Blueprint, request, session, render_template, redirect, url_for, g
import os, sqlite3, json, urllib
import db_builder

import auth, db_builder

def create_app():
    app = Flask(__name__, static_url_path='', static_folder='static')
    # Configure app key & DB location
    app.config.from_mapping(
        SECRET_KEY = os.urandom(32),
    )
    db_builder.dbsetup()
    return app

app = create_app()

# Connect Authentication Blueprint
app.register_blueprint(auth.bp)

@app.route("/", methods=['GET', 'POST'])
def landing():
    return render_template('landing.html', login=True)

# for testing:
@app.route("/game")
def gaming():
    print(session.keys())
    return render_template('game.html', loggedIn = auth.logged_in())

@app.route("/game", methods=["POST"])
def save_js_data():
    print(session)
    print(request.form)
    db_builder.save(session['username'], request.form['data'])
    return render_template('game.html', loggedIn = auth.logged_in())

if __name__ == "__main__":
    app.debug = True
    app.run()
