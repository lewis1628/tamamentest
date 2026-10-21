# Multi-stage Dockerfile for fast & reliable deployment on verisunucu / Coolify / Docker
FROM node:20-alpine AS builder

WORKDIR /app

# Copy configuration and package manifests
COPY package*.json ./
COPY .npmrc* ./

# Install dependencies with fallback protection
RUN npm ci || npm install --legacy-peer-deps --no-audit --no-fund

# Copy all source files
COPY . .

# Build production bundle
RUN npm run build

# Production runner stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy built assets and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/vite.config.ts ./

EXPOSE 3000

# Container healthcheck for monitoring & auto-recovery
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/health.json || exit 1

CMD ["npm", "run", "start"]
