#!/bin/bash
set -e

echo "Building monorepo packages..."
cd ../..
npm install
npm run db:generate
npm run build

echo "Building server..."
cd apps/server
npm run build

echo "Build complete!"
