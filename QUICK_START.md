# 🐳 Guía de Inicio Rápido con Docker

## ⚡ Inicio Ultra Rápido (Recomendado)

```bash
# 1. Ejecutar script de inicio
./start.sh

# 2. Abrir en el navegador
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## 📋 Prerequisitos

- ✅ Docker Desktop instalado y corriendo
- ✅ Puertos disponibles: 3000, 5000, 27017

## 🚀 Comandos Principales

### Iniciar todo el sistema

```bash
./start.sh
```

o manualmente:

```bash
docker-compose up -d --build
```

### Detener el sistema

```bash
./stop.sh
```

o manualmente:

```bash
docker-compose down
```

### Ver logs en tiempo real

```bash
docker-compose logs -f
```

### Reiniciar después de cambios en el código

```bash
docker-compose up -d --build
```

## 🌐 URLs del Sistema

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:3000 | Aplicación Next.js |
| **Backend** | http://localhost:5000 | API Express |
| **API Docs** | http://localhost:5000/api-docs | Swagger UI |
| **Health Check** | http://localhost:5000/api/health | Estado del servidor |
| **MongoDB** | localhost:27017 | Base de datos |

## 🔐 Credenciales MongoDB

```
Host:     localhost:27017
Usuario:  admin
Password: admin123
Database: t1_tracking
```

**Connection String completo:**
```
mongodb://admin:admin123@localhost:27017/t1_tracking?authSource=admin
```

## 💾 Persistencia de Datos

Los datos de MongoDB se guardan en volúmenes de Docker que persisten entre reinicios:

```bash
# Ver volúmenes
docker volume ls | grep t1

# Eliminar datos (CUIDADO!)
./stop.sh --volumes
```

## 📦 Servicios

### Frontend (Next.js)
- Puerto: 3000
- Build: Multi-stage Docker build
- Variables de entorno: `NEXT_PUBLIC_API_URL`

### Backend (Express + Socket.IO)
- Puerto: 5000
- Build: TypeScript compilado
- Variables: `PORT`, `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`

### MongoDB
- Puerto: 27017
- Versión: 7.0
- Volúmenes persistentes

## 🛠️ Desarrollo Local (Sin Docker)

Si prefieres correr sin Docker:

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## 🔧 Troubleshooting

### Puerto ocupado

Edita `docker-compose.yml` y cambia los puertos:

```yaml
services:
  frontend:
    ports:
      - "3001:3000"  # Usar puerto 3001 en lugar de 3000
```

### Servicios no inician

```bash
# Ver logs
docker-compose logs

# Reiniciar todo
docker-compose restart
```

### Datos corruptos

```bash
# Eliminar volúmenes y empezar de cero
docker-compose down -v
docker-compose up -d --build
```

## 📚 Documentación Completa

Ver [DOCKER_README.md](DOCKER_README.md) para documentación detallada.

## 🎯 Arquitectura

```
┌──────────────────────────────────────────┐
│           Docker Compose                 │
│                                          │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │ Frontend │◄─┤ Backend  │◄─┤ MongoDB││
│  │ Next.js  │  │ Express  │  │  7.0   ││
│  │  :3000   │  │  :5000   │  │ :27017 ││
│  └──────────┘  └──────────┘  └────────┘│
│       │            │ │            │     │
│       └────────────┘ │            │     │
│         HTTP/WS      └────────────┘     │
│                      MongoDB Driver     │
└──────────────────────────────────────────┘
```

## ✨ Features

- ✅ Configuración completa con Docker Compose
- ✅ Persistencia de datos con volúmenes
- ✅ Socket.IO para actualizaciones en tiempo real
- ✅ Health checks automáticos
- ✅ Hot reload en desarrollo
- ✅ Scripts de inicio/detención simplificados
- ✅ Variables de entorno configurables
- ✅ Swagger UI para documentación de API

## 📝 Notas

- Los datos persisten entre reinicios (a menos que uses `--volumes`)
- Los servicios se reinician automáticamente si fallan
- El backend espera a que MongoDB esté listo antes de iniciar
- El frontend espera a que el backend esté listo antes de iniciar
