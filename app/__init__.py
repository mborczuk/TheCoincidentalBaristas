from flask import Flask, Blueprint, request, session, render_template, redirect, g
import os, sqlite3, json, urllib

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "No hablo queso!"

@app.route("/my_foist_template") 
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
    app.debug = True;
    app.run();