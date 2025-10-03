from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from ..core.config import settings

class Base(DeclarativeBase):
    """Base declarativa para los modelos ORM."""
    pass

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)