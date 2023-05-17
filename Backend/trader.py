from flask import Blueprint,jsonify,current_app,request
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
import jwt
import datetime
trader =   Blueprint("trader",__name__)
@trader.route("/Register",methods=["post"])
def adminRegister():
    '''Endpoint for registring as a seller on gogobuy'''
    all_users=PyMongo(current_app).db.admin
    bcrypt = Bcrypt(current_app)
    user= all_users.find_one({'email':request.json['email']})
    phone=all_users.find_one({'phone': request.json['phone']})
    name=all_users.find_one({'company_name':request.json['company_name']})
    if user:
        return jsonify(message="user with same email already exists"),401

    if phone:
        return jsonify(message="user with same phone number already exists"),401

    if name:
        return jsonify(message="someone already registerd with this company name"),401

    hashed = bcrypt.generate_password_hash(request.json['password'],10)
    conformation = bcrypt.check_password_hash(hashed,"dakku_ek_number_da")
    all_users.insert_one({
        'email':request.json['email'],
        'phone':request.json['phone'],
        'company_name':request.json['company_name'],
        'name':request.json['name'],
        'password':hashed,
    })
    data = all_users.find_one({'email':request.json['email']})
    access_token = jwt.encode({'id': str(data['_id'])}, current_app.config['SECRET_KEY'])
    return jsonify(token=str(access_token)),200


@trader.route("/Login",methods=["post"])
def adminLogin():
    '''Login endpoint for a seller'''
    all_users = PyMongo(current_app).db.admin
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


@trader.route("/products",methods=['get'])
def adminitems():
    '''route for getting all the producted uploaded by perticular seller'''
    try:
        token = request.headers['auth-token']
        if not token:
            return jsonify(message="use a valid auth token"), 401
    except:
        return jsonify(message="you are not using a token")
    all_product = PyMongo(current_app).db.items
    all_items=[]
    id=jwt.decode(token,key=current_app.config['SECRET_KEY'],algorithms=['HS256'])
    for user in all_product.find({'user_id':str(id['id'])}):
        all_items.append({
            "product_name":user["product_name"],
            "id":str(user['_id']),
            "unit_price":user["unit_price"],
            "cetagory":user["cetagory"]
        })

    return jsonify(all_items),200