from flask import Flask
from flask import render_template, abort, request, session, jsonify
import database as db
from sqlalchemy.exc import IntegrityError

db.init_db()
app = Flask(__name__)

app.debug = True
if __name__ == "__main__":
    app.run()
