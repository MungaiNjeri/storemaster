from datetime import datetime

from app.config.database import db


class Store(db.Model):
    __tablename__ = "stores"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    business_name = db.Column(
        db.String(150),
        nullable=False,
    )

    location = db.Column(
        db.String(255),
        nullable=False,
    )

    tax_info = db.Column(
        db.String(100),
        nullable=True,
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    users = db.relationship(
        "User",
        backref="store",
        lazy=True,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "business_name": self.business_name,
            "location": self.location,
            "tax_info": self.tax_info,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def __repr__(self):
        return f"<Store {self.business_name}>"