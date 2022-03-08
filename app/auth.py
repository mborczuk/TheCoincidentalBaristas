from flask import Flask, Blueprint, request, session, render_template, redirect, g
import os, sqlite3, json, urllib

bp = Blueprint('auth', __name__)