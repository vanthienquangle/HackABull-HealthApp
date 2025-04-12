from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import mongo, jwt  # lấy từ extensions.py

# Khởi tạo Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Khởi tạo mongo
mongo.init_app(app)

# Gắn db từ mongo vào app để dùng trong routes
app.db = mongo.db

# Kích hoạt CORS
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

# Khởi tạo JWT và Mongo
jwt.init_app(app)

# Đăng ký các route
from routes.auth_routes import auth_bp
from routes.health_routes import health_bp
from routes.predict_routes import predict_bp

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(health_bp, url_prefix="/api")
app.register_blueprint(predict_bp, url_prefix="/api")

# Chạy app
if __name__ == "__main__":
    app.run(port=5001, debug=True)
