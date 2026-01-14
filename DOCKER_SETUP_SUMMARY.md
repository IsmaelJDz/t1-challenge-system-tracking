# 📊 Resumen de la Configuración Docker

## ✅ Archivos Creados

### Configuración Docker
- `docker-compose.yml` - Orquestación de servicios
- `backend/Dockerfile` - Imagen del backend
- `frontend/Dockerfile` - Imagen del frontend
- `backend/.dockerignore` - Exclusiones para backend
- `frontend/.dockerignore` - Exclusiones para frontend

### Scripts de Ayuda
- `start.sh` - Inicia todos los servicios
- `stop.sh` - Detiene servicios (con opción de borrar datos)
- `logs.sh` - Muestra logs de servicios

### Documentación
- `DOCKER_README.md` - Guía completa de Docker
- `QUICK_START.md` - Inicio rápido
- `DOCKER_SETUP_SUMMARY.md` - Este archivo

### Variables de Entorno
- `backend/.env.example` - Template actualizado para MongoDB local
- `frontend/.env.example` - Template para URL del API

## 🔧 Cambios en el Código

### Backend (`backend/src/index.ts`)
- ✅ Agregada variable `FRONTEND_URL` para CORS dinámico
- ✅ Socket.IO configurado con origen desde env

### Frontend (hooks)
- ✅ `use-stats.ts` - URL del API desde `NEXT_PUBLIC_API_URL`
- ✅ `use-tracking.ts` - URL del API desde `NEXT_PUBLIC_API_URL`
- ✅ `use-auth.ts` - URL del API desde `NEXT_PUBLIC_API_URL`

## 🎯 Uso Básico

### Iniciar el sistema completo

```bash
./start.sh
```

**Lo que hace:**
1. Verifica que Docker esté corriendo
2. Detiene contenedores previos
3. Construye las imágenes (backend + frontend)
4. Levanta MongoDB con persistencia
5. Levanta backend (espera a MongoDB)
6. Levanta frontend (espera a backend)
7. Muestra URLs y credenciales

### Acceder a la aplicación

```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
API Docs:  http://localhost:5000/api-docs
Health:    http://localhost:5000/api/health
MongoDB:   mongodb://admin:admin123@localhost:27017/t1_tracking?authSource=admin
```

### Ver logs

```bash
# Todos los servicios
./logs.sh

# Solo un servicio
./logs.sh backend
./logs.sh frontend
./logs.sh mongodb
```

### Detener el sistema

```bash
# Detener (mantener datos)
./stop.sh

# Detener y borrar datos
./stop.sh --volumes
```

### Reconstruir después de cambios

```bash
docker-compose up -d --build
```

## 💾 Persistencia de Datos

### Volúmenes Creados

MongoDB usa 2 volúmenes persistentes:

```
t1-challenge-system-tracking_mongodb_data     # Datos de la DB
t1-challenge-system-tracking_mongodb_config   # Configuración
```

### Inspeccionar volúmenes

```bash
# Listar
docker volume ls | grep mongodb

# Ver detalles
docker volume inspect t1-challenge-system-tracking_mongodb_data

# Ubicación física
docker volume inspect t1-challenge-system-tracking_mongodb_data | grep Mountpoint
```

### Backup manual de datos

```bash
# Exportar datos
docker-compose exec mongodb mongodump \
  -u admin -p admin123 \
  --authenticationDatabase admin \
  --db t1_tracking \
  --out /data/backup

# Copiar backup al host
docker cp t1-mongodb:/data/backup ./mongo-backup
```

## 🏗️ Arquitectura de Docker

```
┌───────────────────────────────────────────────────────┐
│                  docker-compose.yml                   │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │              t1-network (bridge)                │ │
│  │                                                 │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────┐│ │
│  │  │  Frontend    │  │   Backend    │  │ MongoDB││ │
│  │  │              │  │              │  │        ││ │
│  │  │  Next.js     │◄─┤  Express     │◄─┤  7.0   ││ │
│  │  │  (Alpine)    │  │  (Alpine)    │  │ (Full) ││ │
│  │  │              │  │  Socket.IO   │  │        ││ │
│  │  │              │  │  REST API    │  │        ││ │
│  │  │              │  │  Swagger     │  │        ││ │
│  │  │              │  │              │  │        ││ │
│  │  │  Port 3000   │  │  Port 5000   │  │ 27017  ││ │
│  │  └──────────────┘  └──────────────┘  └────────┘│ │
│  │                                                 │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  Volúmenes:                                          │
│  - mongodb_data (persistente)                        │
│  - mongodb_config (persistente)                      │
└───────────────────────────────────────────────────────┘
```

## 🔄 Flujo de Dependencias

```
1. MongoDB inicia
   ↓
2. Health check de MongoDB (mongosh ping)
   ↓
3. Backend inicia (espera MongoDB healthy)
   ↓
4. Health check de Backend (wget /api/health)
   ↓
5. Frontend inicia (espera Backend healthy)
   ↓
6. Sistema completo funcionando
```

## 📦 Imágenes Docker

### Tamaños aproximados

```
Frontend:  ~300MB (multi-stage build)
Backend:   ~200MB (multi-stage build)
MongoDB:   ~700MB (imagen oficial)
Total:     ~1.2GB
```

### Optimizaciones aplicadas

