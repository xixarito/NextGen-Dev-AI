# FASE 1: Planificación, Arquitectura y Setup
# Archivo: docs/PLAN_ARQ_SETUP.md
#
# 1) Alcance y retos
# - Alcance: Backend FastAPI para ingesta y gestión de datos IoT (tráfico/calidad aire),
#   OAuth2 JWT, PostgreSQL para persistencia, Frontend React TS con visualización básica.
# - Retos seguridad: protección JWT, hashing contraseñas, CORS, validación Pydantic,
#   manejo de duplicados (sensor_id+timestamp), configuración segura por .env.
# - Retos escalabilidad: ingesta concurrente, índices DB, particionado por tiempo,
#   contenedorización, separación de responsabilidades, límites por función (<30 líneas).
#
# 2) Arquitectura (alto nivel)
# [IoT Devices] -> [API Backend FastAPI /data/iot]
#   - Auth OAuth2 (JWT)
#   - Validación Pydantic
#   - ORM SQLAlchemy -> [PostgreSQL]
# Frontend React TS
#   - Login -> /auth/login
#   - Dashboard -> /users/me, /data/iot
# Infra
#   - Docker (backend, frontend, db)
#   - docker-compose (red, variables .env)
#
# 3) Comandos base y estructura
# $ mkdir smart-mobility-hub && cd smart-mobility-hub
# $ mkdir -p backend/app/routers backend/app/tests frontend src docs
# $ python -m venv .venv && source .venv/bin/activate
# $ pip install fastapi uvicorn[standard] sqlalchemy psycopg2-binary python-jose[cryptography] passlib[bcrypt] pydantic-settings pytest httpx
# $ npm create vite@latest frontend -- --template react-ts && cd frontend && npm i chart.js react-chartjs-2 && cd ..
# $ touch backend/app/{main.py,config.py,database.py,models.py,schemas.py,security.py,deps.py,errors.py,seed.py}
# $ mkdir backend/app/routers && touch backend/app/routers/{auth.py,users.py,iot.py}
# $ touch docker-compose.yml backend/Dockerfile frontend/Dockerfile .env.example README.md
# $ mkdir -p backend/app/tests && touch backend/app/tests/test_api.py
# Estructura
# smart-mobility-hub/
# ├─ backend/
# │  ├─ app/
# │  │  ├─ main.py
# │  │  ├─ config.py
# │  │  ├─ database.py
# │  │  ├─ models.py
# │  │  ├─ schemas.py
# │  │  ├─ security.py
# │  │  ├─ deps.py
# │  │  ├─ errors.py
# │  │  ├─ seed.py
# │  │  └─ routers/
# │  │     ├─ auth.py
# │  │     ├─ users.py
# │  │     └─ iot.py
# │  ├─ tests/
# │  │  └─ test_api.py
# │  └─ Dockerfile
# ├─ frontend/
# │  ├─ src/
# │  │  ├─ main.tsx
# │  │  ├─ App.tsx
# │  │  ├─ components/
# │  │  │  ├─ Login.tsx
# │  │  │  └─ Dashboard.tsx
# │  │  └─ services/api.ts
# │  └─ Dockerfile
# ├─ docker-compose.yml
# ├─ .env.example
# ├─ README.md
# └─ docs/PLAN_ARQ_SETUP.md