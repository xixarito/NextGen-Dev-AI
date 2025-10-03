from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    """Carga segura de configuración desde variables de entorno."""
    APP_NAME: str = Field(default="Smart Mobility Hub")
    API_V1_STR: str = "/api"
    JWT_SECRET: str = Field(default="change-me")
    JWT_ALGO: str = Field(default="HS256")
    JWT_EXPIRE_MINUTES: int = Field(default=60)
    DB_HOST: str = Field(default="db")
    DB_PORT: int = Field(default=5432)
    DB_USER: str = Field(default="smh")
    DB_PASS: str = Field(default="smhpass")
    DB_NAME: str = Field(default="smh")
    CORS_ORIGINS: str = Field(default="*")

    @property
    def DATABASE_URL(self) -> str:
        """Construye URL de conexión a PostgreSQL."""
        return (
            f"postgresql+psycopg2://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

settings = Settings()