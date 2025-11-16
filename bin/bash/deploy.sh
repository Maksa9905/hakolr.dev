#!/bin/bash

# Получаем последние env файлы из GitHub Actions (если используете артефакты)
# Или используем локальные секреты

docker-compose down
docker-compose up --build -d