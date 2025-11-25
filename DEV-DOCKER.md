# Запуск проекта в режиме разработки с Docker

## Быстрый старт

1. **Запуск всех сервисов:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Просмотр логов:**
   ```bash
   # Все сервисы
   docker-compose -f docker-compose.dev.yml logs -f
   
   # Только backend
   docker-compose -f docker-compose.dev.yml logs -f backend
   
   # Только frontend
   docker-compose -f docker-compose.dev.yml logs -f frontend
   ```

3. **Остановка сервисов:**
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

4. **Остановка с удалением volumes (очистка БД):**
   ```bash
   docker-compose -f docker-compose.dev.yml down -v
   ```

## Доступ к сервисам

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api- **PostgreSQL:** localhost:5433 (внешний порт, внутри контейнера 5432)
  - Database: `hakolr_blog`
  - User: `postgres`
  - Password: `postgres`

## Особенности dev режима

- ✅ **Hot-reload** для backend и frontend
- ✅ Изменения в коде применяются автоматически
- ✅ Все зависимости устанавливаются при сборке
- ✅ База данных сохраняется в volume `postgres_dev_data`

## Переменные окружения

Переменные окружения можно настроить в `docker-compose.dev.yml` в секциях `environment` для каждого сервиса.

Для backend доступны следующие переменные:
- `NODE_ENV=development`
- `PORT=3001`
- `DB_HOST=postgres`
- `DB_PORT=5432`
- `DB_USER=postgres`
- `DB_PASSWORD=postgres`
- `DB_NAME=hakolr_blog`
- `TYPEORM_SYNCHRONIZE=true` (автоматическая синхронизация схемы)
- `TYPEORM_LOGGING=true` (логирование SQL запросов)

## Полезные команды

```bash
# Пересборка контейнеров
docker-compose -f docker-compose.dev.yml build

# Пересборка и перезапуск
docker-compose -f docker-compose.dev.yml up -d --build

# Выполнение команд внутри контейнера
docker-compose -f docker-compose.dev.yml exec backend npm run migration:run
docker-compose -f docker-compose.dev.yml exec backend npm run db:seed

# Доступ к PostgreSQL
docker-compose -f docker-compose.dev.yml exec postgres psql -U postgres -d hakolr_blog
```

