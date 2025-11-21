# 🔐 VERCEL ENVIRONMENT VARIABLES - READY TO COPY

## 📦 BACKEND ENVIRONMENT VARIABLES

Copy these to your **Backend Vercel Project**:

```env
DATABASE_URL=postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres

BETTER_AUTH_SECRET=gFIZh8I5hRaHUzfu4CTxAcc8TaSTFs73uTI6W9cUtGg=

BETTER_AUTH_URL=https://YOUR-BACKEND-URL.vercel.app/api/auth

CORS_ORIGIN=https://YOUR-FRONTEND-URL.vercel.app

WEB_URL=https://YOUR-FRONTEND-URL.vercel.app

PORT=3000
```

⚠️ **AFTER DEPLOYMENT**: Replace `YOUR-BACKEND-URL` and `YOUR-FRONTEND-URL` with actual URLs

---

## 🎨 FRONTEND ENVIRONMENT VARIABLES

Copy these to your **Frontend Vercel Project**:

```env
VITE_API_URL=https://YOUR-BACKEND-URL.vercel.app/api

VITE_BETTER_AUTH_URL=https://YOUR-BACKEND-URL.vercel.app/api/auth
```

⚠️ **BEFORE DEPLOYMENT**: Replace `YOUR-BACKEND-URL` with your actual backend URL from Step 1

---

## 📋 HOW TO ADD IN VERCEL

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. For each variable:
   - Click **Add New**
   - Enter **Key** (e.g., `DATABASE_URL`)
   - Enter **Value** (copy from above)
   - Select **Production**, **Preview**, and **Development**
   - Click **Save**

---

## 🔄 UPDATE FLOW

### First Time Setup:

1. Deploy backend with placeholder URLs
2. Copy backend URL
3. Deploy frontend with backend URL
4. Copy frontend URL
5. Update backend with frontend URL
6. Redeploy backend

### After First Setup:

- All future deployments are automatic!
- Just push to GitHub

---

## ✅ VERIFICATION

After adding all variables, you should see:

**Backend (6 variables):**

- DATABASE_URL
- BETTER_AUTH_SECRET
- BETTER_AUTH_URL
- CORS_ORIGIN
- WEB_URL
- PORT

**Frontend (2 variables):**

- VITE_API_URL
- VITE_BETTER_AUTH_URL

---

## 🎯 QUICK TIPS

- **No trailing slashes** in URLs
- **Include /api** in API URLs
- **Include /api/auth** in auth URLs
- **Select all environments** (Production, Preview, Development)
- **Redeploy after changing** environment variables

---

Ready to deploy! Follow the main guide: `VERCEL-DEPLOYMENT-COMPLETE-GUIDE.md`
