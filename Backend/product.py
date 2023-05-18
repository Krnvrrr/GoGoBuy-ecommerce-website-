from flask import Blueprint,current_app,request,jsonify
from flask_pymongo import PyMongo
import jwt
from bson import ObjectId

product =   Blueprint("product",__name__)

@product.route("/allItems",methods=['get'])
def allItems():
    '''for desplaying all products in our database'''
    try:
        token = request.headers['auth-token']
        user_id = jwt.decode(token, key=current_app.config['SECRET_KEY'], algorithms=['HS256'])
        if not token == user_id['id']:
            return jsonify(message="use a valid auth token"), 401
    except:
        return jsonify(message="you are not using a token"), 400
    all_product = PyMongo(current_app).db.items
    all_items=[]

    for user in all_product.find():
        all_items.append({
            "product_name":user["product_name"],
            "id":str(user['_id']),
            "unit_price":user["unit_price"],
            "cetagory":user["cetagory"]
        })

    return jsonify(all_items),200

@product.route("/addItem",methods=['post'])
def createOne():
    '''adding a product into our database'''
    try:
        token = request.headers['auth-token']
        if not token:
            return jsonify(message="use a valid auth token"), 401
    except:
        return jsonify(message="you are not using a token")
    all_product = PyMongo(current_app).db.items
    item=all_product.find_one({'product_name':request.json['product_name']})

    if item:
        return jsonify(message="product with same name already exist"),401
    user_id = jwt.decode(token,key=current_app.config['SECRET_KEY'],algorithms=['HS256'])
    all_product.insert_one({
        'product_name': request.json['product_name'],
        'unit_price': request.json['unit_price'],
        'cetagory': request.json['cetagory'],
        'user_id':user_id['id'],
        'rating':'not rated'
    })
    return jsonify(message= "item added successfully"),200

@product.route("/update/<id>",methods=['put'])
def updateitem(id):
    '''updating selected product'''
    try:
        token = request.headers['auth-token']
        user_id = jwt.decode(token, key=current_app.config['SECRET_KEY'], algorithms=['HS256'])
        if not token==user_id['id']:
            return jsonify(message="use a valid auth token"), 401
    except:
        return jsonify(message="you are not using a token"),400

    all_product = PyMongo(current_app).db.items
    all_product.update_one({'_id':ObjectId(id)},
    {'$set': {'product_name': request.json['product_name'],
     'unit_price': request.json['unit_price'],
     'cetagory': request.json['cetagory']}})
    return jsonify(message="selected item is updated"),200

@product.route("/delete/<id>",methods=['delete'])
def deleteitem(id):
    '''deleting selected product'''
    try:
        token = request.headers['auth-token']
        user_id = jwt.decode(token, key=current_app.config['SECRET_KEY'], algorithms=['HS256'])
        if not token == user_id['id']:
            return jsonify(message="use a valid auth token"), 401
    except:
        return jsonify(message="you are not using a token"), 400

    all_product = PyMongo(current_app).db.items
    all_product.delete_one({'_id':ObjectId(id)})
    return jsonify(message="selected item is deleted"),200

@product.route("/items/<cetagory>",methods=['get'])
def cetagorytems(cetagory):
    '''getting products cetagorywise'''
    try:
        token = request.headers['auth-token']
        user_id = jwt.decode(token, key=current_app.config['SECRET_KEY'], algorithms=['HS256'])
        if not token == user_id['id']:
            return jsonify(message="use a valid auth token"), 401
    except:
        return jsonify(message="you are not using a token"), 400
    all_product = PyMongo(current_app).db.items
    all_items=[]

    for user in all_product.find({'cetagory':str(cetagory)}):
        all_items.append({
            "product_name":user["product_name"],
            "id":str(user['_id']),
            "unit_price":user["unit_price"],
            "cetagory":user["cetagory"]
        })

    return jsonify(all_items),200