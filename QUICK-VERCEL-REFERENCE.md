# ⚡ QUICK VERCEL REFERENCE CARD

## 🎯 YOUR DEPLOYMENT AT A GLANCE

```
Backend:  apps/server  → Vercel Project 1
Frontend: apps/web     → Vercel Project 2
Database: Supabase     → Already configured ✅
```

---

## 📦 VERCEL PROJECT SETTINGS

### Backend

```
Root: apps/server
Build: cd ../.. && npm install && npm run build && cd apps/server && npm run build
Output: dist
```

### Frontend

```
Root: apps/web
Build: cd ../.. && npm install && npm run build && cd apps/web && npm run build
Output: build/client
```

---

## 🔐 ENVIRONMENT VARIABLES

### Backend (6)

```
DATABASE_URL=postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres
BETTER_AUTH_SECRET=gFIZh8I5hRaHUzfu4CTxAcc8TaSTFs73uTI6W9cUtGg=
BETTER_AUTH_URL=https://YOUR-BACKEND.vercel.app/api/auth
CORS_ORIGIN=https://YOUR-FRONTEND.vercel.app
WEB_URL=https://YOUR-FRONTEND.vercel.app
PORT=3000
```

### Frontend (2)

```
VITE_API_URL=https://YOUR-BACKEND.vercel.app/api
VITE_BETTER_AUTH_URL=https://YOUR-BACKEND.vercel.app/api/auth
```

---

## 🗄️ DATABASE SETUP

```bash
cd cloudCB
export DATABASE_URL="postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres"
npm run db:generate
npm run db:push
```

---

## ✅ DEPLOYMENT ORDER

1. Deploy Backend → Get URL
2. Deploy Frontend (use backend URL)
3. Update Backend (use frontend URL)
4. Setup Database (run commands above)
5. Test!

---

## 🐛 QUICK FIXES

**Build fails**: Check build command includes `cd ../..`
**CORS error**: Verify URLs match exactly
**Auth fails**: Check BETTER_AUTH_URL
**DB error**: Run `npm run db:push`

---

## 📚 FULL GUIDES

- **Start**: `START-VERCEL-DEPLOYMENT.md`
- **Checklist**: `DEPLOY-NOW-CHECKLIST.md`
- **Complete**: `VERCEL-DEPLOYMENT-COMPLETE-GUIDE.md`
- **Env Vars**: `VERCEL-ENV-VARS-READY.md`
- **Fixes**: `VERCEL-MONOREPO-FIX.md`
- **Commands**: `VERCEL-COMMANDS-REFERENCE.md`
- **Visual**: `VERCEL-DEPLOYMENT-VISUAL.md`

---

## ⏱️ TIME: ~45 minutes

**You got this! 🚀**
