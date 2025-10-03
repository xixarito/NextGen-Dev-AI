from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    """Configuración central del servicio."""
    PROJECT_NAME: str = "Smart Mobility Hub API"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+psycopg2://postgres:postgres@localhost:5432/smarthub")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "supersecret_dev_key")
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DEFAULT_ADMIN_USER: str = os.getenv("DEFAULT_ADMIN_USER", "admin")
    DEFAULT_ADMIN_PASS: str = os.getenv("DEFAULT_ADMIN_PASS", "admin123")

    class Config:
        env_file = ".env"

settings = Settings()