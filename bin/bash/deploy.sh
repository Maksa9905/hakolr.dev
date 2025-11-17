#!/bin/bash

# ============================================
# Скрипт для развертывания приложения
# ============================================

set -e

echo "🚀 Начинаем развертывание hakolr.dev..."

# Проверка наличия .env файла
if [ ! -f .env.production ]; then
    echo "❌ Ошибка: файл .env.production не найден!"
    echo "Создайте его из env.production.example и заполните переменные"
    exit 1
fi

# Загрузка переменных окружения
echo "📝 Загрузка переменных окружения..."
set -a
source .env.production
set +a

# Остановка старых контейнеров
echo "🛑 Остановка старых контейнеров..."
docker-compose -f docker-compose.prod.yml down || true

# Удаление старых образов (опционально)
echo "🧹 Очистка старых образов..."
docker system prune -f

# Сборка и запуск новых контейнеров
echo "🏗️  Сборка Docker образов..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "🚀 Запуск контейнеров..."
docker-compose -f docker-compose.prod.yml up -d

# Ожидание запуска сервисов
echo "⏳ Ожидание запуска сервисов..."
sleep 10

# Проверка статуса
echo "📊 Статус контейнеров:"
docker-compose -f docker-compose.prod.yml ps

# Проверка логов
echo ""
echo "📋 Последние логи:"
docker-compose -f docker-compose.prod.yml logs --tail=50

echo ""
echo "✅ Развертывание завершено!"
echo ""
echo "📋 Полезные команды:"
echo "  Просмотр логов:           docker-compose -f docker-compose.prod.yml logs -f"
echo "  Перезапуск:               docker-compose -f docker-compose.prod.yml restart"
echo "  Остановка:                docker-compose -f docker-compose.prod.yml down"
echo "  Статус:                   docker-compose -f docker-compose.prod.yml ps"
echo ""

