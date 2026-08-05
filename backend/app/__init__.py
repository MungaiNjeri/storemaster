from flask import Flask
from flask_cors import CORS
from app.config.config import Config
from app.config.database import db
from app.services.auth_service import bcrypt
from flask_jwt_extended import JWTManager

jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # Import routes
    from app.routes.auth import auth_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    # Create database tables
    with app.app_context():
        from app.models.user import User

        db.create_all()

    return app