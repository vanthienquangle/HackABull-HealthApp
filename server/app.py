from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import mongo, jwt


# Khởi tạo Flask app và config
app = Flask(__name__)
app.config.from_object(Config)

# Khởi tạo CORS (cho phép frontend React truy cập)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

# Khởi tạo MongoDB và JWT
mongo.init_app(app)
jwt.init_app(app)

# Gắn db Mongo vào app context
app.db = mongo.db

# Đăng ký các blueprint routes
from routes.auth_routes import auth_bp
from routes.health_routes import health_bp
from routes.predict_routes import predict_bp

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(health_bp, url_prefix="/api")
app.register_blueprint(predict_bp, url_prefix="/api")

# Chạy ứng dụng
if __name__ == "__main__":
    app.run(port=5001, debug=True)
