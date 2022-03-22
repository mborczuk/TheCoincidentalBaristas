from flask import Flask, Blueprint, request, session, render_template, redirect, url_for, g
import os, sqlite3, json, urllib
import db_builder

import auth, db_builder
def load():
    if(auth.logged_in()):
        data = db_builder.load(session["username"])
        print(data)
        return render_template('game.html', loggedIn = auth.logged_in(), cash = data[3], upgrades = data[4], totalDistance = data[5], gaming = data[6])
    else:
        return render_template('game.html', loggedIn = auth.logged_in())
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
    print(session)
    return render_template('landing.html', login=True)

# for testing:
@app.route("/game")
def gaming():
    print(session.keys())
    return load()

@app.route("/game", methods=["POST"])
def save_js_data():
    print(session)
    print(request.form)
    db_builder.save(session['username'], request.form['data'])
    return load()

if __name__ == "__main__":
    app.debug = True
    app.run()
