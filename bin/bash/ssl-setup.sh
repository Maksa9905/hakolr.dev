#!/bin/bash

# ============================================
# Скрипт для настройки SSL сертификата
# ============================================

set -e

if [ -z "$1" ]; then
    echo "❌ Ошибка: укажите доменное имя"
    echo "Использование: ./bin/bash/ssl-setup.sh yourdomain.com"
    exit 1
fi

DOMAIN=$1
EMAIL=${2:-admin@$DOMAIN}

echo "🔒 Настройка SSL для домена: $DOMAIN"
echo "📧 Email для уведомлений: $EMAIL"

# Проверка установки certbot
if ! command -v certbot &> /dev/null; then
    echo "📦 Установка certbot..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

# Остановка nginx контейнера для получения сертификата
echo "🛑 Временная остановка Nginx..."
docker-compose -f docker-compose.prod.yml stop nginx

# Получение сертификата
echo "📜 Получение SSL сертификата..."
sudo certbot certonly --standalone \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --preferred-challenges http

# Создание директории для SSL
echo "📁 Копирование сертификатов..."
mkdir -p nginx/ssl
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/
sudo chown -R $USER:$USER nginx/ssl
chmod 600 nginx/ssl/privkey.pem

# Обновление nginx.conf
echo "⚙️  Обновление конфигурации Nginx..."
sed -i "s/your-domain.com/$DOMAIN/g" nginx/nginx.conf

# Запуск nginx
echo "🚀 Запуск Nginx с SSL..."
docker-compose -f docker-compose.prod.yml up -d nginx

echo ""
echo "✅ SSL сертификат успешно настроен!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Откройте nginx/nginx.conf"
echo "2. Раскомментируйте блок HTTPS сервера (server {...} для порта 443)"
echo "3. Раскомментируйте редирект HTTP->HTTPS"
echo "4. Перезапустите nginx: docker-compose -f docker-compose.prod.yml restart nginx"
echo ""
echo "🔄 Автообновление сертификата:"
echo "Добавьте в crontab: sudo crontab -e"
echo "0 0 1 * * certbot renew --quiet && docker-compose -f $PWD/docker-compose.prod.yml restart nginx"

