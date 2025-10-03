from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from .session import Base

class User(Base):
    """Usuario del sistema con autenticación básica."""
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    full_name: Mapped[str | None] = mapped_column(String(120), nullable=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

class SensorData(Base):
    """Mediciones IoT con unicidad por (sensor_id, timestamp)."""
    __tablename__ = "sensor_data"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    sensor_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    lat: Mapped[float] = mapped_column(Float, nullable=False)
    lon: Mapped[float] = mapped_column(Float, nullable=False)
    sensor_type: Mapped[str] = mapped_column(String(32), nullable=False)
    value: Mapped[float] = mapped_column(Float, nullable=False)
    timestamp: Mapped[DateTime] = mapped_column(DateTime(timezone=True), index=True, nullable=False)
    __table_args__ = (UniqueConstraint("sensor_id", "timestamp", name="uq_sensor_timestamp"),)