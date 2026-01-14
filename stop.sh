#!/bin/bash

# Script para detener todos los servicios
# Uso: ./stop.sh [--volumes]

echo "🛑 Deteniendo Sistema de Tracking T1..."
echo ""

if [ "$1" == "--volumes" ] || [ "$1" == "-v" ]; then
    echo "⚠️  Deteniendo servicios y eliminando volúmenes (BORRA DATOS)"
    read -p "¿Estás seguro? (s/N): " confirm
    if [ "$confirm" == "s" ] || [ "$confirm" == "S" ]; then
        docker-compose down -v
        echo "✅ Servicios detenidos y volúmenes eliminados"
    else
        echo "❌ Operación cancelada"
    fi
else
    docker-compose down
    echo "✅ Servicios detenidos (datos preservados)"
    echo ""
    echo "💡 Tip: Usa './stop.sh --volumes' para eliminar también los datos"
fi

echo ""
