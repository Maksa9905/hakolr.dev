#!/bin/bash

# ============================================
# Скрипт для первоначальной настройки VPS
# ============================================

set -e

echo "🚀 Начинаем настройку VPS для hakolr.dev..."

# Обновление системы
echo "📦 Обновление системы..."
sudo apt update && sudo apt upgrade -y

# Установка Docker
echo "🐳 Установка Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo "✅ Docker установлен"
else
    echo "✅ Docker уже установлен"
fi

# Установка Docker Compose
echo "🐳 Установка Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose установлен"
else
    echo "✅ Docker Compose уже установлен"
fi

# Установка Git (если еще не установлен)
echo "📝 Проверка Git..."
if ! command -v git &> /dev/null; then
    sudo apt install -y git
    echo "✅ Git установлен"
else
    echo "✅ Git уже установлен"
fi

# Установка Nginx (если нужен напрямую на хосте)
echo "🌐 Установка дополнительных пакетов..."
sudo apt install -y curl wget nano htop ufw

# Настройка firewall
echo "🔥 Настройка firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
echo "✅ Firewall настроен"

# Создание директории для проекта
echo "📁 Создание директории для проекта..."
mkdir -p ~/hakolr-blog
cd ~/hakolr-blog

echo ""
echo "✅ Базовая настройка VPS завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Клонируйте репозиторий: git clone <your-repo-url> ."
echo "2. Создайте .env.production файл из .env.production.example"
echo "3. Заполните переменные окружения"
echo "4. Запустите: ./bin/bash/deploy.sh"
echo ""
echo "🔐 ВАЖНО: Не забудьте перелогиниться или выполнить 'newgrp docker' для применения Docker прав!"

