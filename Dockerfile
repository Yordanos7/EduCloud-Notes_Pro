# Use Node.js 20
FROM node:20-alpine

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

# Generate Prisma client
RUN npm run db:generate

# Build the server
RUN npm run build -- --filter=server

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Run migrations and start server
CMD npm run db:migrate:deploy && node apps/server/dist/index.js
