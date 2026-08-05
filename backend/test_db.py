from app import create_app
from app.models.user import User

app = create_app()

with app.app_context():
    for user in User.query.all():
        print(user.to_dict())
        print("Password:", user.password)
        print("-" * 50)