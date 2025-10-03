# Smart Mobility Hub

Una aplicación completa de movilidad inteligente construida con **FastAPI**, **React TypeScript**, **PostgreSQL** y **Docker**.

## � Características de la Interfaz

La aplicación cuenta con una interfaz moderna y atractiva que incluye:

### ✨ **Diseño Visual Moderno**
- **Glassmorphism** y efectos de transparencia
- **Gradientes dinámicos** en elementos clave
- **Animaciones suaves** de entrada y transición
- **Iconografía SVG** con diseño coherente
- **Paleta de colores profesional** basada en tonos azules y grises

### 📱 **Responsive Design**
- **Totalmente adaptable** a dispositivos móviles y desktop
- **Grid system flexible** para diferentes tamaños de pantalla
- **Navegación optimizada** para touch y mouse

### 🚀 **Interactividad Avanzada**
- **Dashboard en tiempo real** con actualización automática cada 30 segundos
- **Formulario interactivo** para agregar nuevos datos de sensores IoT
- **Gráficos dinámicos** con Chart.js y animaciones
- **Estados de carga** con spinners animados
- **Feedback visual** para acciones del usuario

### 📊 **Visualización de Datos**
- **Tarjetas de estadísticas** con métricas clave
- **Gráfico de barras** para valores por tipo de sensor
- **Gráfico de líneas** para tendencias temporales
- **Tabla responsiva** con paginación y ordenamiento visual
- **Badges de estado** con colores diferenciados por tipo

### 🎭 **Experiencia de Usuario**
- **Login elegante** con validación en tiempo real
- **Mensajes de error/éxito** con iconografía clara
- **Transiciones suaves** entre estados
- **Tipografía moderna** con jerarquía visual clara

## �🏗️ Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│  (React + TS)   │◄──►│   (FastAPI)     │◄──►│  (PostgreSQL)   │
│   Puerto 5173   │    │   Puerto 8000   │    │   Puerto 5432   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Docker y Docker Compose instalados
- Git (para clonar el repositorio)

### 1. Configuración del Entorno

**Primer setup (solo la primera vez):**

```bash
# 1. Clonar el repositorio (si aplica)
git clone <repository-url>
cd smart-mobility-hub

# 2. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus configuraciones específicas
```

**Variables de entorno importantes:**
- `DB_USER=smh` - Usuario de PostgreSQL
- `DB_PASS=smhpass` - Contraseña de PostgreSQL  
- `DB_NAME=smh` - Nombre de la base de datos
- `JWT_SECRET=supersecret_change_me` - ⚠️ **Cambia esto en producción**
- `VITE_API_URL=http://localhost:8000/api` - URL del API para el frontend

### 2. Levantar la Aplicación

```bash
# Construir y levantar todos los servicios
docker-compose up --build -d

# Verificar que todos los servicios estén corriendo
docker-compose ps
```

**Deberías ver 3 servicios ejecutándose:**
- `smart-mobility-hub-frontend-1` (puerto 5173)
- `smart-mobility-hub-backend-1` (puerto 8000)  
- `smart-mobility-hub-db-1` (puerto 5432)

