from flask import Flask, Blueprint, request, session, render_template, redirect, url_for, g
import os, sqlite3, json, urllib

import auth, db_builder

def create_app():
    app = Flask(__name__, static_url_path='', static_folder='static')
    # Configure app key & DB location
    app.config.from_mapping(
        SECRET_KEY = os.urandom(32),
    )
    return app

app = create_app()

# Connect Authentication Blueprint
app.register_blueprint(auth.bp)

@app.route("/", methods=['GET', 'POST'])
def landing():
     return render_template('landing.html')

if __name__ == "__main__":
    app.debug = True
    app.run()