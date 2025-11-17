#!/bin/bash

# ============================================
# Скрипт для проверки готовности к развертыванию
# ============================================

echo "🔍 Проверка готовности к развертыванию..."
echo "========================================"
echo ""

ERROR_COUNT=0

# Проверка Docker
echo "🐳 Проверка Docker..."
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo "✅ Docker установлен: $DOCKER_VERSION"
else
    echo "❌ Docker не установлен"
    ERROR_COUNT=$((ERROR_COUNT + 1))
fi

# Проверка Docker Compose
echo ""
echo "🐳 Проверка Docker Compose..."
if command -v docker-compose &> /dev/null; then
    COMPOSE_VERSION=$(docker-compose --version)
    echo "✅ Docker Compose установлен: $COMPOSE_VERSION"
else
    echo "❌ Docker Compose не установлен"
    ERROR_COUNT=$((ERROR_COUNT + 1))
fi

# Проверка прав Docker
echo ""
echo "🔐 Проверка прав Docker..."
if docker ps &> /dev/null; then
    echo "✅ У вас есть права на использование Docker"
else
    echo "❌ Нет прав на использование Docker. Выполните: sudo usermod -aG docker $USER"
    ERROR_COUNT=$((ERROR_COUNT + 1))
fi

# Проверка .env файла
echo ""
echo "⚙️  Проверка файла конфигурации..."
if [ -f .env.production ]; then
    echo "✅ Файл .env.production существует"
    
    # Проверка обязательных переменных
    REQUIRED_VARS=("DB_PASSWORD" "JWT_SECRET" "TELEGRAM_BOT_TOKEN")
    for VAR in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${VAR}=" .env.production && ! grep -q "^${VAR}=your_" .env.production && ! grep -q "^${VAR}=$" .env.production; then
            echo "  ✅ $VAR установлен"
        else
            echo "  ❌ $VAR не установлен или использует значение по умолчанию"
            ERROR_COUNT=$((ERROR_COUNT + 1))
        fi
    done
else
    echo "❌ Файл .env.production не найден"
    echo "   Создайте его из env.production.example"
    ERROR_COUNT=$((ERROR_COUNT + 1))
fi

# Проверка портов
echo ""
echo "🌐 Проверка доступности портов..."
PORTS=(80 443)
for PORT in "${PORTS[@]}"; do
    if sudo lsof -i :$PORT &> /dev/null; then
        echo "⚠️  Порт $PORT уже используется"
    else
        echo "✅ Порт $PORT свободен"
    fi
done

# Проверка файлов Docker
echo ""
echo "📦 Проверка файлов Docker..."
FILES=("docker-compose.prod.yml" "backend/Dockerfile" "frontend/Dockerfile" "nginx/nginx.conf")
for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        echo "✅ $FILE существует"
    else
        echo "❌ $FILE не найден"
        ERROR_COUNT=$((ERROR_COUNT + 1))
    fi
done

# Проверка Git
echo ""
echo "📝 Проверка Git..."
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo "✅ Git установлен: $GIT_VERSION"
else
    echo "⚠️  Git не установлен (не критично)"
fi

# Проверка дискового пространства
echo ""
echo "💾 Проверка дискового пространства..."
AVAILABLE=$(df -h . | tail -1 | awk '{print $4}')
echo "📊 Доступно: $AVAILABLE"

# Проверка памяти
echo ""
echo "🧠 Проверка памяти..."
if command -v free &> /dev/null; then
    TOTAL_RAM=$(free -h | grep "Mem:" | awk '{print $2}')
    AVAILABLE_RAM=$(free -h | grep "Mem:" | awk '{print $7}')
    echo "📊 Всего RAM: $TOTAL_RAM, Доступно: $AVAILABLE_RAM"
else
    echo "⚠️  Команда free не доступна"
fi

# Проверка Firewall
echo ""
echo "🔥 Проверка Firewall..."
if command -v ufw &> /dev/null; then
    UFW_STATUS=$(sudo ufw status | grep "Status:" | awk '{print $2}')
    echo "📊 UFW статус: $UFW_STATUS"
    
    if [ "$UFW_STATUS" = "active" ]; then
        if sudo ufw status | grep -q "80.*ALLOW"; then
            echo "✅ Порт 80 разрешен в firewall"
        else
            echo "⚠️  Порт 80 не разрешен в firewall"
        fi
        
        if sudo ufw status | grep -q "443.*ALLOW"; then
            echo "✅ Порт 443 разрешен в firewall"
        else
            echo "⚠️  Порт 443 не разрешен в firewall"
        fi
    fi
else
    echo "⚠️  UFW не установлен"
fi

# Итоговый результат
echo ""
echo "========================================"
if [ $ERROR_COUNT -eq 0 ]; then
    echo "✅ Все проверки пройдены! Готовы к развертыванию!"
    echo ""
    echo "Следующий шаг: ./bin/bash/deploy.sh"
    exit 0
else
    echo "❌ Найдено ошибок: $ERROR_COUNT"
    echo ""
    echo "Исправьте ошибки перед развертыванием"
    exit 1
fi

