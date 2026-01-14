# Backend API - Documentación Completa

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Endpoints API](#endpoints-api)
5. [Modelos de Datos](#modelos-de-datos)
6. [Autenticación](#autenticación)
7. [Testing de la API](#testing-de-la-api)
8. [Deployment](#deployment)

---

## 🎯 Descripción General

API REST construida con **Node.js**, **Express** y **TypeScript** que proporciona:

- Sistema de autenticación con JWT
- Tracking de interacciones de componentes
- Estadísticas agregadas
- Exportación de datos en CSV

**Stack Tecnológico:**

- **Runtime:** Node.js
- **Framework:** Express 5.2.1
- **Base de Datos:** MongoDB Atlas (Mongoose 9.1.3)
- **Lenguaje:** TypeScript 5.9.3
- **Autenticación:** JWT (jsonwebtoken 9.0.3)
- **Encriptación:** bcryptjs 3.0.3

---

## 📁 Estructura de Carpetas

```
backend/
├── src/
│   ├── index.ts                    # Punto de entrada principal
│   ├── controllers/                # Lógica de negocio
│   │   ├── auth-controller.ts      # Registro y login
│   │   └── tracking-controller.ts  # CRUD de tracking
│   ├── middleware/                 # Middlewares personalizados
│   │   └── auth-middleware.ts      # Validación de JWT
│   ├── models/                     # Modelos de Mongoose
│   │   ├── user.ts                 # Schema de usuarios
│   │   ├── user.types.ts           # Tipos TypeScript de User
│   │   └── tracking.ts             # Schema de eventos
│   └── routes/                     # Definición de rutas
│       ├── auth-routes.ts          # Rutas de autenticación
│       └── tracking-routes.ts      # Rutas de componentes
├── .env                            # Variables de entorno (no versionado)
├── .env.example                    # Plantilla de variables
├── package.json                    # Dependencias
├── tsconfig.json                   # Configuración TypeScript
└── README.md                       # Documentación básica
```

### Descripción de Componentes:

**Controllers:** Contienen la lógica de cada endpoint (validaciones, llamadas a BD, respuestas).

**Middleware:** Funciones intermedias que procesan requests antes de llegar a los controllers (ej: verificar JWT).

**Models:** Esquemas de Mongoose que definen estructura de datos y métodos personalizados.

**Routes:** Definen las URLs y qué controller manejarlos.

---

## ⚙️ Instalación y Configuración

### Requisitos Previos

- Node.js 18+
- NPM o Yarn
- Cuenta en MongoDB Atlas (o MongoDB local)

### Paso 1: Instalar Dependencias

```bash
cd backend
npm install
```

### Paso 2: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz de `backend/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/t1-test?retryWrites=true&w=majority
JWT_SECRET=tu_super_secreto_jwt_aleatorio_y_largo
```

**Variables:**

- `PORT`: Puerto donde correrá el servidor (default: 5000)
- `MONGO_URI`: String de conexión a MongoDB Atlas
- `JWT_SECRET`: Clave secreta para firmar tokens JWT (usa algo largo y aleatorio)

### Paso 3: Levantar el Servidor

**Modo Desarrollo (con hot-reload):**

```bash
npm run dev
```

**Modo Producción:**

```bash
npm run build  # Compila TypeScript a JavaScript
npm start      # Ejecuta el código compilado
```

### Verificar que está funcionando:

Visita: `http://localhost:5000/api/health`

Respuesta esperada:

```json
{
  "status": "OK",
  "message": "Backend funcionando"
}
```

---

## 🚀 Endpoints API

### Base URL

```
http://localhost:5000/api
```

---

## 🔐 Autenticación

### 1. Registro de Usuario

Crea una nueva cuenta de usuario.

**Endpoint:** `POST /api/auth/register`

**Body (JSON):**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "MiPassword123!"
}
```

**Respuesta Exitosa (201):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "usuario@ejemplo.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores:**

- `400` - Usuario ya existe
- `500` - Error en el servidor

---

### 2. Login de Usuario

Inicia sesión y obtiene un token JWT.

**Endpoint:** `POST /api/auth/login`

**Body (JSON):**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "MiPassword123!"
}
```

**Respuesta Exitosa (200):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "usuario@ejemplo.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores:**

- `401` - Credenciales inválidas
- `500` - Error en el servidor

**Nota:** El token debe guardarse en el frontend (localStorage) y enviarse en headers para endpoints protegidos.

---

## 📊 Tracking de Componentes

### 3. Registrar Interacción

Guarda un evento de interacción con un componente.

**Endpoint:** `POST /api/components/track`

**Body (JSON):**

```json
{
  "component": "Button",
  "variant": "primary",
  "action": "click",
  "metadata": {
    "name": "submit-button",
    "page": "/dashboard"
  }
}
```

**Campos:**

- `component` (requerido): Nombre del componente (Button, Input, Modal, Card)
- `variant` (opcional): Variante del componente (primary, secondary, etc.)
- `action` (requerido): Tipo de acción (click, blur, close, etc.)
- `metadata` (opcional): Datos adicionales en formato objeto

**Respuesta Exitosa (201):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "component": "Button",
  "variant": "primary",
  "action": "click",
  "metadata": {
    "name": "submit-button",
    "page": "/dashboard"
  },
  "createdAt": "2026-01-14T10:30:00.000Z",
  "updatedAt": "2026-01-14T10:30:00.000Z"
}
```

**Errores:**

- `400` - Faltan campos requeridos (component o action)
- `500` - Error al guardar en BD

---

### 4. Obtener Estadísticas

Obtiene el conteo agregado de interacciones por componente.

**Endpoint:** `GET /api/components/stats`

**Headers:** No requiere autenticación

**Respuesta Exitosa (200):**

```json
[
  {
    "_id": "Button",
    "count": 145,
    "actions": ["click", "click", "click", ...]
  },
  {
    "_id": "Input",
    "count": 78,
    "actions": ["blur", "blur", "blur", ...]
  },
  {
    "_id": "Modal",
    "count": 23,
    "actions": ["close", "close", ...]
  }
]
```

**Errores:**

- `500` - Error al obtener estadísticas

---

### 5. Exportar Datos (CSV)

Descarga todos los eventos de tracking en formato CSV.

**Endpoint:** `GET /api/components/export`

**Headers:**

```
Authorization: Bearer <token_jwt>
```

**Respuesta Exitosa (200):**

Descarga un archivo `analytics_export.csv` con formato:

```csv
_id,component,variant,action,createdAt
507f1f77bcf86cd799439011,Button,primary,click,2026-01-14T10:30:00.000Z
507f1f77bcf86cd799439012,Input,text,blur,2026-01-14T10:31:00.000Z
...
```

**Errores:**

- `401` - No autenticado o token inválido
- `404` - No hay datos para exportar
- `500` - Error al generar CSV

---

### 6. Health Check

Verifica que el servidor está funcionando.

**Endpoint:** `GET /api/health`

**Respuesta (200):**

```json
{
  "status": "OK",
  "message": "Backend funcionando"
}
```

---

## 💾 Modelos de Datos

### User Schema

```typescript
{
  email: string; // Único, lowercase, trim
  password: string; // Hasheado con bcrypt
  createdAt: Date; // Auto-generado
  updatedAt: Date; // Auto-generado
}
```

**Métodos:**

- `comparePassword(password: string)`: Compara password en texto plano con hash

---

### Tracking Schema

```typescript
{
  component: string;    // Requerido (ej: "Button")
  variant?: string;     // Opcional (ej: "primary")
  action: string;       // Requerido (ej: "click")
  metadata?: object;    // Opcional (datos extra)
  createdAt: Date;      // Auto-generado
  updatedAt: Date;      // Auto-generado
}
```

---

## 🔒 Autenticación JWT

### Cómo Funciona

1. Usuario hace login/registro
2. Backend genera un JWT firmado con `JWT_SECRET`
3. Frontend guarda el token (localStorage)
4. Frontend envía el token en header `Authorization: Bearer <token>`
5. Middleware `authMiddleware` valida el token antes de endpoints protegidos

### Endpoints Protegidos

Actualmente solo:

- `GET /api/components/export`

### Ejemplo de Uso en Frontend

```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:5000/api/components/export', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

## 🚀 Deployment

### Preparación para Producción

1. **Configurar variables de entorno en el servidor**

   - `PORT`, `MONGO_URI`, `JWT_SECRET`

2. **Build del proyecto**

   ```bash
   npm run build
   ```

3. **Iniciar servidor**
   ```bash
   npm start
   ```

### Recomendaciones

- Usa **PM2** para mantener el proceso corriendo:

  ```bash
  npm install -g pm2
  pm2 start dist/index.js --name "t1-backend"
  ```

- Configura **HTTPS** con un reverse proxy (Nginx, Caddy)
- Usa variables de entorno del servidor (no subas `.env` a producción)
- Habilita **CORS** solo para dominios específicos en producción

---

## 📝 Scripts Disponibles

```json
{
  "dev": "tsx watch --env-file=.env src/index.ts", // Desarrollo con hot-reload
  "build": "tsc", // Compilar TypeScript
  "start": "node dist/index.js" // Ejecutar en producción
}
```

---

## 🐛 Debugging

El servidor incluye logging de todas las requests:

```
📨 POST /api/auth/login
Headers: { ... }
Body: { email: '...', password: '...' }
```

Para ver logs en tiempo real:

```bash
npm run dev
```

---

## 🔗 Integración con Frontend

El frontend (Next.js) consume estos endpoints desde:

- `src/hooks/use-tracking.ts` - Para tracking automático
- `src/app/login/page.tsx` - Para login
- `src/app/dashboard/page.tsx` - Para stats y export

Asegúrate de que el backend esté corriendo en `http://localhost:5000` antes de iniciar el frontend.

---

## 🧪 Testing de la API

El proyecto ofrece **3 formas** de testear los endpoints:

### 1. 📚 Swagger UI (Recomendado)

Interfaz interactiva con documentación completa de todos los endpoints.

**URL:** **http://localhost:5000/api-docs**

#### Características:

✅ **Documentación en vivo** - OpenAPI 3.0 spec completo
✅ **Try it out** - Ejecuta requests directamente desde el navegador
✅ **Schemas** - Modelos de datos con ejemplos
✅ **Autenticación JWT** - Botón "Authorize" para usar tokens
✅ **Respuestas de ejemplo** - Para cada código de estado
✅ **Exportable** - Descarga el spec en JSON

#### Cómo Usar:

1. **Inicia el backend:**

   ```bash
   cd backend
   npm run dev
   ```

2. **Abre Swagger UI:**

   ```
   http://localhost:5000/api-docs
   ```

3. **Prueba un endpoint:**

   - Expande cualquier endpoint (ej: POST /api/auth/register)
   - Click en **"Try it out"**
   - Edita el body de ejemplo
   - Click en **"Execute"**
   - Ve la respuesta en tiempo real

4. **Autenticación (para endpoints protegidos):**
   - Ejecuta **POST /api/auth/login** primero
   - Copia el `token` de la respuesta
   - Click en el botón **"Authorize"** (arriba a la derecha)
   - Pega el token: `Bearer tu_token_aqui`
   - Ahora puedes usar **GET /api/components/export**

#### Endpoints Documentados:

**Health:**

- `GET /api/health` - Verificar servidor

**Authentication:**

- `POST /api/auth/register` - Crear cuenta
- `POST /api/auth/login` - Iniciar sesión

**Tracking:**

- `POST /api/components/track` - Registrar interacción
- `GET /api/components/stats` - Obtener estadísticas
- `GET /api/components/export` - Exportar CSV (🔒 requiere auth)

#### Descargar Spec OpenAPI:

```
http://localhost:5000/api-docs.json
```

---

### 2. 📦 Colección de Postman/Insomnia

El proyecto incluye una colección completa de endpoints lista para importar en Postman o Insomnia.

**Archivo:** `T1-API-Collection.postman_collection.json`

### 📥 Cómo Importar

#### En Postman:

1. Abre Postman Desktop o Web
2. Click en **"Import"** (esquina superior izquierda)
3. Click en **"Upload Files"**
4. Selecciona `T1-API-Collection.postman_collection.json`
5. Click en **"Import"**

#### En Insomnia:

1. Abre Insomnia
2. Click en el menú **"Application"** → **"Import/Export"**
3. Click en **"Import Data"** → **"From File"**
4. Selecciona `T1-API-Collection.postman_collection.json`
5. Click en **"Scan"** → **"Import"**

### ✅ Contenido de la Colección

La colección incluye **6 endpoints organizados** en 2 carpetas:

#### 1. Health Check

- `GET /api/health` - Verificar que el servidor funciona

#### 2. Authentication

- `POST /api/auth/register` - Crear cuenta (auto-guarda token)
- `POST /api/auth/login` - Iniciar sesión (auto-guarda token)

#### 3. Component Tracking

- `POST /api/components/track` - Registrar interacción (3 ejemplos)
- `GET /api/components/stats` - Obtener estadísticas
- `GET /api/components/export` - Exportar CSV (requiere auth)

### 🔧 Variables Incluidas

La colección viene con variables pre-configuradas:

```json
{
  "baseUrl": "http://localhost:5000",
  "authToken": ""
}
```

- **baseUrl:** Editable para apuntar a diferentes ambientes (dev, staging, prod)
- **authToken:** Se guarda automáticamente después de login/register

### 🚀 Flujo de Prueba Recomendado

#### Paso 1: Verificar Health

```
GET /api/health
```

**Respuesta esperada:**

```json
{
  "status": "OK",
  "message": "Backend funcionando"
}
```

#### Paso 2: Crear una Cuenta

```
POST /api/auth/register

Body:
{
  "email": "test@ejemplo.com",
  "password": "Password123!"
}
```

**Respuesta esperada (201):**

```json
{
  "_id": "...",
  "email": "test@ejemplo.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

✅ El token se guarda **automáticamente** en las variables.

#### Paso 3: Registrar Interacciones

```
POST /api/components/track

Body (ejemplo Button):
{
  "component": "Button",
  "variant": "primary",
  "action": "click",
  "metadata": {
    "name": "submit-button"
  }
}
```

Repite con diferentes componentes (Input, Modal, Card).

#### Paso 4: Ver Estadísticas

```
GET /api/components/stats
```

**Respuesta esperada:**

```json
[
  {
    "_id": "Button",
    "count": 5,
    "actions": ["click", "click", ...]
  }
]
```

#### Paso 5: Exportar Datos

```
GET /api/components/export
Authorization: Bearer {{authToken}} (automático)
```

**Respuesta:** Descarga un archivo CSV con todos los eventos.

### 🎯 Características Especiales

#### Auto-save de Tokens

Los endpoints de `register` y `login` incluyen scripts que automáticamente:

1. Extraen el token de la respuesta
2. Lo guardan en la variable `authToken`
3. Lo usan automáticamente en endpoints protegidos

No necesitas copiar/pegar tokens manualmente. ✨

#### Ejemplos de Respuesta

Cada endpoint incluye:

- ✅ Ejemplos de respuesta exitosa
- ❌ Ejemplos de respuesta con error
- 📝 Códigos HTTP correctos

#### Múltiples Ejemplos de Tracking

La colección incluye 3 ejemplos pre-configurados:

1. Button → click
2. Input → blur
3. Modal → close

---

### 3. 🔄 Testing Manual con cURL

Si no usas Postman/Insomnia, puedes usar **curl**:

#### Health Check:

```bash
curl http://localhost:5000/api/health
```

#### Register:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ejemplo.com","password":"Password123!"}'
```

#### Track Interaction:

```bash
curl -X POST http://localhost:5000/api/components/track \
  -H "Content-Type: application/json" \
  -d '{"component":"Button","variant":"primary","action":"click"}'
```

#### Get Stats:

```bash
curl http://localhost:5000/api/components/stats
```

#### Export (con token):

```bash
curl http://localhost:5000/api/components/export \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### 📊 Verificación en MongoDB

Puedes verificar los datos directamente en MongoDB Atlas:

1. Ingresa a tu Dashboard de MongoDB Atlas
2. Ve a **"Collections"**
3. Busca las colecciones:
   - `users` - Usuarios registrados
   - `trackings` - Eventos de interacción

---

## 📌 Notas Importantes

- El password se hashea automáticamente antes de guardarse (ver `UserSchema.pre('save')`)
- Los tokens JWT expiran en **30 días**
- MongoDB crea timestamps automáticos (`createdAt`, `updatedAt`)
- El aggregate en `/stats` agrupa por `component` y cuenta interacciones

---

## 📧 Soporte

Para dudas o issues, revisa:

1. Logs del servidor (`npm run dev`)
2. Estado de MongoDB Atlas (Dashboard)
3. Variables de entorno (`.env`)
