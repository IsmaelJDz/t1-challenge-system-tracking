#!/bin/bash

# Script de verificación del setup de Docker
# Verifica que todos los archivos necesarios existan

echo "🔍 Verificando configuración de Docker..."
echo ""

errors=0

# Verificar archivos Docker
echo "📦 Verificando archivos Docker..."

files=(
  "docker-compose.yml"
  "backend/Dockerfile"
  "frontend/Dockerfile"
  "backend/.dockerignore"
  "frontend/.dockerignore"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file - FALTA"
    errors=$((errors + 1))
  fi
done

echo ""

# Verificar scripts
echo "📜 Verificando scripts..."

scripts=(
  "start.sh"
  "stop.sh"
  "logs.sh"
)

for script in "${scripts[@]}"; do
  if [ -f "$script" ]; then
    if [ -x "$script" ]; then
      echo "  ✅ $script (ejecutable)"
    else
      echo "  ⚠️  $script (no ejecutable - ejecuta: chmod +x $script)"
    fi
  else
    echo "  ❌ $script - FALTA"
    errors=$((errors + 1))
  fi
done

echo ""

# Verificar documentación
echo "📚 Verificando documentación..."

docs=(
  "DOCKER_README.md"
  "QUICK_START.md"
  "DOCKER_SETUP_SUMMARY.md"
)

for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    echo "  ✅ $doc"
  else
    echo "  ❌ $doc - FALTA"
    errors=$((errors + 1))
  fi
done

echo ""

# Verificar Docker
echo "🐳 Verificando Docker..."

if command -v docker &> /dev/null; then
  echo "  ✅ Docker instalado"
  
  if docker info &> /dev/null; then
    echo "  ✅ Docker corriendo"
    echo "     Versión: $(docker --version)"
  else
    echo "  ❌ Docker no está corriendo"
    echo "     Por favor inicia Docker Desktop"
    errors=$((errors + 1))
  fi
else
  echo "  ❌ Docker no está instalado"
  echo "     Instala Docker Desktop desde: https://www.docker.com/products/docker-desktop"
  errors=$((errors + 1))
fi

echo ""

# Verificar puertos
echo "🔌 Verificando puertos..."

ports=(3000 5000 27017)

for port in "${ports[@]}"; do
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "  ⚠️  Puerto $port está ocupado"
    echo "     Proceso: $(lsof -ti:$port | xargs ps -p | tail -n 1)"
  else
    echo "  ✅ Puerto $port disponible"
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $errors -eq 0 ]; then
  echo "✅ Verificación completada: Todo listo!"
  echo ""
  echo "Siguiente paso:"
  echo "  ./start.sh"
else
  echo "⚠️  Verificación completada con $errors error(es)"
  echo ""
  echo "Por favor corrige los errores antes de continuar"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
