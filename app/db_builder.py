import sqlite3   
import random 
import json

DB_FILE="data.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor()               #facilitate db ops -- you will use cursor to trigger db events


def dbsetup():

  command = "CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, cash INTEGER, progress INTEGER)"
  c.execute(command)

  #command = "CREATE TABLE IF NOT EXISTS upgrades(user_id"

  db.commit()

def signup(username, password):
  c.execute("""SELECT username FROM users WHERE username=?""",[username])
  result = c.fetchone()

  if result:
      return "Error: Username already exists"

  else:
      c.execute('INSERT INTO user VALUES (null, ?, ?, ?, ?)', (username, password, 0, 0))
      
      db.commit()
      # Uses empty quotes since it will return false when checked as a boolean
      return  ""

# Tries to check if the username and password are valid
def login(username, password):

  c.execute("""SELECT username FROM users WHERE username=? AND password=?""",[username, password])
  result = c.fetchone()

  if result:
      ##access this specifc user data
      return False

  else:
      return True
