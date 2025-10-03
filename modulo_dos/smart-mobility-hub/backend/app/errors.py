from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from starlette import status
import uuid

def register_error_handlers(app: FastAPI) -> None:
    """Registra manejadores globales para respuestas coherentes."""
    @app.exception_handler(ValidationError)
    async def validation_handler(request: Request, exc: ValidationError):
        return JSONResponse(status_code=400, content={"detail": exc.errors()})

    @app.exception_handler(Exception)
    async def server_error_handler(request: Request, exc: Exception):
        cid = str(uuid.uuid4())
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal server error", "correlation_id": cid},
        )