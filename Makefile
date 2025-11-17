# Makefile для упрощения команд управления приложением

.PHONY: help setup deploy update status logs logs-be logs-fe logs-db logs-nginx backup restore ssl clean stop restart

# Показать помощь
help:
	@echo "🚀 hakolr.dev - Команды управления"
	@echo "=================================="
	@echo ""
	@echo "Развертывание:"
	@echo "  make setup      - Первоначальная настройка VPS"
	@echo "  make deploy     - Развертывание приложения"
	@echo "  make update     - Обновление приложения"
	@echo ""
	@echo "Управление:"
	@echo "  make status     - Проверка статуса"
	@echo "  make restart    - Перезапуск всех сервисов"
	@echo "  make stop       - Остановка всех сервисов"
	@echo ""
	@echo "Логи:"
	@echo "  make logs       - Все логи"
	@echo "  make logs-be    - Логи backend"
	@echo "  make logs-fe    - Логи frontend"
	@echo "  make logs-db    - Логи PostgreSQL"
	@echo "  make logs-nginx - Логи Nginx"
	@echo ""
	@echo "База данных:"
	@echo "  make backup     - Резервная копия БД"
	@echo "  make restore    - Восстановление БД (укажите FILE=/path/to/backup.sql.gz)"
	@echo ""
	@echo "Прочее:"
	@echo "  make ssl        - Настройка SSL (укажите DOMAIN=yourdomain.com)"
	@echo "  make clean      - Очистка Docker ресурсов"

# Первоначальная настройка VPS
setup:
	@chmod +x bin/bash/setup-vps.sh
	@./bin/bash/setup-vps.sh

# Развертывание приложения
deploy:
	@chmod +x bin/bash/deploy.sh
	@./bin/bash/deploy.sh

# Обновление приложения
update:
	@chmod +x bin/bash/update.sh
	@./bin/bash/update.sh

# Проверка статуса
status:
	@chmod +x bin/bash/status.sh
	@./bin/bash/status.sh

# Логи всех сервисов
logs:
	@docker-compose -f docker-compose.prod.yml logs -f

# Логи backend
logs-be:
	@docker-compose -f docker-compose.prod.yml logs -f backend

# Логи frontend
logs-fe:
	@docker-compose -f docker-compose.prod.yml logs -f frontend

# Логи PostgreSQL
logs-db:
	@docker-compose -f docker-compose.prod.yml logs -f postgres

# Логи Nginx
logs-nginx:
	@docker-compose -f docker-compose.prod.yml logs -f nginx

# Резервное копирование БД
backup:
	@chmod +x bin/bash/backup-db.sh
	@./bin/bash/backup-db.sh

# Восстановление БД
restore:
	@chmod +x bin/bash/restore-db.sh
	@if [ -z "$(FILE)" ]; then \
		echo "❌ Укажите файл бэкапа: make restore FILE=/path/to/backup.sql.gz"; \
		exit 1; \
	fi
	@./bin/bash/restore-db.sh $(FILE)

# Настройка SSL
ssl:
	@chmod +x bin/bash/ssl-setup.sh
	@if [ -z "$(DOMAIN)" ]; then \
		echo "❌ Укажите домен: make ssl DOMAIN=yourdomain.com"; \
		exit 1; \
	fi
	@./bin/bash/ssl-setup.sh $(DOMAIN) $(EMAIL)

# Перезапуск всех сервисов
restart:
	@docker-compose -f docker-compose.prod.yml restart

# Остановка всех сервисов
stop:
	@docker-compose -f docker-compose.prod.yml down

# Очистка неиспользуемых Docker ресурсов
clean:
	@docker system prune -f
	@echo "✅ Очистка завершена"

# Быстрая пересборка и перезапуск
rebuild:
	@docker-compose -f docker-compose.prod.yml down
	@docker-compose -f docker-compose.prod.yml build --no-cache
	@docker-compose -f docker-compose.prod.yml up -d
	@echo "✅ Пересборка завершена"

