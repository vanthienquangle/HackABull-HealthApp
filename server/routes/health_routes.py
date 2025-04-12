from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity

health_bp = Blueprint("health", __name__)

@health_bp.route("/health", methods=["POST"])
@jwt_required()
def save_health_data():

    db = current_app.db  # Lấy db từ app context

    data = request.get_json()
    username = get_jwt_identity()

    hba1c = data.get("hba1c")
    glucose = data.get("glucose")
    date = data.get("date")

    if not (hba1c and glucose and date):
        return jsonify({"msg": "Thiếu dữ liệu"}), 400

    new_entry = {
        "username": username,
        "hba1c": float(hba1c),
        "glucose": int(glucose),
        "date": date
    }

    db.health.insert_one(new_entry)

    return jsonify({"msg": "Lưu thành công"}), 201

@health_bp.route("/history", methods=["GET"])
@jwt_required()
def get_health_history():
    db = current_app.db

    # Log identity
    username = get_jwt_identity()
    print("🧠 USERNAME từ token:", username)

    # Lấy record
    records = db.health.find({"username": username})

    # Log số lượng record
    print("Số record tìm được:", records.count())

    result = []
    for r in records:
        result.append({
            "date": r["date"],
            "hba1c": r["hba1c"],
            "glucose": r["glucose"]
        })

    return jsonify(result), 200

