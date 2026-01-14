# 🐳 Sistema de Tracking T1 - Docker Setup

Este proyecto está containerizado con Docker para facilitar su ejecución local con persistencia de datos.

## 📋 Prerequisitos

- Docker Desktop instalado ([Descargar aquí](https://www.docker.com/products/docker-desktop))
- Docker Compose (incluido en Docker Desktop)

## 🚀 Inicio Rápido

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

### Reconstruir servicios después de cambios en el código

```bash
# Reconstruir todo
docker-compose up -d --build

# Reconstruir solo el backend
docker-compose up -d --build backend

# Reconstruir solo el frontend
docker-compose up -d --build frontend
```

### Ver estado de los contenedores

```bash
docker-compose ps
```

### Ejecutar comandos dentro de un contenedor

```bash
# Backend
docker-compose exec backend sh

# Frontend
docker-compose exec frontend sh

# MongoDB
docker-compose exec mongodb mongosh -u admin -p admin123
```

### Reiniciar un servicio específico

```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart mongodb
```

## 💾 Persistencia de Datos

Los datos de MongoDB se persisten en volúmenes de Docker:
- `mongodb_data`: Datos de la base de datos
- `mongodb_config`: Configuración de MongoDB

Estos volúmenes persisten incluso después de `docker-compose down`. Solo se eliminan con `docker-compose down -v`.

## 🔧 Variables de Entorno

### Backend
- `PORT`: 5000
- `MONGO_URI`: mongodb://admin:admin123@mongodb:27017/t1_tracking?authSource=admin
- `JWT_SECRET`: tu_secreto_super_seguro_aqui_para_docker
- `FRONTEND_URL`: http://localhost:3000

### Frontend
- `NEXT_PUBLIC_API_URL`: http://localhost:5000

## 🐛 Troubleshooting

### Los servicios no inician correctamente

```bash
# Ver logs detallados
docker-compose logs

# Reiniciar todos los servicios
docker-compose restart
```

### Error de conexión a MongoDB

```bash
# Verificar que MongoDB esté saludable
docker-compose ps

# Reiniciar MongoDB
docker-compose restart mongodb
```

### Cambios en el código no se reflejan

```bash
# Reconstruir las imágenes
docker-compose up -d --build
```

### Puerto ya en uso

Si algún puerto está ocupado, puedes cambiarlos en `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Cambiar puerto del frontend
  - "5001:5000"  # Cambiar puerto del backend
```

### Liberar espacio en Docker

```bash
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes sin usar
docker image prune

# Eliminar todo (cuidado!)
docker system prune -a
```

## 📊 Arquitectura

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Docker Compose (Orquestador)                  │
│                                                 │
├──────────────┬──────────────┬──────────────────┤
│              │              │                  │
│  Frontend    │   Backend    │    MongoDB       │
│  (Next.js)   │   (Express)  │    (7.0)         │
│  Port 3000   │   Port 5000  │    Port 27017    │
│              │              │                  │
│              │   Socket.IO  │    Volumen       │
│              │   REST API   │    Persistente   │
│              │              │                  │
└──────────────┴──────────────┴──────────────────┘
         │              │              │
         └──────────────┴──────────────┘
                t1-network (Bridge)
```

## 📦 Volúmenes

Para inspeccionar los volúmenes:

```bash
# Listar volúmenes
docker volume ls

# Inspeccionar un volumen
docker volume inspect t1-challenge-system-tracking_mongodb_data

# Ver ubicación de datos
docker volume inspect t1-challenge-system-tracking_mongodb_data | grep Mountpoint
```

## 🔐 Seguridad

⚠️ **IMPORTANTE**: Esta configuración es para desarrollo local. Para producción:
- Cambiar credenciales de MongoDB
- Usar secretos de Docker/Kubernetes
- Configurar HTTPS
- Restringir CORS
- Actualizar JWT_SECRET

## 📚 Recursos Adicionales

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker](https://hub.docker.com/_/mongo)
