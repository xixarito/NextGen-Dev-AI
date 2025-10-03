import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base
from app.deps import get_db
from app.models import User
from app.security import hash_password

# Create in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={
        "check_same_thread": False,
    },
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="function")
def test_db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    
    # Create test admin user
    test_user = User(
        username="admin",
        hashed_password=hash_password("admin123")
    )
    db.add(test_user)
    db.commit()
    
    yield db
    db.close()
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def client(test_db):
    return TestClient(app)

def test_login(client):
    response = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_login_invalid_credentials(client):
    response = client.post("/api/auth/login", data={"username": "admin", "password": "wrongpassword"})
    assert response.status_code == 401

def test_get_current_user(client):
    # Login first
    login_response = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    token = login_response.json()["access_token"]
    
    # Get user info
    response = client.get("/api/users/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["username"] == "admin"

def test_get_current_user_without_token(client):
    response = client.get("/api/users/me")
    assert response.status_code == 401

def test_ingest_sensor_data(client):
    # Login first
    login_response = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    token = login_response.json()["access_token"]
    
    sensor_data = {
        "sensor_id": "TEMP_001",
        "latitude": 19.4326,
        "longitude": -99.1332,
        "sensor_type": "temperature",
        "value": 23.5,
        "timestamp": "2025-01-01T10:00:00Z"
    }
    
    response = client.post(
        "/api/data/iot", 
        json=sensor_data, 
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    assert response.json()["sensor_id"] == "TEMP_001"
    assert response.json()["sensor_type"] == "temperature"
    assert response.json()["value"] == 23.5

def test_ingest_sensor_data_without_token(client):
    sensor_data = {
        "sensor_id": "TEMP_001",
        "latitude": 19.4326,
        "longitude": -99.1332,
        "sensor_type": "temperature",
        "value": 23.5,
        "timestamp": "2025-01-01T10:00:00Z"
    }
    
    response = client.post("/api/data/iot", json=sensor_data)
    assert response.status_code == 401

def test_ingest_sensor_data_invalid_data(client):
    # Login first
    login_response = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    token = login_response.json()["access_token"]
    
    # Test with invalid latitude (>90)
    sensor_data = {
        "sensor_id": "INVALID_001",
        "latitude": 191.0,  # Invalid latitude
        "longitude": -99.1332,
        "sensor_type": "temperature",
        "value": 23.5,
        "timestamp": "2025-01-01T10:00:00Z"
    }
    
    response = client.post(
        "/api/data/iot", 
        json=sensor_data, 
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 422  # Validation error

def test_list_sensor_data(client):
    # Login first
    login_response = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    token = login_response.json()["access_token"]
    
    # Add some test data first
    sensor_data = {
        "sensor_id": "TEMP_002",
        "latitude": 19.4326,
        "longitude": -99.1332,
        "sensor_type": "temperature",
        "value": 25.0,
        "timestamp": "2025-01-01T11:00:00Z"
    }
    
    client.post(
        "/api/data/iot", 
        json=sensor_data, 
        headers={"Authorization": f"Bearer {token}"}
    )
    
    # List data
    response = client.get("/api/data/iot?limit=10", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0

def test_list_sensor_data_without_token(client):
    response = client.get("/api/data/iot?limit=10")
    assert response.status_code == 401

def test_health_check(client):
    """Test if the application is running"""
    response = client.get("/api/auth/login")  # This should return method not allowed, not 404
    assert response.status_code == 405  # Method not allowed (GET on POST endpoint)