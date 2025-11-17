# 🚀 Быстрая настройка CI/CD

Автоматический деплой на VPS при пуше в `main`.

## ⚡ Быстрая настройка (5 минут)

### 1. Создайте SSH ключ

```bash
ssh-keygen -t rsa -b 4096 -C "github-deploy" -f ~/.ssh/github_deploy
# Не вводите passphrase - просто Enter
```

### 2. Добавьте ключ на VPS

```bash
# Скопируйте публичный ключ
cat ~/.ssh/github_deploy.pub

# На VPS
ssh username@89.111.172.122
echo "ВСТАВЬТЕ_КЛЮЧ_СЮДА" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
exit

# Проверка
ssh -i ~/.ssh/github_deploy username@89.111.172.122
```

### 3. Настройте Telegram бота (2 минуты)

1. Найдите в Telegram: **@BotFather**
2. Отправьте: `/newbot`
3. Назовите бота: `Hakolr Deploy Bot`
4. Username: `hakolr_deploy_bot`
5. Скопируйте **токен бота**

6. Найдите в Telegram: **@userinfobot**
7. Нажмите Start - получите ваш **Chat ID**

📖 **Подробная инструкция:** [TELEGRAM-BOT-SETUP.md](./TELEGRAM-BOT-SETUP.md)

### 4. Настройте GitHub Secrets

Перейдите: **GitHub → Settings → Secrets → Actions → New repository secret**

Добавьте 7 секретов:

| Имя | Значение |
|-----|----------|
| `SSH_PRIVATE_KEY` | Содержимое файла `~/.ssh/github_deploy` (весь файл) |
| `SSH_HOST` | `89.111.172.122` |
| `SSH_USER` | `username` (ваше имя пользователя) |
| `PROJECT_PATH` | `/home/username/hakolr.dev` |
| `FRONTEND_URL` | `https://hakolr.dev` |
| **`TELEGRAM_BOT_TOKEN`** | Токен от @BotFather |
| **`TELEGRAM_CHAT_ID`** | Ваш Chat ID от @userinfobot |

**Для SSH_PRIVATE_KEY:**
```bash
cat ~/.ssh/github_deploy
# Скопируйте ВСЁ, включая:
# -----BEGIN RSA PRIVATE KEY-----
# ...
# -----END RSA PRIVATE KEY-----
```

### 5. Закоммитьте и запушьте

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: добавлен CI/CD pipeline"
git push origin main
```

### 6. Проверьте деплой

Перейдите: **GitHub → Actions → Deploy to VPS**

Должны увидеть запущенный workflow. Через 3-5 минут деплой завершится.

---

## ✅ Готово!

Теперь при каждом пуше в `main` будет автоматический деплой:

1. 📥 Git pull на VPS
2. 🏗️ Сборка Docker образов
3. 🚀 Перезапуск контейнеров
4. ✅ Проверка доступности
5. 📱 **Уведомления в Telegram!**

### 📱 Уведомления в Telegram

При каждом деплое вы будете получать:

**🚀 Старт деплоя:**
```
🚀 Начинается деплой hakolr.dev

Ветка: main
Коммит: abc123...
Автор: maksim
```

**✅ Успешный деплой:**
```
✅ Деплой hakolr.dev завершен успешно!

🌐 Сайт: https://hakolr.dev
📦 Контейнеры: postgres: running, backend: running...
⏱️ Время: 2024-11-17 23:45:30
```

**❌ Ошибка деплоя:**
```
❌ Деплой hakolr.dev завершился с ошибкой!

Проверьте логи: [ссылка на GitHub Actions]
```

---

## 🔧 Команды для копирования

### Скопировать приватный ключ (для GitHub Secret)

```bash
cat ~/.ssh/github_deploy | pbcopy  # macOS
cat ~/.ssh/github_deploy | xclip   # Linux
cat ~/.ssh/github_deploy | clip    # Windows
```

### Проверить подключение

```bash
ssh -i ~/.ssh/github_deploy username@89.111.172.122 "echo 'Подключение работает!'"
```

### Запустить деплой вручную

GitHub → Actions → Deploy to VPS → Run workflow

---

## 📊 Что происходит при деплое

```
┌─────────────────────────────────────┐
│  Push в main                        │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  GitHub Actions запускает workflow  │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Подключение к VPS по SSH          │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  git pull origin main               │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  docker-compose down                │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  docker-compose build --no-cache    │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  docker-compose up -d               │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Проверка доступности сайта        │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  ✅ Деплой завершен                 │
└─────────────────────────────────────┘
```

---

## 🎯 Дополнительные возможности

### 💾 Backup перед деплоем

Включен автоматический backup базы данных перед каждым деплоем!

### 📊 Статус контейнеров в уведомлениях

После деплоя получаете полную информацию о статусе всех контейнеров.

### 🔄 Автоматическое восстановление

При ошибке деплоя система попытается восстановить работу контейнеров.

---

## ⚠️ Важно

- ✅ Никогда не коммитьте SSH ключи в репозиторий
- ✅ Используйте отдельный SSH ключ для GitHub Actions
- ✅ Проверяйте логи деплоя в Actions
- ✅ Делайте backup БД перед крупными изменениями

---

## 🆘 Решение проблем

### "Permission denied (publickey)"

```bash
# Проверьте на VPS
cat ~/.ssh/authorized_keys | grep github-deploy
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### "docker-compose: command not found"

```bash
# На VPS
which docker-compose
# Если не найдено, установите
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Workflow завис

1. Перейдите в Actions
2. Найдите зависший workflow
3. Нажмите "Cancel workflow"
4. Подключитесь к VPS и проверьте статус контейнеров

---

**Готово!** Теперь ваш проект деплоится автоматически! 🎉

