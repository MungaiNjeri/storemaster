from flask_bcrypt import Bcrypt
from app.models.user import User
from app.config.database import db


bcrypt = Bcrypt()


def hash_password(password):
    return bcrypt.generate_password_hash(password).decode("utf-8")


def check_password(password, hashed_password):
    return bcrypt.check_password_hash(
        hashed_password,
        password,
    )
def create_user(full_name, email, password, role="Cashier"):
    # Check if the email already exists
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return None

    # Hash the password
    hashed_password = hash_password(password)

    # Create the user
    user = User(
        full_name=full_name,
        email=email,
        password=hashed_password,
        role=role,
    )
    

    # Save to database
    db.session.add(user)
    db.session.commit()

    return user
def authenticate_user(email, password):
    user = User.query.filter_by(email=email).first()

    if not user:
        print("User not found!")
        return None

    print("Entered password:", password)
    print("Stored hash:", user.password)
    print("Match:", check_password(password, user.password))

    if not check_password(password, user.password):
        return None

    return user