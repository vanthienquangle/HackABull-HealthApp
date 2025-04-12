from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from extensions import mongo

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
users = mongo.db.users

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if users.find_one({"username": username}):
        return jsonify({"msg": "User already exists"}), 400

    hashed_pw = generate_password_hash(password)
    users.insert_one({"username": username, "password": hashed_pw})

    return jsonify({"msg": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = users.find_one({"username": username})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"msg": "Invalid credentials"}), 401

    # auth_routes.py
    access_token = create_access_token(identity=username)  # chỉ dùng string

    return jsonify(access_token=access_token), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user_info():
    current_user = get_jwt_identity()  # sẽ là dict {"username": ..., "role": ...}
    return jsonify(user=current_user), 200
