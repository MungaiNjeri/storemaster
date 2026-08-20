from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.config.database import db
from app.models.store import Store
from app.models.user import User


store_bp = Blueprint("store", __name__)


@store_bp.route("/", methods=["POST"])
@jwt_required()
def create_store():

    # Get logged-in user's ID from JWT
    user_id = get_jwt_identity()

    # Find the user
    user = User.query.get(int(user_id))

    if not user:
        return jsonify({
            "message": "User not found."
        }), 404

    # Only Admin can create a store
    if user.role != "Admin":
        return jsonify({
            "message": "Only Admin users can create a store."
        }), 403

    # Check if Admin already has a store
    if user.store_id:
        return jsonify({
            "message": "You already have a store."
        }), 400

    # Get request data
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "message": "Request body must be valid JSON."
        }), 400

    business_name = data.get("business_name")
    location = data.get("location")
    tax_info = data.get("tax_info")

    # Validate required fields
    if not business_name or not location:
        return jsonify({
            "message": "Business name and location are required."
        }), 400

    # Create store
    store = Store(
        business_name=business_name,
        location=location,
        tax_info=tax_info,
    )

    db.session.add(store)

    # Generate store ID
    db.session.flush()

    # Connect Admin to the store
    user.store_id = store.id

    db.session.commit()

    return jsonify({
        "message": "Store created successfully.",
        "store": store.to_dict(),
    }), 201


@store_bp.route("/", methods=["GET"])
@jwt_required()
def get_store():

    # Get logged-in user
    user_id = get_jwt_identity()

    user = User.query.get(int(user_id))

    if not user:
        return jsonify({
            "message": "User not found."
        }), 404

    # Make sure user belongs to a store
    if not user.store_id:
        return jsonify({
            "message": "You are not connected to a store."
        }), 404

    # Find store
    store = Store.query.get(user.store_id)

    if not store:
        return jsonify({
            "message": "Store not found."
        }), 404

    return jsonify({
        "store": store.to_dict()
    }), 200