from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...schemas.sensordata import SensorDataIn, SensorDataOut
from ...repositories.sensordata import SensorDataRepo
from ...db.models import User
from ..deps import get_current_user, get_db

iot_router = APIRouter(prefix="/data", tags=["iot"])

@iot_router.post("/iot", response_model=SensorDataOut)
def ingest_data(payload: SensorDataIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """Ingesta idempotente: upsert por (sensor_id, timestamp)."""
    item, dup = SensorDataRepo(db).upsert(payload)
    return {
        "id": item.id,
        "sensor_id": item.sensor_id,
        "lat": item.lat,
        "lon": item.lon,
        "type": item.sensor_type,
        "value": item.value,
        "timestamp": item.timestamp,
        "duplicate": dup,
    }