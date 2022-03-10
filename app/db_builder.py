import sqlite3   
import random 
import json

DB_FILE="data.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False)

def dbsetup():
  c = db.cursor()               #facilitate db ops -- you will use cursor to trigger db events