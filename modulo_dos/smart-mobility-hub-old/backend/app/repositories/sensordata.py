from sqlalchemy.orm import Session
from sqlalchemy import and_
from ..db.models import SensorData
from ..schemas.sensordata import SensorDataIn

class SensorDataRepo:
    """Persistencia de datos IoT con manejo de duplicados."""
    def __init__(self, db: Session):
        self.db = db

    def upsert(self, data: SensorDataIn) -> tuple[SensorData, bool]:
        """Inserta o actualiza por (sensor_id, timestamp). Devuelve (obj, duplicado?)."""
        existing = (
            self.db.query(SensorData)
            .filter(
                and_(
                    SensorData.sensor_id == data.sensor_id,
                    SensorData.timestamp == data.timestamp,
                )
            )
            .first()
        )
        if existing:
            existing.lat = data.lat
            existing.lon = data.lon
            existing.sensor_type = data.type
            existing.value = data.value
            self.db.commit()
            self.db.refresh(existing)
            return existing, True
        item = SensorData(
            sensor_id=data.sensor_id,
            lat=data.lat,
            lon=data.lon,
            sensor_type=data.type,
            value=data.value,
            timestamp=data.timestamp,
        )
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item, False