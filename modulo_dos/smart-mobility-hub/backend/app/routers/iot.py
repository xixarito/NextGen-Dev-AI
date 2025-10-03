from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from ..deps import get_current_user, get_db
from ..schemas import SensorDataCreate, SensorDataRead
from ..models import SensorData
from typing import List

router = APIRouter(prefix="/data", tags=["iot"])

@router.post("/iot", response_model=SensorDataRead, status_code=201)
def ingest_data(payload: SensorDataCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    """Ingesta datos IoT validando duplicados (sensor_id+timestamp)."""
    entity = SensorData(**payload.model_dump())
    db.add(entity)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Duplicate sensor data")
    db.refresh(entity)
    return entity

@router.get("/iot", response_model=List[SensorDataRead])
def list_data(limit: int = Query(50, ge=1, le=500), db: Session = Depends(get_db), user=Depends(get_current_user)):
    """Lista datos recientes para visualización básica."""
    return db.query(SensorData).order_by(SensorData.timestamp.desc()).limit(limit).all()