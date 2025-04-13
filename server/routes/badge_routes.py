from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta

badge_bp = Blueprint("badges", __name__)

@badge_bp.route("/badges/checkin", methods=["POST"])
@jwt_required()
def checkin():
    db = current_app.db
    username = get_jwt_identity()
    today = datetime.now().date()

    user = db.badges.find_one({"username": username})

    if user:
        last_check = user.get("lastCheckin")
        last_check_date = datetime.strptime(last_check, "%Y-%m-%d").date()

        if last_check_date == today:
            return jsonify({"msg": "Đã check-in hôm nay", "streak": user["streak"], "lastCheckin": last_check}), 400

        if last_check_date == today - timedelta(days=1):
            new_streak = user["streak"] + 1
        else:
            new_streak = 1  # reset streak

        db.badges.update_one(
            {"username": username},
            {"$set": {"lastCheckin": today.strftime("%Y-%m-%d"), "streak": new_streak}}
        )
    else:
        db.badges.insert_one({
            "username": username,
            "lastCheckin": today.strftime("%Y-%m-%d"),
            "streak": 1
        })
        new_streak = 1

    return jsonify({"msg": "Check-in thành công!", "streak": new_streak, "lastCheckin": today.strftime("%Y-%m-%d")})

@badge_bp.route("/badges/status", methods=["GET"])
@jwt_required()
def badge_status():
    db = current_app.db
    username = get_jwt_identity()

    user = db.badges.find_one({"username": username})

    if not user:
        return jsonify({"streak": 0, "lastCheckin": None})

    return jsonify({
        "streak": user["streak"],
        "lastCheckin": user["lastCheckin"]
    })
