from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from .config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hashea contraseñas para no almacenar texto plano."""
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    """Verifica contraseñas sin exponer detalles de hashing."""
    return pwd_context.verify(plain, hashed)

def create_access_token(subject: str) -> str:
    """Crea JWT de acceso con expiración."""
    exp = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    payload = {"sub": subject, "exp": exp}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGO)