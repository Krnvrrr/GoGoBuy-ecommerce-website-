from flask import Blueprint,jsonify,current_app,request
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
import jwt
import datetime
from bson import ObjectId
costumer =   Blueprint("costumer",__name__)
@costumer.route("/Register",methods=["post"])
def costumerRegister():
    '''Route for costumer's registration'''
    all_users=PyMongo(current_app).db.costumer
    bcrypt = Bcrypt(current_app)
    user= all_users.find_one({'email':request.json['email']})
    phone=all_users.find_one({'phone': request.json['phone']})
    if user:
        return jsonify(message="user with same email already exists"),401

    if phone:
        return jsonify(message="user with same phone number already exists"),401

    hashed = bcrypt.generate_password_hash(request.json['password'],10)
    all_users.insert_one({
        'email':request.json['email'],
        'phone':request.json['phone'],
        'name':request.json['name'],
        'password':hashed,
        'cart':[""]
    })
    data = all_users.find_one({'email': request.json['email']})
    access_token = jwt.encode({'id': str(data['_id'])}, current_app.config['SECRET_KEY'])
    return jsonify(token=str(access_token)),200


@costumer.route("/Login",methods=["post"])
def costumerLogin():
    '''Route for costumer Login'''
    all_users = PyMongo(current_app).db.costumer
    bcrypt = Bcrypt(current_app)
    user = all_users.find_one({'email':request.json['email']})
    if user:
        conformation = bcrypt.check_password_hash(user['password'],str(request.json['password']))
        if conformation:
            access_token = jwt.encode({'id': str(user['_id'])}, current_app.config['SECRET_KEY'])
            return jsonify(token = str(access_token),name=user['name']),200
        else:
            return jsonify(message="plese enter valid login credentials"),400
    else:
        return jsonify(message="plese enter valid login credentials"),400

@costumer.route("/addCart/<id>",methods=['put'])
def addCart(id):
    '''Route for a costumer to add a product into cart'''
    try:
        token = request.headers['auth-token']
        if not token:
            return jsonify(message="use a valid auth token"), 401
    except:
        return jsonify(message="you are not using a token")
    id = jwt.decode(token, key=current_app.config['SECRET_KEY'], algorithms=['HS256'])
    all_users = PyMongo(current_app).db.costumer
    user = all_users.find_one({'_id': ObjectId(id['id'])})
    item=list(user['cart'])
    our_cart=item.append(str(id['id']))
    all_users.update_one({'_id': ObjectId(id['id'])},
                         {"$set":{
                             'cart':our_cart
                         }})
    print(user['cart'])
    return jsonify(message="successfully added to cart")

# @costumer.route("/cart",methods=['get'])
# def cart():
#     '''desplaying products in cart of perticular costumer'''
#     try:
#         token = request.headers['auth-token']
#         if not token:
#             return jsonify(message="use a valid auth token"), 401
#     except:
#         return jsonify(message="you are not using a token")
#     id = jwt.decode(token, key=current_app.config['SECRET_KEY'], algorithms=['HS256'])
#     all_users = PyMongo(current_app).db.costumer
#     user = all_users.find_one({'_id': ObjectId(id['id'])})
#     items=user['cart'].split(",")
#     print(items)
#     return jsonify(message="i dont think this is a good way")