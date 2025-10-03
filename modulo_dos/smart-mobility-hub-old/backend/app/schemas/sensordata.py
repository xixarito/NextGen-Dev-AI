from pydantic import BaseModel, Field, field_validator
from datetime import datetime, timezone

class SensorDataIn(BaseModel):
    """Entrada validada para ingesta de datos IoT."""
    sensor_id: str = Field(min_length=1, max_length=64)
    lat: float
    lon: float
    type: str = Field(pattern=r"^(traffic|air_quality)$")
    value: float
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @field_validator("lat")
    @classmethod
    def check_lat(cls, v: float) -> float:
        if not (-90 <= v <= 90):
            raise ValueError("lat fuera de rango")
        return v

    @field_validator("lon")
    @classmethod
    def check_lon(cls, v: float) -> float:
        if not (-180 <= v <= 180):
            raise ValueError("lon fuera de rango")
        return v

class SensorDataOut(BaseModel):
    """Salida de datos IoT, incluyendo bandera de duplicado."""
    id: int
    sensor_id: str
    lat: float
    lon: float
    type: str
    value: float
    timestamp: datetime
    duplicate: bool = False