# ⚡ RENDER - QUICK SETUP CARD

## 🎯 BACKEND SERVICE

**Type:** Web Service
**Root Directory:** `apps/server`
**Build Command:**

```bash
cd ../.. && npm install && npm run db:generate && npm run build && cd apps/server && npm run build
```

**Start Command:**

```bash
node dist/index.js
```

**Environment Variables:**

```
DATABASE_URL=postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres
BETTER_AUTH_SECRET=gFIZh8I5hRaHUzfu4CTxAcc8TaSTFs73uTI6W9cUtGg=
BETTER_AUTH_URL=https://YOUR-BACKEND.onrender.com/api/auth
CORS_ORIGIN=https://YOUR-FRONTEND.onrender.com
WEB_URL=https://YOUR-FRONTEND.onrender.com
PORT=3000
NODE_ENV=production
```

---

## 🎨 FRONTEND STATIC SITE

**Type:** Static Site
**Root Directory:** `apps/web`
**Build Command:**

```bash
cd ../.. && npm install && npm run build && cd apps/web && npm run build
```

**Publish Directory:**

```bash
build/client
```

**Environment Variables:**

```
VITE_API_URL=https://YOUR-BACKEND.onrender.com/api
VITE_BETTER_AUTH_URL=https://YOUR-BACKEND.onrender.com/api/auth
```

---

## 🗄️ DATABASE SETUP (Run Locally)

```bash
cd cloudCB
export DATABASE_URL="postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres"
npm run db:generate
npm run db:push
```

---

## ✅ DEPLOYMENT ORDER

1. Deploy Backend → Get URL
2. Deploy Frontend (use backend URL in env vars)
3. Update Backend env vars (use frontend URL)
4. Run database setup locally
5. Test!

---

**Total Time: ~20 minutes**
**Difficulty: Easy**
**Cost: FREE**

---

Read full guide: `DEPLOY-TO-RENDER-NOW.md`
