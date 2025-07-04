# 1. Build step
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 2. Serve step
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
