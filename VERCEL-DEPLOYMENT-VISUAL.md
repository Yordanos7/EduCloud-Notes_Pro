# 🎨 VERCEL DEPLOYMENT - VISUAL GUIDE

## 📊 YOUR ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR DEPLOYMENT                          │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐
│   FRONTEND       │         │    BACKEND       │
│   (Vercel)       │────────▶│    (Vercel)      │
│                  │  API    │                  │
│  React Router    │ Calls   │  Express.js      │
│  + Vite          │         │  + Better Auth   │
└──────────────────┘         └──────────────────┘
                                      │
                                      │ SQL
                                      ▼
                             ┌──────────────────┐
                             │   DATABASE       │
                             │   (Supabase)     │
                             │                  │
                             │  PostgreSQL      │
                             └──────────────────┘
```

---

## 🔄 DEPLOYMENT FLOW

```
Step 1: Deploy Backend
┌─────────────────────────────────────────────┐
│ 1. Create Vercel Project                    │
│ 2. Set Root: apps/server                    │
│ 3. Add Environment Variables                │
│    - DATABASE_URL ✅                         │
│    - BETTER_AUTH_SECRET ✅                   │
│    - BETTER_AUTH_URL (placeholder)          │
│    - CORS_ORIGIN (placeholder)              │
│    - WEB_URL (placeholder)                  │
│ 4. Deploy                                   │
│ 5. Get Backend URL ✅                        │
└─────────────────────────────────────────────┘
                    ▼
Step 2: Deploy Frontend
┌─────────────────────────────────────────────┐
│ 1. Create Vercel Project                    │
│ 2. Set Root: apps/web                       │
│ 3. Add Environment Variables                │
│    - VITE_API_URL (use backend URL)         │
│    - VITE_BETTER_AUTH_URL (use backend URL) │
│ 4. Deploy                                   │
│ 5. Get Frontend URL ✅                       │
└─────────────────────────────────────────────┘
                    ▼
Step 3: Connect Them
┌─────────────────────────────────────────────┐
│ 1. Update Backend Environment Variables     │
│    - BETTER_AUTH_URL (use backend URL)      │
│    - CORS_ORIGIN (use frontend URL)         │
│    - WEB_URL (use frontend URL)             │
│ 2. Redeploy Backend                         │
└─────────────────────────────────────────────┘
                    ▼
Step 4: Setup Database
┌─────────────────────────────────────────────┐
│ Run locally:                                │
│ npm run db:generate                         │
│ npm run db:push                             │
└─────────────────────────────────────────────┘
                    ▼
              ✅ DONE!
```

---

## 🔐 ENVIRONMENT VARIABLES MAP

### Backend (6 variables)

```
DATABASE_URL ──────────────────────▶ Supabase PostgreSQL
BETTER_AUTH_SECRET ────────────────▶ Random secret key
BETTER_AUTH_URL ───────────────────▶ https://YOUR-BACKEND.vercel.app/api/auth
CORS_ORIGIN ───────────────────────▶ https://YOUR-FRONTEND.vercel.app
WEB_URL ───────────────────────────▶ https://YOUR-FRONTEND.vercel.app
PORT ──────────────────────────────▶ 3000
```

### Frontend (2 variables)

```
VITE_API_URL ──────────────────────▶ https://YOUR-BACKEND.vercel.app/api
VITE_BETTER_AUTH_URL ──────────────▶ https://YOUR-BACKEND.vercel.app/api/auth
```

---

## 📦 MONOREPO STRUCTURE

```
cloudCB/
├── apps/
│   ├── server/          ← Deploy as separate Vercel project
│   │   ├── src/
│   │   ├── dist/        ← Build output
│   │   └── package.json
│   │
│   └── web/             ← Deploy as separate Vercel project
│       ├── src/
│       ├── build/       ← Build output
│       └── package.json
│
├── packages/
│   ├── db/              ← Shared: Database & Prisma
│   ├── auth/            ← Shared: Authentication
│   └── config/          ← Shared: TypeScript config
│
└── package.json         ← Root: Manages workspaces
```

---

## 🔨 BUILD PROCESS

### Backend Build

```
1. cd ../..                    (Go to root)
2. npm install                 (Install all packages)
3. npm run build               (Build shared packages)
4. cd apps/server              (Go to server)
5. npm run build               (Build server)
   └─▶ TypeScript → dist/index.js