- ✅ Multi-stage builds (reduce tamaño final)
- ✅ Alpine Linux (imágenes más pequeñas)
- ✅ `npm ci --omit=dev` (solo deps de producción)
- ✅ `.dockerignore` (excluye archivos innecesarios)
- ✅ Layer caching (builds más rápidos)

## 🔐 Seguridad

### ⚠️ Configuración actual (DESARROLLO)

```yaml
MongoDB:
  Usuario:  admin
  Password: admin123
  
JWT:
  Secret:   tu_secreto_super_seguro_aqui_para_docker

CORS:
  Origin:   http://localhost:3000 (configurable)
```

### ✅ Para Producción (si fuera necesario)

- Usar Docker secrets o Kubernetes secrets
- Variables de entorno desde archivos `.env` separados
- Cambiar todas las credenciales
- Configurar HTTPS/TLS
- Restringir CORS a dominios específicos
- Usar redes Docker aisladas
- Implementar rate limiting
- Añadir autenticación a MongoDB
- Usar certificados SSL para MongoDB

## 🛠️ Comandos Útiles

### Gestión de servicios

```bash
# Iniciar
docker-compose up -d

# Detener
docker-compose down

# Reiniciar
docker-compose restart

# Reiniciar un servicio
docker-compose restart backend

# Ver estado
docker-compose ps

# Ver logs
docker-compose logs -f
docker-compose logs -f backend
```

### Mantenimiento

```bash
# Reconstruir
docker-compose up -d --build

# Eliminar todo y empezar de cero
docker-compose down -v
docker-compose up -d --build

# Limpiar recursos Docker
docker system prune -a
```

### Debugging

```bash
# Entrar a un contenedor
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec mongodb mongosh -u admin -p admin123

# Ver recursos usados
docker stats

# Inspeccionar un servicio
docker-compose exec backend env
docker-compose exec backend cat /etc/os-release
```

### Gestión de volúmenes

```bash
# Listar volúmenes
docker volume ls

# Inspeccionar
docker volume inspect <nombre_volumen>

# Eliminar volumen específico (BORRA DATOS)
docker volume rm <nombre_volumen>

# Limpiar volúmenes sin usar
docker volume prune
```

## 🚨 Troubleshooting

### Puerto ocupado

**Error:** "port is already allocated"

**Solución:**
```bash
# Opción 1: Liberar el puerto
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9

# Opción 2: Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"  # Usar 3001 en vez de 3000
```

### MongoDB no inicia

**Error:** Health check failing

**Solución:**
```bash
# Ver logs
docker-compose logs mongodb

# Reiniciar MongoDB
docker-compose restart mongodb

# Si persiste, eliminar volumen
docker-compose down -v
docker-compose up -d
```

### Backend no conecta a MongoDB

**Error:** "MongoServerError: Authentication failed"

**Solución:**
```bash
# Verificar MONGO_URI en docker-compose.yml
# Debe incluir ?authSource=admin

MONGO_URI: mongodb://admin:admin123@mongodb:27017/t1_tracking?authSource=admin
```

### Frontend no conecta al Backend

**Error:** "Failed to fetch"

**Solución:**
```bash
# Verificar que backend esté corriendo
docker-compose ps

# Ver logs del backend
docker-compose logs backend

# Verificar variable de entorno
docker-compose exec frontend env | grep NEXT_PUBLIC_API_URL
```

### Cambios no se reflejan

**Problema:** Código modificado pero no cambia en el contenedor

**Solución:**
```bash
# Reconstruir las imágenes
docker-compose up -d --build

# Si persiste, limpiar cache
docker-compose down
docker system prune -a
docker-compose up -d --build
```

### Out of disk space

**Error:** "no space left on device"

**Solución:**
```bash
# Ver uso de espacio
docker system df

# Limpiar recursos
docker system prune -a --volumes

# Específicamente
docker container prune
docker image prune -a
docker volume prune
```

## 📚 Recursos

- [Docker Docs](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB Docker](https://hub.docker.com/_/mongo)
- [Node Alpine](https://hub.docker.com/_/node)
- [Next.js Docker](https://nextjs.org/docs/deployment#docker-image)

## ✅ Checklist de Verificación

Después de iniciar con `./start.sh`:

- [ ] Docker Desktop está corriendo
- [ ] Tres contenedores están UP (ps muestra 3/3)
- [ ] Frontend responde en http://localhost:3000
- [ ] Backend responde en http://localhost:5000/api/health
- [ ] Swagger UI disponible en http://localhost:5000/api-docs
- [ ] Puedes registrar un usuario
- [ ] Puedes hacer login
- [ ] El dashboard carga
- [ ] Las interacciones se trackean en tiempo real (Socket.IO)
- [ ] Los datos persisten después de `docker-compose restart`

## 🎓 Tips Avanzados

### Desarrollo con Hot Reload

Si quieres desarrollo con hot reload en lugar de build:

```yaml
# En docker-compose.yml, sobreescribir el command:
backend:
  command: npm run dev
  volumes:
    - ./backend/src:/app/src
```

### Conectar desde otras máquinas

```bash
# Encontrar tu IP local
ifconfig | grep inet

# Acceder desde otra máquina en la misma red
http://<tu-ip>:3000
http://<tu-ip>:5000
```

### Exportar imágenes

```bash
# Guardar imagen
docker save t1-challenge-system-tracking-frontend > frontend.tar

# Cargar en otra máquina
docker load < frontend.tar
```

---

**🎉 ¡Listo!** Tienes un sistema completamente containerizado, portable y con persistencia de datos.
