#!/bin/bash

# ============================================
# Скрипт для просмотра логов
# ============================================

SERVICE=${1:-all}

case $SERVICE in
    backend|be)
        echo "📋 Логи Backend:"
        docker-compose -f docker-compose.prod.yml logs -f backend
        ;;
    frontend|fe)
        echo "📋 Логи Frontend:"
        docker-compose -f docker-compose.prod.yml logs -f frontend
        ;;
    postgres|db)
        echo "📋 Логи PostgreSQL:"
        docker-compose -f docker-compose.prod.yml logs -f postgres
        ;;
    nginx)
        echo "📋 Логи Nginx:"
        docker-compose -f docker-compose.prod.yml logs -f nginx
        ;;
    all|*)
        echo "📋 Логи всех сервисов:"
        docker-compose -f docker-compose.prod.yml logs -f
        ;;
esac

