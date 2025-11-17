# ⚡ Quick Start - Deploy in 30 Minutes

## 🎯 What You're Doing:

1. **Supabase** = Database (10 min)
2. **Koyeb** = Backend API (15 min)
3. **Vercel** = Frontend Website (10 min)

---

## 📋 Before You Start:

- [ ] Push your code to GitHub
- [ ] Have 30-40 minutes free
- [ ] Open the full guide: `DEPLOYMENT-KOYEB-SUPABASE-VERCEL.md`

---

## 🚀 Quick Steps:

### 1️⃣ SUPABASE (Database)

```
1. Go to supabase.com
2. Sign in with GitHub
3. Create new project: "cloudcb"
4. Copy connection string (with pooling)
5. Save it!
```

### 2️⃣ KOYEB (Backend)

```
1. Go to koyeb.com
2. Sign in with GitHub
3. Create app from your GitHub repo
4. Build command: chmod +x build.sh && ./build.sh
5. Run command: node apps/server/dist/index.js
6. Add environment variables:
   - DATABASE_URL (from Supabase)
   - BETTER_AUTH_SECRET (generate random)
   - PORT = 3000
   - NODE_ENV = production
7. Deploy and copy your URL
```

### 3️⃣ VERCEL (Frontend)

```
1. Go to vercel.com
2. Sign in with GitHub
3. Import your repo
4. Root directory: apps/web
5. Add environment variables:
   - VITE_API_URL (your Koyeb URL + /api)
   - VITE_BETTER_AUTH_URL (your Koyeb URL + /api/auth)
6. Deploy and copy your URL
```

### 4️⃣ FINAL STEP

```
1. Go back to Koyeb
2. Update environment variables:
   - CORS_ORIGIN = your Vercel URL
   - WEB_URL = your Vercel URL
   - BETTER_AUTH_URL = your Koyeb URL + /api/auth
3. Redeploy
4. Test your app!
```

---

## 🎉 Done!

Your app is live at your Vercel URL!

---

## 📖 Need Details?

Open: **DEPLOYMENT-KOYEB-SUPABASE-VERCEL.md**

It has:

- Screenshots descriptions
- Troubleshooting
- Exact commands
- Everything step-by-step
