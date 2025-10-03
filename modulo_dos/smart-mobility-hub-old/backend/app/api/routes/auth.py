from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ...repositories.users import UsersRepo
from ...core.security import create_access_token
from ...schemas.user import Token
from ..deps import get_db

auth_router = APIRouter(prefix="/auth", tags=["auth"])

@auth_router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Endpoint de login placeholder que emite JWT al validar credenciales."""
    user = UsersRepo(db).authenticate(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales inválidas")
    token = create_access_token(subject=user.username)
    return {"access_token": token, "token_type": "bearer"}