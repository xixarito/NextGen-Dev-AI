from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from .config import settings
from .database import SessionLocal
from .models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    cred_exc = HTTPException(status_code=401, detail="Invalid credentials")
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGO])
        username: str = payload.get("sub")
        if not username:
            raise cred_exc
    except JWTError:
        raise cred_exc
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise cred_exc
    return user