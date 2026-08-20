import pytest

from flask import Flask

from app.config.config import Config
from app.config.database import db
from app.services.auth_service import bcrypt
from flask_jwt_extended import JWTManager


@pytest.fixture
def app():

    app = Flask(__name__)

    app.config.from_object(Config)

    # Test configuration
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    app.config["JWT_SECRET_KEY"] = "test-secret-key"

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)

    jwt = JWTManager()
    jwt.init_app(app)

    # Register routes
    from app.routes.auth import auth_bp
    from app.routes.dashboard import dashboard_bp
    from app.routes.store import store_bp

    app.register_blueprint(
        auth_bp,
        url_prefix="/api/auth"
    )

    app.register_blueprint(
        dashboard_bp,
        url_prefix="/api/dashboard"
    )

    app.register_blueprint(
        store_bp,
        url_prefix="/api/stores"
    )

    # Import models
    from app.models.user import User
    from app.models.store import Store

    with app.app_context():

        db.create_all()

        yield app

        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()