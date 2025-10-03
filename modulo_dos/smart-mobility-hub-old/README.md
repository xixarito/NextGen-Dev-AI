# Smart Mobility Hub

## Overview
The Smart Mobility Hub is a web application designed to centralize the ingestion and visualization of IoT data related to traffic and air quality across multiple zones. It utilizes modern technologies to provide a robust and scalable solution for smart city applications.

## Project Structure
The project is organized into two main parts: the backend and the frontend.

### Backend
The backend is built using FastAPI and includes the following components:
- **API Routes**: Handles authentication, user management, and IoT data ingestion.
  - `auth.py`: Authentication routes including login.
  - `users.py`: User-related routes for fetching user information.
  - `iot.py`: Routes for ingesting IoT data.
- **Core**: Contains configuration and security settings.
  - `config.py`: Configuration settings for the application.
  - `security.py`: Functions for password hashing and token management.
- **Database**: Manages database models and sessions.
  - `models.py`: Defines the database models for users and sensor data.
  - `session.py`: Sets up the database session and engine.
- **Repositories**: Contains functions for data persistence.
  - `sensordata.py`: Functions for managing sensor data.
  - `users.py`: Functions for managing user data.
- **Schemas**: Defines Pydantic schemas for data validation.
  - `sensordata.py`: Schemas for validating incoming sensor data.
  - `user.py`: Schemas for user data.
- **Main Application**: Entry point for the backend application.
  - `main.py`: Sets up the FastAPI app and includes routers.
- **Tests**: Contains tests for the API endpoints.
  - `test_api.py`: Tests for validating API functionality.

### Frontend
The frontend is built using React with TypeScript and includes:
- **Components**: UI components for user interaction.
  - `Login.tsx`: Component for user authentication.
  - `Dashboard.tsx`: Component for displaying user data and charts.
- **Services**: Functions for making API calls to the backend.
  - `api.ts`: Functions for handling API requests.
- **Main Application**: Entry point for the frontend application.
  - `App.tsx`: Main application component managing routing and state.
  - `main.tsx`: Renders the App component.

## Setup Instructions
1. Clone the repository.
2. Navigate to the project directory.
3. Run `docker-compose up --build` to start the application.
4. Access the API documentation at `http://localhost:8000/docs`.

## Endpoints
- **Authentication**
  - `POST /auth/login`: Authenticate user and retrieve JWT.
- **User Management**
  - `GET /users/me`: Retrieve the authenticated user's profile.
- **IoT Data Ingestion**
  - `POST /data/iot`: Ingest IoT data with idempotency.

## Technologies Used
- Backend: FastAPI, SQLAlchemy, PostgreSQL, OAuth2, JWT
- Frontend: React, TypeScript
- Containerization: Docker

## Challenges and Mitigations
- Implemented robust authentication using JWT with expiration.
- Ensured strict validation of incoming data using Pydantic.
- Managed database performance with appropriate indexing and upsert operations.

## Testing
- Use cURL commands to test the API endpoints.
- Example:
  - Login: `curl -X POST -d 'username=admin&password=admin123' http://localhost:8000/auth/login`
  - Fetch User Info: `curl -H "Authorization: Bearer <TOKEN>" http://localhost:8000/users/me`
  - Ingest IoT Data: `curl -X POST -H 'Content-Type: application/json' -H "Authorization: Bearer <TOKEN>" -d '{"sensor_id":"S-Z1-001","lat":40.4,"lon":-3.7,"type":"traffic","value":120,"timestamp":"2025-01-01T10:00:00+00:00"}' http://localhost:8000/data/iot`