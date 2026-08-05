import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "storemaster-secret-key",
    )
    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "storemaster-jwt-secret-key",
    )

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "sqlite:///storemaster.db",
    )
   

    SQLALCHEMY_TRACK_MODIFICATIONS = False