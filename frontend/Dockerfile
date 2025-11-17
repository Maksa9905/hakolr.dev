# Dockerfile для Frontend (Next.js)
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем весь проект
COPY . .

# Собираем приложение Next.js
RUN npm run build

# Production образ
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Копируем package.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production && npm cache clean --force

# Копируем собранное приложение из builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Создаем пользователя без прав root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Меняем владельца файлов
RUN chown -R nextjs:nodejs /app

USER nextjs

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]

