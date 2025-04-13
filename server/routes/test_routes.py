from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/predict-stroke", methods=["POST"])
@jwt_required()
def predict_stroke():
    try:
        db = current_app.db
        username = get_jwt_identity()
        data = request.get_json()

        input_values = {
            "username": username,
            "Age": float(data["Age"]),
            "Sex": int(data["Sex"]),
            "BMI": float(data["BMI"]),
            "HighBP": int(data["HighBP"]),
            "Diabetes": int(data["Diabetes"]),
            "HeartDiseaseorAttack": int(data["HeartDiseaseorAttack"]),
            "PhysActivity": int(data["PhysActivity"]),
            "timestamp": datetime.utcnow(),
        }

        # Lưu vào MongoDB
        db.predictions.insert_one(input_values)

        # Dự đoán (ví dụ dummy)
        user_risk = round(65.2, 2)
        healthy_risk = round(12.7, 2)

        return jsonify({
            "user_risk": user_risk,
            "healthy_risk": healthy_risk
        }), 200

    except Exception as e:
        return jsonify({"msg": f"Lỗi server: {str(e)}"}), 500
