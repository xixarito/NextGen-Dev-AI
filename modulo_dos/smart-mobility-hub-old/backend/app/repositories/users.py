from sqlalchemy.orm import Session
from ..db.models import User
from ..core.security import hash_password, verify_password

class UsersRepo:
    """Operaciones de persistencia para usuarios."""
    def __init__(self, db: Session):
        self.db = db

    def get_by_username(self, username: str) -> User | None:
        """Busca usuario por nombre único para autenticación."""
        return self.db.query(User).filter(User.username == username).first()

    def create_user(self, username: str, password: str, full_name: str | None = None) -> User:
        """Crea un nuevo usuario con hash seguro."""
        user = User(
            username=username,
            full_name=full_name,
            hashed_password=hash_password(password),
            is_active=True,
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def authenticate(self, username: str, password: str) -> User | None:
        """Valida credenciales sin filtrar errores específicos para evitar leaking."""
        user = self.get_by_username(username)
        if not user or not verify_password(password, user.hashed_password):
            return None
        return user