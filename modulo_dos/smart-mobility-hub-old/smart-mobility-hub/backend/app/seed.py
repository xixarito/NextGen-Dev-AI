from sqlalchemy.orm import Session
from .models import User
from .security import hash_password

def seed_admin(db: Session) -> None:
    """Crea usuario inicial si no existe para facilitar pruebas."""
    username = "admin"
    user = db.query(User).filter(User.username == username).first()
    if not user:
        db.add(User(username=username, hashed_password=hash_password("admin123")))
        db.commit()