import pytest
from pydantic import ValidationError
from datetime import datetime
from app.schemas import (
    SensorDataCreate, 
    SensorDataRead, 
    UserRead,
    Token
)

def test_sensor_data_create_valid():
    """Test valid sensor data creation"""
    data = {
        "sensor_id": "TEMP_001",
        "latitude": 19.4326,
        "longitude": -99.1332,
        "sensor_type": "temperature",
        "value": 23.5,
        "timestamp": "2025-01-01T10:00:00Z"
    }
    
    sensor_data = SensorDataCreate(**data)
    assert sensor_data.sensor_id == "TEMP_001"
    assert sensor_data.latitude == 19.4326
    assert sensor_data.longitude == -99.1332
    assert sensor_data.sensor_type == "temperature"
    assert sensor_data.value == 23.5

def test_sensor_data_create_invalid_coordinates():
    """Test sensor data creation with invalid coordinates"""
    # Invalid latitude (>90)
    data = {
        "sensor_id": "TEMP_001",
        "latitude": 91.0,
        "longitude": -99.1332,
        "sensor_type": "temperature",
        "value": 23.5,
        "timestamp": "2025-01-01T10:00:00Z"
    }
    
    with pytest.raises(ValidationError):
        SensorDataCreate(**data)
    
    # Invalid longitude (>180)
    data["latitude"] = 19.4326
    data["longitude"] = 181.0
    
    with pytest.raises(ValidationError):
        SensorDataCreate(**data)

def test_sensor_data_create_missing_fields():
    """Test sensor data creation with missing required fields"""
    data = {
        "sensor_id": "TEMP_001",
        # Missing latitude
        "longitude": -99.1332,
        "sensor_type": "temperature",
        "value": 23.5,
        "timestamp": "2025-01-01T10:00:00Z"
    }
    
    with pytest.raises(ValidationError):
        SensorDataCreate(**data)

def test_user_read_schema():
    """Test user read schema"""
    data = {
        "id": 1,
        "username": "testuser"
    }
    
    user = UserRead(**data)
    assert user.id == 1
    assert user.username == "testuser"

def test_token_schema():
    """Test token schema"""
    data = {
        "access_token": "test_token_123",
        "token_type": "bearer"
    }
    
    token = Token(**data)
    assert token.access_token == "test_token_123"
    assert token.token_type == "bearer"

def test_sensor_data_read_schema():
    """Test sensor data read schema"""
    data = {
        "id": 1,
        "sensor_id": "TEMP_001",
        "latitude": 19.4326,
        "longitude": -99.1332,
        "sensor_type": "temperature",
        "value": 23.5,
        "timestamp": datetime(2025, 1, 1, 10, 0, 0)
    }
    
    sensor_response = SensorDataRead(**data)
    assert sensor_response.id == 1
    assert sensor_response.sensor_id == "TEMP_001"
    assert sensor_response.sensor_type == "temperature"