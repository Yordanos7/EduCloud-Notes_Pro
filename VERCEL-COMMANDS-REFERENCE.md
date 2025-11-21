# 🔧 VERCEL DEPLOYMENT - COMMAND REFERENCE

## 📦 VERCEL PROJECT SETTINGS

### Backend Project Configuration

```
Project Name: cloudcb-backend (or your choice)
Framework Preset: Other
Root Directory: apps/server

Build Command:
cd ../.. && npm install && npm run build && cd apps/server && npm run build

Install Command:
cd ../.. && npm install

Output Directory:
dist

Node Version: 20.x (default)
```

### Frontend Project Configuration

```
Project Name: cloudcb-frontend (or your choice)
Framework Preset: Vite
Root Directory: apps/web

Build Command:
cd ../.. && npm install && npm run build && cd apps/web && npm run build

Install Command:
cd ../.. && npm install

Output Directory:
build/client

Node Version: 20.x (default)
```

---

## 🗄️ DATABASE SETUP COMMANDS

### Run Locally (One Time Setup)

```bash
# Navigate to project
cd cloudCB

# Set database URL
export DATABASE_URL="postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres"

# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Optional: Open Prisma Studio to view data
npm run db:studio
```

### Windows (PowerShell)

```powershell
cd cloudCB
$env:DATABASE_URL="postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres"
npm run db:generate
npm run db:push
```

---

## 🔐 GENERATE AUTH SECRET

```bash
# Linux/Mac
openssl rand -base64 32

# Output (example):
# gFIZh8I5hRaHUzfu4CTxAcc8TaSTFs73uTI6W9cUtGg=
```

```powershell
# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

---

## 🧪 LOCAL TESTING COMMANDS

### Test Backend Build

```bash
cd cloudCB
npm install
npm run build
cd apps/server
npm run build

# Check output
ls -la dist
# Should see: index.js, index.js.map

# Test locally
npm run dev
# Should start on http://localhost:3000
```

### Test Frontend Build

```bash
cd cloudCB
npm install
npm run build
cd apps/web
npm run build

# Check output
ls -la build/client
# Should see: index.html, assets/, etc.

# Test locally
npm run dev
# Should start on http://localhost:5173
```

### Test Full Stack Locally

```bash
# Terminal 1: Start backend
cd cloudCB/apps/server
npm run dev

# Terminal 2: Start frontend
cd cloudCB/apps/web
npm run dev

# Open browser: http://localhost:5173
```

---

## 🔄 GIT COMMANDS

### Initial Push

```bash
cd cloudCB
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### After Changes

```bash
git add .
git commit -m "Update deployment config"
git push origin main
# Vercel will auto-deploy!
```

---

## 🌐 VERCEL CLI COMMANDS (Optional)

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login

```bash
vercel login
```

### Deploy Backend

```bash
cd cloudCB/apps/server
vercel --prod
```

### Deploy Frontend

```bash
cd cloudCB/apps/web
vercel --prod
```

### View Logs

```bash
vercel logs [deployment-url]
```

---

## 🔍 DEBUGGING COMMANDS

### Check Environment Variables

```bash
# In Vercel project
vercel env ls

# Pull environment variables locally
vercel env pull
```

### View Build Logs

```bash
# Via CLI
vercel logs [deployment-url]

# Or in browser:
# Go to Vercel Dashboard → Project → Deployments → Click deployment → View Logs
```

### Test Database Connection

```bash
cd cloudCB

# Set DATABASE_URL
export DATABASE_URL="postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres"

# Test connection
npx prisma db execute --stdin <<< "SELECT 1"

# Should output: Success
```

### Check Prisma Client

```bash
cd cloudCB/packages/db

# Generate client
npx prisma generate

# Check generated files
ls -la generated/
```

---

## 📊 MONITORING COMMANDS

### Check Deployment Status

```bash
vercel ls
```

### View Project Info

```bash
vercel inspect [deployment-url]
```

### Check Build Time

```bash
vercel inspect [deployment-url] --logs
```

---

## 🔧 TROUBLESHOOTING COMMANDS

### Clear Vercel Cache

```bash
# Redeploy without cache
vercel --prod --force
```

### Reinstall Dependencies

```bash
cd cloudCB
rm -rf node_modules
rm package-lock.json
npm install
```

### Reset Prisma

```bash
cd cloudCB
rm -rf packages/db/generated
npm run db:generate
```

### Check Node Version

```bash
node --version
# Should be v20.x or higher
```

### Check npm Version

```bash
npm --version
# Should be v10.x or higher
```

---

## 📝 USEFUL VERCEL URLS

```
Dashboard: https://vercel.com/dashboard
New Project: https://vercel.com/new
Documentation: https://vercel.com/docs
Status: https://vercel-status.com
```

---

## 🎯 QUICK COPY-PASTE

### Backend Environment Variables (Vercel UI)

```
DATABASE_URL=postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres
BETTER_AUTH_SECRET=gFIZh8I5hRaHUzfu4CTxAcc8TaSTFs73uTI6W9cUtGg=
BETTER_AUTH_URL=https://YOUR-BACKEND-URL.vercel.app/api/auth
CORS_ORIGIN=https://YOUR-FRONTEND-URL.vercel.app
WEB_URL=https://YOUR-FRONTEND-URL.vercel.app
PORT=3000
```

### Frontend Environment Variables (Vercel UI)

```
VITE_API_URL=https://YOUR-BACKEND-URL.vercel.app/api
VITE_BETTER_AUTH_URL=https://YOUR-BACKEND-URL.vercel.app/api/auth
```

### Database Setup (Local Terminal)

```bash
cd cloudCB
export DATABASE_URL="postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres"
npm run db:generate
npm run db:push
```

---

## 🚀 DEPLOYMENT SEQUENCE

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin main

# 2. Deploy backend on Vercel (via UI)
# 3. Deploy frontend on Vercel (via UI)

# 4. Setup database
cd cloudCB
export DATABASE_URL="postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres"
npm run db:generate
npm run db:push

# 5. Test
# Open frontend URL in browser
```

---

## ✅ VERIFICATION COMMANDS

### Test Backend

```bash
curl https://YOUR-BACKEND-URL.vercel.app
# Should return: {"status":"OK","message":"CloudCB API Server"}
```

### Test Frontend

```bash
curl https://YOUR-FRONTEND-URL.vercel.app
# Should return: HTML content
```

### Test Database

```bash
cd cloudCB
export DATABASE_URL="postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres"
npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM \"user\""
# Should return: Query executed successfully
```

---

Need help? Check the main guide: `VERCEL-DEPLOYMENT-COMPLETE-GUIDE.md`
