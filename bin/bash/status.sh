#!/bin/bash

# ============================================
# Скрипт для проверки статуса приложения
# ============================================

echo "📊 Статус приложения hakolr.dev"
echo "================================"
echo ""

# Статус контейнеров
echo "🐳 Контейнеры:"
docker-compose -f docker-compose.prod.yml ps
echo ""

# Использование ресурсов
echo "💾 Использование ресурсов:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" \
    hakolr-postgres hakolr-backend hakolr-frontend hakolr-nginx 2>/dev/null || echo "Контейнеры не запущены"
echo ""

# Дисковое пространство
echo "💿 Дисковое пространство Docker:"
docker system df
echo ""

# Проверка доступности сервисов
echo "🌐 Проверка доступности сервисов:"

# Backend
if curl -s http://localhost:3001/api > /dev/null; then
    echo "✅ Backend: доступен"
else
    echo "❌ Backend: недоступен"
fi

# Frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend: доступен"
else
    echo "❌ Frontend: недоступен"
fi

# Nginx
if curl -s http://localhost:80 > /dev/null; then
    echo "✅ Nginx: доступен"
else
    echo "❌ Nginx: недоступен"
fi

echo ""
echo "📝 Для просмотра логов используйте: ./bin/bash/logs.sh [backend|frontend|postgres|nginx|all]"

