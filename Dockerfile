# Use Node.js 20 (debian-based for Prisma compatibility)
FROM node:20

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY turbo.json ./

# Copy workspace packages
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install

# Generate Prisma client with correct binary
RUN npm run db:generate

# Build all workspace packages (db, auth, config, etc.)
RUN npm run build

# This builds everything including dependencies

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Run migrations and start server
CMD npm run db:migrate:deploy && node apps/server/dist/index.js
