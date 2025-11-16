FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN echo '#!/bin/sh' > /app/init-db.sh && \
    echo 'echo "Waiting for database..."' >> /app/init-db.sh && \
    echo 'sleep 10' >> /app/init-db.sh && \
    echo 'npm run db:special-tags' >> /app/init-db.sh && \
    chmod +x /app/init-db.sh

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3003
CMD sh -c '/app/init-db.sh & node dist/src/main'