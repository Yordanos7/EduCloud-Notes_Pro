#!/bin/bash
set -e

echo "=== Building CloudCB Backend for Vercel ==="

echo "Step 1: Installing dependencies..."
npm install

echo "Step 2: Generating Prisma Client..."
npm run db:generate

echo "Step 3: Building shared packages..."
npm run build

echo "Step 4: Building server..."
cd apps/server
npm run build

echo "=== Build Complete! ==="
