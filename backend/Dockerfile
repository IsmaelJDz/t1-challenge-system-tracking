# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY src ./src

# Compilar TypeScript
RUN npm run build

# Etapa de producción
FROM node:20-alpine

# Instalar wget para health checks
RUN apk add --no-cache wget

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Copiar código compilado desde builder
COPY --from=builder /app/dist ./dist

# Exponer puerto
EXPOSE 5000

# Comando de inicio
CMD ["npm", "start"]
