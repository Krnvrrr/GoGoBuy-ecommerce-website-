from flask import Flask,request,jsonify
from flask_pymongo import PyMongo
from trader import trader
from costumers import costumer
from product import product
from flask_cors import CORS
import jwt
import datetime
app=Flask(__name__)
CORS(app)
app.register_blueprint(trader,url_prefix='/admin')
app.register_blueprint(costumer,url_prefix='/costumer')
app.register_blueprint(product,url_prefix="")
app.config['SECRET_KEY']="Nice_for_what"
app.config["MONGO_URI"]='mongodb://127.0.0.1:27017/Ecommers'
secret_key="Nice_for_what"
@app.route("/")
def hello_world():
    return '<h1>hello world!</h1>'


app.run(debug=True)
