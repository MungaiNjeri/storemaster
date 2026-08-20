from flask import Blueprint, jsonify, request

from app.services.auth_service import (
    create_user,
    authenticate_user,
)

from flask_jwt_extended import create_access_token


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/health", methods=["GET"])
def health():
    return jsonify(
        {
            "message": "Authentication service is running.",
            "status": "success",
        }
    )


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify(
            {
                "message": "Request body must be valid JSON."
            }
        ), 400

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")

    # Owner registration should always create an Admin
    role = "Admin"

    # Validate required fields
    if not full_name or not email or not password:
        return jsonify(
            {
                "message": "Full name, email and password are required."
            }
        ), 400

    # Create user
    user = create_user(
        full_name,
        email,
        password,
        role,
    )

    if not user:
        return jsonify(
            {
                "message": "Email already exists."
            }
        ), 400

    # Create JWT immediately after registration
    access_token = create_access_token(
        identity=str(user.id)
    )

    return jsonify(
        {
            "message": "User created successfully.",

            "token": access_token,

            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
                "store_id": user.store_id,
            },
        }
    ), 201


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json(silent=True)

    print("LOGIN DATA:", data)
    print("CONTENT TYPE:", request.content_type)

    if not isinstance(data, dict):
        return jsonify(
            {
                "message": "Request body must be valid JSON."
            }
        ), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify(
            {
                "message": "Email and password are required."
            }
        ), 400

    user = authenticate_user(
        email,
        password,
    )

    if not user:
        return jsonify(
            {
                "message": "Invalid email or password."
            }
        ), 401

    access_token = create_access_token(
        identity=str(user.id)
    )

    return jsonify(
        {
            "message": "Login successful.",

            "token": access_token,

            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
                "store_id": user.store_id,
            },
        }
    ), 200