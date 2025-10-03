from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import Base, engine, SessionLocal
from .errors import register_error_handlers
from .routers import auth, users, iot
from .seed import seed_admin

app = FastAPI(title=settings.APP_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.CORS_ORIGINS.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_error_handlers(app)

@app.on_event("startup")
def on_startup():
    """Inicializa DB y datos semilla para desarrollo rápido."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_admin(db)
    finally:
        db.close()

app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(users.router, prefix=settings.API_V1_STR)
app.include_router(iot.router, prefix=settings.API_V1_STR)