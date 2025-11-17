#!/bin/bash
set -e

echo "Installing dependencies..."
npm install

echo "Generating Prisma client..."
npm run db:generate

echo "Running database migrations..."
npm run db:migrate:deploy

echo "Building server..."
npm run build -- --filter=server

echo "Build complete!"
