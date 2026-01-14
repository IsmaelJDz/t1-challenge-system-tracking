#!/bin/bash

# Script para ver logs de los servicios
# Uso: ./logs.sh [servicio]
# Servicios disponibles: frontend, backend, mongodb

if [ -z "$1" ]; then
    echo "📋 Mostrando logs de todos los servicios..."
    echo "   (Ctrl+C para salir)"
    echo ""
    docker-compose logs -f
else
    echo "📋 Mostrando logs de $1..."
    echo "   (Ctrl+C para salir)"
    echo ""
    docker-compose logs -f $1
fi
