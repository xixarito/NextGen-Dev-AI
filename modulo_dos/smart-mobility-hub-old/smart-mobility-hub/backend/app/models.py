from sqlalchemy import Column, Integer, String, DateTime, Float, UniqueConstraint
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)

class SensorData(Base):
    __tablename__ = "sensor_data"
    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(String(64), index=True, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    sensor_type = Column(String(50), index=True, nullable=False)
    value = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True, nullable=False)
    __table_args__ = (
        UniqueConstraint('sensor_id', 'timestamp', name='uq_sensor_time'),
    )