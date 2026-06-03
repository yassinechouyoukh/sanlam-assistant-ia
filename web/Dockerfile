# Stage 1 — build the Vite/React app
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps first for layer caching
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 — serve the static bundle with nginx
FROM nginx:alpine

# Replace default nginx config with our SPA-friendly one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
