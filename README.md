# T1 Component Library & Analytics System 🚀

Sistema integral que consta de una librería de componentes React reutilizables con seguimiento automático de interacciones (analytics) en tiempo real usando Socket.IO, y un backend dedicado para la recolección y exportación de datos.

Proyecto desarrollado como parte del Examen Técnico T1.

---

## 🐳 Inicio Rápido con Docker (Recomendado)

La forma más sencilla de ejecutar el proyecto completo:

```bash
# 1. Verificar que todo está listo
./verify.sh

# 2. Iniciar todos los servicios
./start.sh

# 3. Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
# API Docs: http://localhost:5000/api-docs
```

### Comandos Docker

```bash
./start.sh           # Inicia todos los servicios
./stop.sh            # Detiene los servicios
./logs.sh            # Ver logs de todos los servicios
./logs.sh backend    # Ver logs de un servicio específico
```

**📚 Documentación completa de Docker:**
- [QUICK_START.md](QUICK_START.md) - Inicio rápido
- [DOCKER_README.md](DOCKER_README.md) - Guía completa
- [DOCKER_SETUP_SUMMARY.md](DOCKER_SETUP_SUMMARY.md) - Resumen técnico

---

## 💻 Desarrollo Local (Sin Docker)

### 🚀 Tecnologías

#### Frontend
- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4 (Design Tokens configurados)
- **State Management:** React Query / TanStack Query
- **Tiempo Real:** Socket.IO Client
- **Testing:** Jest + React Testing Library (Coverage > 80%)
- **Iconos:** Lucide React

#### Backend
- **Runtime:** Node.js 20
- **Framework:** Express 5
- **Base de Datos:** MongoDB 7.0
- **ORM:** Mongoose
- **Tiempo Real:** Socket.IO Server
- **Autenticación:** JWT (JSON Web Tokens)
- **Seguridad:** Bcryptjs, CORS
- **Documentación:** Swagger UI

---

## 🚀 Inicio Rápido (DEPLOY DOCKER LOCAL)

### 1. Levantar todos los servicios

```bash
docker-compose up -d
```

Este comando:
- ✅ Levanta MongoDB en puerto 27017
- ✅ Construye y levanta el Backend en puerto 5000
- ✅ Construye y levanta el Frontend en puerto 3000
- ✅ Crea volúmenes persistentes para MongoDB

### 2. Ver logs

```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### 3. Acceder a la aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Swagger Docs**: http://localhost:5000/api-docs
- **Health Check**: http://localhost:5000/api/health

### 4. Credenciales de MongoDB

- **Host**: localhost:27017
- **Usuario**: admin
- **Password**: admin123
- **Database**: t1_tracking
- **Connection String**: `mongodb://admin:admin123@localhost:27017/t1_tracking?authSource=admin`

## 🛠️ Comandos Útiles

### Detener servicios

```bash
docker-compose down
```

### Detener y eliminar volúmenes (BORRA TODOS LOS DATOS)

```bash
docker-compose down -v
```

## MANUAL DEPLOY (TEST LOCAL ENVIRONMENT)
el problema es que a pesar que esta mongodb en atlas, por temas de seguridad no se comparte el .env de prod, para eso se deja la version con Docker que permite levantar todos los servicios y testear la app

### 📋 Prerrequisitos

- Node.js v20 o superior
- npm o yarn
- MongoDB local o cuenta en MongoDB Atlas

### ⚙️ Backend

```bash
# 1. Ir a la carpeta del backend
cd backend

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env desde el ejemplo
cp .env.example .env

# 4. Editar .env con tus credenciales
# PORT=5000
# MONGO_URI=mongodb://admin:admin123@localhost:27017/t1_tracking?authSource=admin
# JWT_SECRET=tu_secreto_jwt
# FRONTEND_URL=http://localhost:3000

# 5. Levantar el servidor en desarrollo
npm run dev
```

El backend estará en `http://localhost:5000`

**Endpoints principales:**
- API REST: `http://localhost:5000/api`
- Swagger Docs: `http://localhost:5000/api-docs`
- Health Check: `http://localhost:5000/api/health`

---

### 🎨 Frontend

```bash
# 1. Ir a la carpeta del frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

El frontend estará corriendo en `http://localhost:3000`

**📚 Documentación completa:** Ver [frontend/DESIGN_SYSTEM.md](frontend/DESIGN_SYSTEM.md) para componentes, tokens y arquitectura.

---

## 📖 Documentación Adicional

- **Backend API:** [backend/DOCUMENTATION.md](backend/DOCUMENTATION.md) - Endpoints, autenticación, modelos y deployment
- **Design System:** [frontend/DESIGN_SYSTEM.md](frontend/DESIGN_SYSTEM.md) - Componentes, tokens, variantes y guía de uso
- **Frontend README:** [frontend/README.md](frontend/README.md) - Configuración específica del frontend
- **Backend README:** [backend/README.md](backend/README.md) - Configuración específica del backend

---

## ✅ Verificación

Para verificar que todo está funcionando:

1. **Backend:** Visita `http://localhost:5000/api/health` - Debe retornar `{"status": "OK"}`
2. **Frontend:** Visita `http://localhost:3000` - Debe mostrar la página de inicio
3. **Integración:** Crea una cuenta en `/login` y accede al `/dashboard`
   npm install
