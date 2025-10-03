from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps import get_current_user, get_db
from ..schemas import UserRead
from ..models import User

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserRead)
def read_me(current_user: User = Depends(get_current_user)):
    """Devuelve el usuario autenticado para personalizar la UI."""
    return current_user