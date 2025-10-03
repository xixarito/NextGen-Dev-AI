from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...schemas.user import UserOut
from ...db.models import User
from ..deps import get_current_user, get_db

users_router = APIRouter(prefix="/users", tags=["users"])

@users_router.get("/me", response_model=UserOut)
def read_users_me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Devuelve el perfil del usuario autenticado."""
    return current_user