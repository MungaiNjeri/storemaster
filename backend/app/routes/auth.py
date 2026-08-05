from flask import Blueprint, jsonify, request
from app.services.auth_service import (create_user, authenticate_user)
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

    data = request.get_json()

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "Cashier")

    # Validate required fields
    if not full_name or not email or not password:
        return jsonify(
            {
                "message": "Full name, email and password are required."
            }
        ), 400

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

    return jsonify(
        {
            "message": "User created successfully.",
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
            },
        }
    ), 201
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

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
            },
        }
    ), 200