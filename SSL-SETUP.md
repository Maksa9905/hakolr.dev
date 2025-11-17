# 🔒 Настройка SSL для hakolr.dev

## 📋 Шаг 1: Настройка DNS

Зайдите в панель управления вашего регистратора домена и добавьте A-записи:

```
Type    Host    Value              TTL
A       @       89.111.172.122     3600
A       www     89.111.172.122     3600
```

**Проверка DNS:**
```bash
dig hakolr.dev +short
# Должно вывести: 89.111.172.122

dig www.hakolr.dev +short
# Должно вывести: 89.111.172.122
```

⏳ Дождитесь распространения DNS (обычно 5-30 минут, максимум 24 часа).

---

## 🔒 Шаг 2: Получение SSL сертификата

Подключитесь к VPS:

```bash
ssh username@89.111.172.122
cd ~/hakolr.dev
```

### Вариант А: Автоматический (рекомендуется)

```bash
./bin/bash/ssl-setup.sh hakolr.dev your-email@example.com
```

### Вариант Б: Вручную

```bash
# 1. Остановите Nginx временно
docker-compose -f docker-compose.prod.yml stop nginx

# 2. Установите certbot
sudo apt update
sudo apt install -y certbot

# 3. Получите сертификат
sudo certbot certonly --standalone \
  -d hakolr.dev \
  -d www.hakolr.dev \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email

# 4. Скопируйте сертификаты в проект
mkdir -p nginx/ssl
sudo cp /etc/letsencrypt/live/hakolr.dev/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/hakolr.dev/privkey.pem nginx/ssl/
sudo chown -R $USER:$USER nginx/ssl
chmod 600 nginx/ssl/privkey.pem
```

---

## ⚙️ Шаг 3: Обновите переменные окружения

```bash
nano .env.production
```

Измените:
```env
FRONTEND_URL=https://hakolr.dev
```

Сохраните: `Ctrl+X` → `Y` → `Enter`

---

## 🚀 Шаг 4: Запустите с новой конфигурацией

```bash
# Спулить изменения из Git
git pull

# Пересобрать и запустить
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

---

## ✅ Шаг 5: Проверка

### Проверьте Nginx конфигурацию:
```bash
docker exec hakolr-nginx nginx -t
```

Должно быть:
```
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Проверьте статус контейнеров:
```bash
docker-compose -f docker-compose.prod.yml ps
```

Все должны быть `Up` и `healthy`.

### Откройте в браузере:
- ✅ `http://hakolr.dev` → должен редиректить на `https://hakolr.dev`
- ✅ `https://hakolr.dev` → должен открыться с замочком 🔒
- ✅ `https://www.hakolr.dev` → должен работать

---

## 🔄 Шаг 6: Настройка автообновления сертификата

SSL сертификат Let's Encrypt действует 90 дней. Настройте автообновление:

```bash
# Откройте crontab
sudo crontab -e

# Добавьте строку (обновление каждый месяц в 2:00 ночи):
0 2 1 * * certbot renew --quiet && \
  cp /etc/letsencrypt/live/hakolr.dev/fullchain.pem ~/hakolr.dev/nginx/ssl/ && \
  cp /etc/letsencrypt/live/hakolr.dev/privkey.pem ~/hakolr.dev/nginx/ssl/ && \
  docker-compose -f ~/hakolr.dev/docker-compose.prod.yml restart nginx
```

---

## 🔍 Проверка SSL

### В браузере:
1. Откройте `https://hakolr.dev`
2. Кликните на замочек 🔒 в адресной строке
3. Должна быть надпись "Соединение защищено"

### Через командную строку:
```bash
# Проверка сертификата
openssl s_client -connect hakolr.dev:443 -servername hakolr.dev < /dev/null

# Проверка SSL рейтинга
curl -I https://hakolr.dev
```

### Online инструменты:
- https://www.ssllabs.com/ssltest/analyze.html?d=hakolr.dev
- https://securityheaders.com/?q=hakolr.dev

---

## 🔧 Решение проблем

### Ошибка "certificate not found"

```bash
# Проверьте, что сертификаты скопированы
ls -la nginx/ssl/

# Должно быть:
# fullchain.pem
# privkey.pem
```

### Ошибка "permission denied"

```bash
sudo chown -R $USER:$USER nginx/ssl/
chmod 600 nginx/ssl/privkey.pem
chmod 644 nginx/ssl/fullchain.pem
```

### Редирект не работает

```bash
# Проверьте nginx конфигурацию
docker exec hakolr-nginx nginx -t

# Перезапустите Nginx
docker-compose -f docker-compose.prod.yml restart nginx
```

### Сертификат не обновляется

```bash
# Проверьте срок действия
sudo certbot certificates

# Попробуйте обновить вручную
sudo certbot renew --dry-run
```

---

## 📝 Что дальше?

После настройки SSL:

✅ Куки будут работать с `secure: true` (автоматически в production)  
✅ Весь трафик будет зашифрован (HTTPS)  
✅ Поисковики будут лучше ранжировать ваш сайт  
✅ Браузеры не будут показывать предупреждения  

---

## 🎉 Готово!

Ваш сайт **hakolr.dev** теперь работает с SSL сертификатом! 🔒

Для проверки:
- https://hakolr.dev
- https://www.hakolr.dev

