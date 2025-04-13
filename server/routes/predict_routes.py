from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import joblib
import numpy as np
from datetime import datetime

predict_bp = Blueprint("predict", __name__)
model = joblib.load("stroke_model.pkl")

@predict_bp.route("/predict-stroke", methods=["POST"])
@jwt_required()
def predict_stroke():
    try:
        db = current_app.db
        username = get_jwt_identity()
        data = request.get_json()

        input_values = [
            float(data.get("Age")),
            int(data.get("Sex")),
            float(data.get("BMI")),
            int(data.get("HighBP")),
            int(data.get("Diabetes")),
            int(data.get("HeartDiseaseorAttack")),
            int(data.get("PhysActivity"))
        ]

        prob = model.predict_proba([input_values])[0][1] * 100
        user_risk = round(prob, 2)

        db.predictions.insert_one({
            "username": username,
            "Age": input_values[0],
            "Sex": input_values[1],
            "BMI": input_values[2],
            "HighBP": input_values[3],
            "Diabetes": input_values[4],
            "HeartDiseaseorAttack": input_values[5],
            "PhysActivity": input_values[6],
            "user_risk": user_risk,
            "healthy_risk": 3.5,
            "date": datetime.now().strftime("%Y-%m-%d %H:%M")
        })

        return jsonify({
            "user_risk": user_risk,
            "healthy_risk": 3.5
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@predict_bp.route("/predict-latest", methods=["GET"])
@jwt_required()
def get_latest_stroke_prediction():
    db = current_app.db
    username = get_jwt_identity()
    record = db.predictions.find_one({"username": username}, sort=[("_id", -1)])

    if not record:
        return jsonify({"msg": "Chưa có dự đoán nào"}), 404

    return jsonify({
        "user_risk": record["user_risk"],
        "healthy_risk": record["healthy_risk"],
        "date": record["date"]
    }), 200