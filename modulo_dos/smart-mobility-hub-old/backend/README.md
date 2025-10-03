# Smart Mobility Hub (Backend)

1) Setup
- Run `docker-compose up --build` to start the application.
- Access the API documentation at `http://localhost:8000/docs`.

2) Endpoints (MVP)
- **POST** `/auth/login` - Authenticate user and receive a JWT.
- **GET** `/users/me` - Retrieve the authenticated user's profile (JWT required).
- **POST** `/data/iot` - Ingest IoT data (JWT required).

3) Technologies
- FastAPI, Pydantic, SQLAlchemy, PostgreSQL, OAuth2 + JWT, Docker.

4) Challenges and Mitigations
- Robust authentication using expirable JWTs.
- Strict validation with Pydantic.
- Database indexing for performance.
- Handling duplicates with upsert operations.

5) Quick Testing
- To log in: 
  ```
  curl -X POST -d 'username=admin&password=admin123' http://localhost:8000/auth/login
  ```
- To access user info:
  ```
  curl -H "Authorization: Bearer <TOKEN>" http://localhost:8000/users/me
  ```
- To ingest IoT data:
  ```
  curl -X POST -H 'Content-Type: application/json' -H "Authorization: Bearer <TOKEN>" \
    -d '{"sensor_id":"S-Z1-001","lat":40.4,"lon":-3.7,"type":"traffic","value":120,"timestamp":"2025-01-01T10:00:00+00:00"}' \
    http://localhost:8000/data/iot
  ```