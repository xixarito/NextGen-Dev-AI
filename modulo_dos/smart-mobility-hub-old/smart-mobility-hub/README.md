# Smart Mobility Hub
- **Setup:**
  1. Copy `.env.example` to `.env` and adjust secrets.
  2. Run `docker compose up -d --build`.
  3. Access Backend: [http://localhost:8000/api/docs](http://localhost:8000/api/docs) | Frontend: [http://localhost:5173](http://localhost:5173).
  4. Seed user: **admin** / **admin123**.
  5. For tests: Run `docker compose exec backend pytest -q`.

- **Endpoints:**
  - `POST /api/auth/login` (OAuth2 password)
  - `GET /api/users/me` (JWT)
  - `POST /api/data/iot` (JWT)
  - `GET /api/data/iot` (JWT, list)

- **Technologies:** FastAPI, React TS, PostgreSQL, OAuth2 JWT, Docker.

- **Challenges:** JWT security, duplicate ingestion, DB scalability, CORS, strict validation.

- **Quick Validation:**
  - `curl -X POST -d 'username=admin&password=admin123' http://localhost:8000/api/auth/login`
  - `export TOKEN=...; curl -H "Authorization: Bearer $TOKEN" http://localhost:8000/api/users/me`
  - `curl -X POST -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"sensor_id":"S1","latitude":19.4,"longitude":-99.2,"sensor_type":"air","value":42.5,"timestamp":"2025-01-01T10:00:00Z"}' http://localhost:8000/api/data/iot`
  - `curl -H "Authorization: Bearer $TOKEN" http://localhost:8000/api/data/iot?limit=10`