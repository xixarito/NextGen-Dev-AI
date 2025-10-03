from pydantic import BaseModel, Field, condecimal, conlist, validator
from typing import Optional
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserBase(BaseModel):
    username: str = Field(min_length=3, max_length=50)

class UserCreate(UserBase):
    password: str = Field(min_length=6, max_length=128)

class UserRead(UserBase):
    id: int

    class Config:
        from_attributes = True

class SensorDataBase(BaseModel):
    sensor_id: str = Field(min_length=1, max_length=64)
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)
    sensor_type: str = Field(min_length=1, max_length=50)
    value: float
    timestamp: datetime

class SensorDataCreate(SensorDataBase):
    pass

class SensorDataRead(SensorDataBase):
    id: int

    class Config:
        from_attributes = True