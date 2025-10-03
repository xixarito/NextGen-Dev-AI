from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_login():
    response = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_get_current_user():
    login_response = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    token = login_response.json()["access_token"]
    response = client.get("/api/users/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["username"] == "admin"

def test_ingest_sensor_data():
    login_response = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    token = login_response.json()["access_token"]
    sensor_data = {
        "sensor_id": "S1",
        "latitude": 19.4,
        "longitude": -99.2,
        "sensor_type": "air",
        "value": 42.5,
        "timestamp": "2025-01-01T10:00:00Z"
    }
    response = client.post("/api/data/iot", json=sensor_data, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 201
    assert response.json()["sensor_id"] == "S1"

def test_list_sensor_data():
    login_response = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    token = login_response.json()["access_token"]
    response = client.get("/api/data/iot?limit=10", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Ensure the response is a list