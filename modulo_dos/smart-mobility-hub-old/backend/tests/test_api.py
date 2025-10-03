from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def get_token() -> str:
    """Helper: inicia sesión con el admin sembrado."""
    resp = client.post("/auth/login", data={"username": "admin", "password": "admin123"})
    assert resp.status_code == 200, resp.text
    return resp.json()["access_token"]

def test_users_me_requires_auth():
    resp = client.get("/users/me")
    assert resp.status_code == 401

def test_login_and_users_me_ok():
    token = get_token()
    resp = client.get("/users/me", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["username"] == "admin"
    assert data["is_active"] is True

def test_iot_ingest_and_duplicate():
    token = get_token()
    payload = {
        "sensor_id": "S-Z1-001",
        "lat": 40.4168,
        "lon": -3.7038,
        "type": "traffic",
        "value": 123.4,
        "timestamp": "2025-01-01T10:00:00+00:00",
    }
    r1 = client.post("/data/iot", json=payload, headers={"Authorization": f"Bearer {token}"})
    assert r1.status_code == 200, r1.text
    d1 = r1.json()
    assert d1["duplicate"] is False
    r2 = client.post("/data/iot", json=payload, headers={"Authorization": f"Bearer {token}"})
    assert r2.status_code == 200
    d2 = r2.json()
    assert d2["duplicate"] is True