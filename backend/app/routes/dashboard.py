from flask import Blueprint, jsonify

dashboard_bp = Blueprint(
    "dashboard",
    __name__,
)


@dashboard_bp.route("/stats", methods=["GET"])
def dashboard_stats():
    return jsonify(
        {
            "today_sales": 0,
            "orders": 0,
            "products": 0,
            "customers": 0,
        }
    ), 200