### 3. Acceder a la Aplicación

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | [http://localhost:5173](http://localhost:5173) | Interfaz de usuario principal |
| **Backend API** | [http://localhost:8000/api/docs](http://localhost:8000/api/docs) | Documentación interactiva Swagger |
| **API Redoc** | [http://localhost:8000/redoc](http://localhost:8000/redoc) | Documentación alternativa |

### 4. Credenciales por Defecto

**Usuario administrador pre-configurado:**
- **Username:** `admin`
- **Password:** `admin123`

### 5. Funcionalidades Principales

🔐 **Autenticación Segura**
- Login con JWT tokens
- Validación en tiempo real
- Sesión persistente

📊 **Dashboard Interactivo**
- Estadísticas en tiempo real
- Gráficos dinámicos (barras y líneas)
- Actualización automática cada 30 segundos
- Tabla de datos con filtrado visual

➕ **Gestión de Datos IoT**
- Formulario para agregar nuevos datos de sensores
- Validación de campos en tiempo real
- Soporte para múltiples tipos de sensores:
  - 🌡️ Temperatura
  - 💧 Humedad  
  - 🌬️ Calidad del Aire
  - 📊 Presión
  - 🔊 Ruido
  - 🚶 Movimiento
- Geolocalización con coordenadas

🎨 **Interfaz Moderna**
- Diseño responsive para todos los dispositivos
- Animaciones suaves y transiciones
- Efectos visuales avanzados
- Iconografía SVG profesional

## 📡 Endpoints de la API

### Autenticación
- `POST /api/auth/login` - Iniciar sesión (OAuth2 password flow)

### Usuarios  
- `GET /api/users/me` - Obtener información del usuario actual (requiere JWT)

### Datos IoT
- `POST /api/data/iot` - Crear nuevo registro de sensor (requiere JWT)
- `GET /api/data/iot` - Listar registros de sensores (requiere JWT)

## 🧪 Validación Rápida con cURL

### 1. Obtener Token de Acceso
```bash
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin123" \
  http://localhost:8000/api/auth/login
```

### 2. Guardar Token (reemplaza YOUR_TOKEN_HERE)
```bash
export TOKEN="YOUR_TOKEN_HERE"
```

### 3. Verificar Usuario
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/users/me
```

### 4. Crear Registro IoT
```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sensor_id": "TEMP_001",
    "latitude": 19.4326,
    "longitude": -99.1332,
    "sensor_type": "temperature",
    "value": 23.5,
    "timestamp": "2025-10-02T10:00:00Z"
  }' \
  http://localhost:8000/api/data/iot
```

### 5. Listar Registros IoT
```bash
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8000/api/data/iot?limit=10"
```

## 🧪 Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas del backend
docker-compose exec backend pytest -v

# Ejecutar pruebas en modo silencioso
docker-compose exec backend pytest -q

# Ejecutar pruebas con cobertura de código
docker-compose exec backend pytest --cov=app tests/
```

**📊 Resumen de Tests Disponibles:**
- **18 tests** implementados cubriendo:
  - ✅ **Autenticación** - Login, tokens JWT, validación de credenciales
  - ✅ **API de usuarios** - Obtener información del usuario actual
  - ✅ **API de datos IoT** - Crear y listar datos de sensores
  - ✅ **Validación de esquemas** - Validación de coordenadas, campos requeridos
  - ✅ **Seguridad** - Hash de contraseñas, generación de tokens
  - ✅ **Casos de error** - Autenticación fallida, datos inválidos

**🚀 Todos los tests pasan exitosamente:**
```
====== 18 passed, 5 warnings in 5.54s ======
```

**📊 Cobertura de Código Actual:**
```
---------- coverage: platform linux, python 3.11.13-final-0 ----------
Name                   Stmts   Miss  Cover
------------------------------------------
app/config.py             18      0   100%
app/database.py            6      0   100%
app/deps.py               26      8    69%
app/errors.py             13      3    77%
app/main.py               20      5    75%
app/models.py             19      0   100%
app/routers/auth.py       15      0   100%
app/routers/iot.py        22      3    86%
app/routers/users.py       9      0   100%
app/schemas.py            27      0   100%
app/security.py           13      0   100%
app/seed.py                9      5    44%
------------------------------------------
TOTAL                    197     24    88%
```

**✅ Excelente cobertura del 88% del código total**

## 🛠️ Desarrollo

### Estructura del Proyecto
```
smart-mobility-hub/
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── main.py         # Punto de entrada
│   │   ├── models.py       # Modelos SQLAlchemy
│   │   ├── schemas.py      # Esquemas Pydantic
│   │   ├── security.py     # Autenticación JWT
│   │   └── routers/        # Rutas de la API
│   ├── tests/              # Pruebas unitarias
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── services/       # Servicios API
│   │   └── main.tsx        # Punto de entrada
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Configuración de servicios
├── .env                    # Variables de entorno (NO subir a git)
├── .env.example           # Plantilla de variables de entorno
├── .gitignore             # Archivos excluidos de git
├── SECURITY.md            # Guía de seguridad
└── README.md              # Este archivo
```

### Comandos Útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend

# Reconstruir solo un servicio
docker-compose up --build -d frontend

# Parar todos los servicios
docker-compose down

# Parar y eliminar volúmenes (⚠️ elimina datos de BD)
docker-compose down -v

# Ejecutar comando en contenedor
docker-compose exec backend bash
docker-compose exec frontend sh
```

## 🔒 Consideraciones de Seguridad

⚠️ **IMPORTANTE:** Antes de deployar en producción, revisa el archivo [`SECURITY.md`](./SECURITY.md) para configuraciones críticas.

### 🛡️ **Variables de Entorno**
- **JWT Secret:** Cambia `JWT_SECRET` en `.env` por un valor aleatorio de 32+ caracteres
- **Contraseñas:** Cambia credenciales por defecto de la base de datos  
- **CORS:** Configurado como `*` para desarrollo, restringe en producción
- **HTTPS:** Implementa certificados SSL/TLS en producción

### 📁 **Gestión de Archivos**
- **`.gitignore`** configurado para proteger credenciales y archivos sensibles
- **`.env.example`** disponible como plantilla para nuevos entornos
- **Logs y cache** excluidos automáticamente del repositorio

### 🔐 **Generación de Secretos Seguros**
```bash
# Generar JWT secret seguro
openssl rand -hex 32

# O usando Python
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

## 🏗️ Tecnologías Utilizadas

| Componente | Tecnología | Versión |
|------------|------------|---------|
| **Backend** | FastAPI | 0.115.4 |
| **Frontend** | React + TypeScript | 18.2.0 |
| **Build Tool** | Vite | 4.4.5 |
| **Base de Datos** | PostgreSQL | 15 |
| **Autenticación** | JWT + OAuth2 | - |
| **Contenedores** | Docker + Docker Compose | - |
| **Charts** | Chart.js + React Chart.js 2 | 4.4.0 |

## 🚧 Desafíos Técnicos Implementados

- ✅ **Seguridad JWT** - Autenticación y autorización robusta
- ✅ **Prevención de duplicados** - Validación de ingesta de datos
- ✅ **Escalabilidad de BD** - Diseño optimizado para PostgreSQL
- ✅ **CORS configurado** - Comunicación segura frontend-backend
- ✅ **Validación estricta** - Esquemas Pydantic para datos IoT
- ✅ **Conteneirización completa** - Deploy con Docker Compose

## 🐛 Solución de Problemas

### La aplicación no levanta
```bash
# Verificar que Docker esté corriendo
docker --version
docker-compose --version

# Limpiar y reconstruir
docker-compose down
docker system prune -f
docker-compose up --build -d
```

### Error de conexión a base de datos
```bash
# Verificar logs de PostgreSQL
docker-compose logs db

# Recrear volumen de base de datos
docker-compose down -v
docker-compose up -d
```

### Frontend no se conecta al backend
1. Verificar que `VITE_API_URL` en `.env` sea correcto
2. Confirmar que backend esté corriendo en puerto 8000
3. Verificar configuración CORS en backend

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs: `docker-compose logs`
2. Verifica que todos los servicios estén corriendo: `docker-compose ps`
3. Confirma la configuración en `.env`
4. Reconstruye la aplicación: `docker-compose up --build`

## 🔄 Control de Versiones

### Comandos Git Útiles

```bash
# Setup inicial (solo primera vez)
git init
git add .
git commit -m "Initial commit: Smart Mobility Hub setup"

# Trabajo diario
git add .
git commit -m "feat: descripción de los cambios"
git push origin main

# Verificar estado
git status
git log --oneline

# Crear nueva rama para features
git checkout -b feature/nueva-funcionalidad
git push -u origin feature/nueva-funcionalidad
```

### 🚨 **Verificación de Seguridad Antes de Commit**

```bash
# Verificar que no se suban archivos sensibles
git status
git diff --cached

# Si accidentalmente agregaste .env:
git reset HEAD .env
git rm --cached .env
```

### 📝 **Convenciones de Commit**

```bash
# Tipos de commit recomendados
feat: nueva funcionalidad
fix: corrección de bugs
docs: cambios en documentación
style: cambios de formato/estilo
refactor: refactorización de código
test: agregar o modificar tests
chore: tareas de mantenimiento
```