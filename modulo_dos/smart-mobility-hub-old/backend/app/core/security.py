from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import jwt, JWTError
from passlib.context import CryptContext
from .config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hashea contraseñas con bcrypt para evitar almacenamiento en claro."""
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    """Verifica una contraseña contra su hash."""
    return pwd_context.verify(plain, hashed)

def create_access_token(subject: str, expires_minutes: int | None = None) -> str:
    """Crea un JWT con expiración corta para reducir superficie de riesgo."""
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expires_minutes or settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode = {"exp": expire, "sub": str(subject)}
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

def decode_access_token(token: str) -> Optional[dict]:
    """Decodifica el token y devuelve claims si es válido; None si falla."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        return None