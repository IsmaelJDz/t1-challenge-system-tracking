#!/bin/bash

# Script de inicio rápido para el proyecto T1
# Autor: Sistema de Tracking T1
# Descripción: Levanta todos los servicios de Docker y verifica su estado

set -e

echo "🚀 Iniciando Sistema de Tracking T1..."
echo ""

# Verificar si Docker está corriendo
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo"
    echo "   Por favor inicia Docker Desktop y vuelve a intentar"
    exit 1
fi

echo "✅ Docker está corriendo"
echo ""

# Detener contenedores existentes si los hay
echo "🧹 Limpiando contenedores previos..."
docker-compose down 2>/dev/null || true
echo ""

# Construir y levantar servicios
echo "🏗️  Construyendo y levantando servicios..."
docker-compose up -d --build

echo ""
echo "⏳ Esperando a que los servicios estén listos..."
sleep 5

# Verificar estado de los servicios
echo ""
echo "📊 Estado de los servicios:"
docker-compose ps

echo ""
echo "✨ ¡Listo! El sistema está funcionando"
echo ""
echo "📍 URLs disponibles:"
echo "   - Frontend:    http://localhost:3000"
echo "   - Backend:     http://localhost:5000"
echo "   - API Docs:    http://localhost:5000/api-docs"
echo "   - Health:      http://localhost:5000/api/health"
echo ""
echo "📋 Comandos útiles:"
echo "   - Ver logs:         docker-compose logs -f"
echo "   - Detener:          docker-compose down"
echo "   - Reiniciar:        docker-compose restart"
echo ""
echo "🔍 Credenciales MongoDB:"
echo "   - Host:      localhost:27017"
echo "   - Usuario:   admin"
echo "   - Password:  admin123"
echo "   - Database:  t1_tracking"
echo ""
