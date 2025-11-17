#!/bin/bash

# ============================================
# Скрипт для восстановления БД из бэкапа
# ============================================

set -e

if [ -z "$1" ]; then
    echo "❌ Ошибка: укажите путь к файлу бэкапа"
    echo "Использование: ./bin/bash/restore-db.sh /path/to/backup.sql.gz"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Ошибка: файл $BACKUP_FILE не найден"
    exit 1
fi

echo "⚠️  ВНИМАНИЕ: Это действие перезапишет текущую базу данных!"
echo "Файл бэкапа: $BACKUP_FILE"
read -p "Продолжить? (yes/no): " -r
if [[ ! $REPLY =~ ^yes$ ]]; then
    echo "Отменено"
    exit 0
fi

echo "🔄 Восстановление базы данных..."

# Распаковка если файл сжат
if [[ "$BACKUP_FILE" == *.gz ]]; then
    echo "📦 Распаковка файла..."
    gunzip -c "$BACKUP_FILE" | docker exec -i hakolr-postgres psql -U postgres hakolr_blog
else
    docker exec -i hakolr-postgres psql -U postgres hakolr_blog < "$BACKUP_FILE"
fi

echo "✅ База данных восстановлена!"

