from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity

health_bp = Blueprint("health", __name__)

@health_bp.route("/health", methods=["POST"])
@jwt_required()
def save_health_data():
    db = current_app.db
    username = get_jwt_identity()
    data = request.get_json()

    required_fields = ["Age", "Sex", "BMI", "HighBP", "Diabetes", "HeartDiseaseorAttack", "PhysActivity"]
    if not all(field in data for field in required_fields):
        return jsonify({"msg": "Thiếu dữ liệu"}), 400

    new_entry = {
        "username": username,
        "Age": float(data["Age"]),
        "Sex": int(data["Sex"]),
        "BMI": float(data["BMI"]),
        "HighBP": int(data["HighBP"]),
        "Diabetes": int(data["Diabetes"]),
        "HeartDiseaseorAttack": int(data["HeartDiseaseorAttack"]),
        "PhysActivity": int(data["PhysActivity"]),
    }

    db.health.insert_one(new_entry)
    return jsonify({"msg": "Lưu thông tin sức khỏe thành công"}), 201

@health_bp.route("/history", methods=["GET"])
@jwt_required()
def get_health_history():
    db = current_app.db
    username = get_jwt_identity()
    print("🧠 USERNAME từ token:", username)

    records = list(db.health.find({"username": username}))
    print("Số record tìm được:", len(records))

    result = []
    for r in records:
        entry = {
            "date": r.get("date", ""),  # nếu có
            "hba1c": r.get("hba1c", None),
            "glucose": r.get("glucose", None),
            "Age": r.get("Age", None),
            "Sex": r.get("Sex", None),
            "BMI": r.get("BMI", None),
            "HighBP": r.get("HighBP", None),
            "Diabetes": r.get("Diabetes", None),
            "HeartDiseaseorAttack": r.get("HeartDiseaseorAttack", None),
            "PhysActivity": r.get("PhysActivity", None)
        }
        result.append(entry)

    return jsonify(result), 200


