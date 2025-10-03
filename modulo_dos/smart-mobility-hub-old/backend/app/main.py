from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from .db.session import Base, engine, SessionLocal
from .db.models import User
from .api.routes.auth import auth_router
from .api.routes.users import users_router
from .api.routes.iot import iot_router
from .repositories.users import UsersRepo
from .core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        repo = UsersRepo(db)
        if not repo.get_by_username(settings.DEFAULT_ADMIN_USER):
            repo.create_user(settings.DEFAULT_ADMIN_USER, settings.DEFAULT_ADMIN_PASS, "Administrator")
    finally:
        db.close()

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={"detail": "Error interno"})

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(iot_router)