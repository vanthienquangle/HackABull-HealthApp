from flask import Blueprint, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import joblib
import numpy as np
from food_suggestion import suggest_food

meal_bp = Blueprint("meal", __name__)
model = joblib.load("nutrition_model.pkl")

@meal_bp.route("/meal-suggestion", methods=["GET"])
@jwt_required()
def get_meal_suggestion():
    db = current_app.db
    username = get_jwt_identity()

    # Lấy thông tin sức khỏe mới nhất
    record = db.health.find_one({"username": username}, sort=[("_id", -1)])

    if not record or not all(k in record for k in ("Age", "Sex", "BMI")):
        return jsonify({"error": "Không có đủ dữ liệu để gợi ý"}), 400

    input_array = np.array([[record["Age"], record["Sex"], record["BMI"]]])
    prediction = model.predict(input_array)[0]
    protein, carb, fiber, fat = prediction

    meals = suggest_food(
        food_type="meal",
        protein=round(protein, 1),
        fiber=round(fiber, 1),
        potassium=1000,
        magnesium=300,
        region="Vietnamese"
    )

    meals = meals.split("\n")

    return jsonify({
        "meals": [item.split("*") for item in meals],
        "nutrition": {
            "protein": round(protein, 1),
            "carb": round(carb, 1),
            "fiber": round(fiber, 1),
            "fat": round(fat, 1),
        }
    })
