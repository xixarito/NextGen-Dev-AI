from pydantic import BaseModel, Field

class UserBase(BaseModel):
    """Atributos comunes de usuario expuestos en API."""
    username: str = Field(min_length=3, max_length=50)
    full_name: str | None = None

class UserCreate(UserBase):
    """Payload para creación de usuario (no usado en MVP)."""
    password: str = Field(min_length=6, max_length=128)

class UserOut(UserBase):
    """Respuesta pública de usuario, sin credenciales."""
    id: int
    is_active: bool

class Token(BaseModel):
    """Token de acceso según OAuth2 con JWT."""
    access_token: str
    token_type: str = "bearer"