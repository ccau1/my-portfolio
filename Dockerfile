# Dev stage
FROM node:22-alpine AS dev
WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/web/package.json ./packages/web/

RUN npm ci

COPY packages/web ./packages/web

WORKDIR /app/packages/web
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files for workspace install
COPY package.json package-lock.json ./
COPY packages/web/package.json ./packages/web/

# Install dependencies (npm workspaces handles hoisting)
RUN npm ci

# Copy source and build
COPY packages/web ./packages/web

ARG NODE_ENV=production
RUN NODE_ENV=$NODE_ENV npm run build --workspace=packages/web

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/packages/web/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "\u002Dg", "daemon off;"]
