# 🚀 Развертывание на VPS

Инструкция по развертыванию hakolr.dev на VPS хостинге.

## 📋 Требования

- VPS с Ubuntu 20.04+ (минимум 2GB RAM)
- SSH доступ
- Доменное имя (опционально)

## 🔧 Шаг 1: Настройка VPS

### Подключитесь к VPS

```bash
ssh username@your-vps-ip
```

### Запустите скрипт установки

```bash
cd ~
git clone https://github.com/your-username/hakolr.dev.git hakolr-blog
cd hakolr-blog
chmod +x bin/bash/*.sh
./bin/bash/setup-vps.sh
```

Скрипт установит:
- Docker и Docker Compose
- Git и другие утилиты
- Настроит firewall (порты 80, 443, SSH)

**После установки перелогиньтесь:**
```bash
exit
ssh username@your-vps-ip
cd ~/hakolr-blog
```

## ⚙️ Шаг 2: Настройка переменных окружения

```bash
cp env.production.example .env.production
nano .env.production
```

Заполните обязательные переменные:

```env
# Пароль БД (сгенерируйте безопасный)
DB_PASSWORD=ваш_надежный_пароль

# JWT секрет (минимум 32 символа)
JWT_SECRET=ваш_jwt_секрет_минимум_32_символа

# Telegram бот
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id

# URLs
FRONTEND_URL=http://ваш-ip  # или https://yourdomain.com
NEXT_PUBLIC_API_URL=/api    # используйте относительный путь
```

**Генерация безопасных паролей:**
```bash
openssl rand -base64 32
```

## 🚀 Шаг 3: Развертывание

```bash
./bin/bash/deploy.sh
```

Скрипт:
1. Соберет Docker образы
2. Запустит все сервисы (PostgreSQL, Backend, Frontend, Nginx)
3. Покажет статус и логи

### Проверка

```bash
# Статус контейнеров
docker ps

# Проверка доступности
curl http://localhost

# Просмотр логов
./bin/bash/logs.sh
```

Откройте в браузере: `http://your-vps-ip`

## 🔒 Шаг 4: Настройка SSL (опционально)

### Настройте DNS

В панели управления доменом добавьте:
```
A Record:  @ -> your-vps-ip
A Record:  www -> your-vps-ip
```

### Получите SSL сертификат

```bash
./bin/bash/ssl-setup.sh yourdomain.com your-email@example.com
```

### Обновите конфигурацию Nginx

```bash
nano nginx/nginx.conf
```

Раскомментируйте блок HTTPS (строки с `# server {` для порта 443) и замените `your-domain.com` на ваш домен.

### Перезапустите Nginx

```bash
docker-compose -f docker-compose.prod.yml restart nginx
```

Теперь ваш сайт доступен по HTTPS: `https://yourdomain.com`

## 📝 Полезные команды

```bash
# Проверка статуса
./bin/bash/status.sh

# Просмотр логов
./bin/bash/logs.sh              # все сервисы
./bin/bash/logs.sh backend      # только backend
./bin/bash/logs.sh frontend     # только frontend

# Обновление приложения
git pull
./bin/bash/deploy.sh

# Перезапуск
docker-compose -f docker-compose.prod.yml restart

# Остановка
docker-compose -f docker-compose.prod.yml down

# Резервное копирование БД
./bin/bash/backup-db.sh

# Восстановление БД
./bin/bash/restore-db.sh /path/to/backup.sql.gz
```

## 🎯 Makefile команды (альтернатива)

```bash
make deploy      # Развертывание
make status      # Проверка статуса
make logs        # Просмотр логов
make logs-be     # Логи backend
make logs-fe     # Логи frontend
make restart     # Перезапуск
make backup      # Backup БД
make ssl DOMAIN=yourdomain.com  # Настройка SSL
make help        # Все команды
```

## 🔧 Решение проблем

### Контейнеры не запускаются

```bash
# Проверьте логи
docker-compose -f docker-compose.prod.yml logs

# Проверьте .env.production
cat .env.production

# Проверьте готовность системы
./bin/bash/check-ready.sh
```

### Нет доступа к сайту

```bash
# Проверьте firewall
sudo ufw status

# Проверьте порты
sudo netstat -tulpn | grep LISTEN

# Проверьте Nginx
docker exec hakolr-nginx nginx -t
```

### Backend не подключается к БД

```bash
# Логи PostgreSQL
docker-compose -f docker-compose.prod.yml logs postgres

# Проверка связи
docker exec hakolr-backend ping postgres
```

## 🔐 Безопасность

1. **Используйте сильные пароли** - генерируйте их через `openssl rand -base64 32`
2. **Настройте SSL** - используйте Let's Encrypt
3. **Регулярные обновления** - `sudo apt update && sudo apt upgrade`
4. **Резервные копии** - настройте автоматический backup
5. **Firewall** - только необходимые порты (80, 443, SSH)

## 📦 Структура проекта

```
hakolr.dev/
├── backend/
│   ├── Dockerfile           # Docker образ backend
│   └── src/                # Исходный код NestJS
├── frontend/
│   ├── Dockerfile          # Docker образ frontend
│   └── src/               # Исходный код Next.js
├── nginx/
│   └── nginx.conf         # Конфигурация Nginx
├── bin/bash/              # Bash скрипты
│   ├── setup-vps.sh       # Настройка VPS
│   ├── deploy.sh          # Развертывание
│   ├── status.sh          # Проверка статуса
│   ├── logs.sh            # Просмотр логов
│   ├── backup-db.sh       # Backup БД
│   ├── restore-db.sh      # Restore БД
│   └── ssl-setup.sh       # Настройка SSL
├── docker-compose.prod.yml # Production конфигурация
├── env.production.example  # Пример .env
└── Makefile               # Быстрые команды
```

## ✅ Готово!

Ваш сайт hakolr.dev успешно развернут! 🎉

Для регулярного обслуживания:
- Проверяйте статус: `./bin/bash/status.sh`
- Делайте backup: `./bin/bash/backup-db.sh`
- Обновляйте систему: `sudo apt update && sudo apt upgrade`