```

### Frontend Build

```
1. cd ../..                    (Go to root)
2. npm install                 (Install all packages)
3. npm run build               (Build shared packages)
4. cd apps/web                 (Go to web)
5. npm run build               (Build web app)
   └─▶ Vite → build/client/
```

---

## 🌐 REQUEST FLOW

```
User Browser
    │
    │ 1. Visit https://YOUR-FRONTEND.vercel.app
    ▼
┌─────────────────┐
│  Frontend       │
│  (Static HTML)  │
└─────────────────┘
    │
    │ 2. API Call: POST /api/auth/sign-in
    ▼
┌─────────────────┐
│  Backend        │
│  (Express API)  │
└─────────────────┘
    │
    │ 3. Query: SELECT * FROM user WHERE email = ?
    ▼
┌─────────────────┐
│  Database       │
│  (PostgreSQL)   │
└─────────────────┘
    │
    │ 4. Return user data
    ▼
┌─────────────────┐
│  Backend        │
│  (Create token) │
└─────────────────┘
    │
    │ 5. Return token + user
    ▼
┌─────────────────┐
│  Frontend       │
│  (Store token)  │
└─────────────────┘
    │
    │ 6. Redirect to dashboard
    ▼
  User sees app!
```

---

## ✅ SUCCESS INDICATORS

### Backend Deployed ✅

- [ ] URL accessible: `https://YOUR-BACKEND.vercel.app`
- [ ] Health check works: `GET /` returns `{"status":"OK"}`
- [ ] No build errors in Vercel logs

### Frontend Deployed ✅

- [ ] URL accessible: `https://YOUR-FRONTEND.vercel.app`
- [ ] Page loads (no 404)
- [ ] No build errors in Vercel logs

### Connected ✅

- [ ] Sign up works
- [ ] Sign in works
- [ ] Can create notes
- [ ] No CORS errors in browser console

---

## 🐛 DEBUGGING CHECKLIST

### Build Fails

```
Check:
1. Root directory is correct (apps/server or apps/web)
2. Build command includes monorepo build
3. Output directory matches build output
4. All dependencies are in package.json
```

### Runtime Errors

```
Check:
1. Environment variables are set
2. URLs match exactly (no typos)
3. Database is accessible
4. Prisma client is generated
```

### CORS Errors

```
Check:
1. CORS_ORIGIN matches frontend URL
2. No trailing slashes
3. Backend allows credentials
4. Frontend sends credentials
```

---

## 📱 VERCEL DASHBOARD LAYOUT

```
┌─────────────────────────────────────────────┐
│ Vercel Dashboard                            │
├─────────────────────────────────────────────┤
│                                             │
│  Projects:                                  │
│  ┌─────────────────────────────────────┐   │
│  │ cloudcb-backend                     │   │
│  │ https://cloudcb-backend.vercel.app  │   │
│  │ [Settings] [Deployments] [Logs]     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ cloudcb-frontend                    │   │
│  │ https://cloudcb-frontend.vercel.app │   │
│  │ [Settings] [Deployments] [Logs]     │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🎯 QUICK REFERENCE

| What            | Where           | Value                                          |
| --------------- | --------------- | ---------------------------------------------- |
| Backend Root    | Vercel Settings | `apps/server`                                  |
| Frontend Root   | Vercel Settings | `apps/web`                                     |
| Backend Output  | Build result    | `dist/`                                        |
| Frontend Output | Build result    | `build/client/`                                |
| Database Host   | Supabase        | `db.lvemllffjyhxeziucakd.supabase.co`          |
| Database Port   | Supabase        | `5432`                                         |
| Auth Secret     | Generated       | `gFIZh8I5hRaHUzfu4CTxAcc8TaSTFs73uTI6W9cUtGg=` |

---

## 🚀 READY TO DEPLOY?

Follow the checklist: `DEPLOY-NOW-CHECKLIST.md`

Or read the full guide: `VERCEL-DEPLOYMENT-COMPLETE-GUIDE.md`

**You got this! 💪**
