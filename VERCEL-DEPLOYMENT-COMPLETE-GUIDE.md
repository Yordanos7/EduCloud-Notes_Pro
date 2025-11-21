# 🚀 COMPLETE VERCEL DEPLOYMENT GUIDE

## ✅ What You Have

- ✅ Database: Supabase PostgreSQL (already configured)
- ✅ Frontend: React Router v7 app
- ✅ Backend: Express.js API
- ✅ Monorepo structure with Turbo

## 🎯 Deployment Strategy

We'll deploy as **2 separate Vercel projects**:

1. **Backend API** (Express server)
2. **Frontend Web** (React Router app)

---

## 📋 PREREQUISITES

Before starting, make sure you have:

- [ ] Vercel account (free tier works!)
- [ ] GitHub account
- [ ] Your code pushed to GitHub
- [ ] Supabase database URL (you already have this ✅)

---

## 🔐 YOUR CREDENTIALS

### Database URL (from Supabase):

```
postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres
```

### Generated Auth Secret:

```
gFIZh8I5hRaHUzfu4CTxAcc8TaSTFs73uTI6W9cUtGg=
```

---

## 🚀 STEP 1: DEPLOY BACKEND FIRST

### 1.1 Push Code to GitHub

```bash
cd cloudCB
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 1.2 Create Backend Project on Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo
4. **IMPORTANT**: Configure as follows:

**Project Settings:**

- **Project Name**: `cloudcb-backend` (or your choice)
- **Framework Preset**: Other
- **Root Directory**: `apps/server` ⚠️ CRITICAL!
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 1.3 Add Backend Environment Variables

Click "Environment Variables" and add these **EXACTLY**:

```env
DATABASE_URL=postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres

BETTER_AUTH_SECRET=gFIZh8I5hRaHUzfu4CTxAcc8TaSTFs73uTI6W9cUtGg=

BETTER_AUTH_URL=https://YOUR-BACKEND-URL.vercel.app/api/auth

CORS_ORIGIN=https://YOUR-FRONTEND-URL.vercel.app

WEB_URL=https://YOUR-FRONTEND-URL.vercel.app

PORT=3000
```

⚠️ **IMPORTANT**:

- For `BETTER_AUTH_URL`, `CORS_ORIGIN`, and `WEB_URL`, use placeholder URLs for now
- After deployment, you'll get the actual URLs and update them
- Select **Production, Preview, and Development** for all variables

### 1.4 Deploy Backend

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. **Copy your backend URL** (e.g., `https://cloudcb-backend.vercel.app`)

### 1.5 Update Backend Environment Variables

1. Go to your backend project → Settings → Environment Variables
2. Update these 3 variables with your **actual backend URL**:
   - `BETTER_AUTH_URL`: `https://YOUR-ACTUAL-BACKEND-URL.vercel.app/api/auth`
   - Keep `CORS_ORIGIN` and `WEB_URL` as placeholders for now

3. Redeploy: Deployments → Click "..." → Redeploy

---

## 🎨 STEP 2: DEPLOY FRONTEND

### 2.1 Create Frontend Project on Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select **the same GitHub repo**
4. **IMPORTANT**: Configure as follows:

**Project Settings:**

- **Project Name**: `cloudcb-frontend` (or your choice)
- **Framework Preset**: Vite
- **Root Directory**: `apps/web` ⚠️ CRITICAL!
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `build/client`
- **Install Command**: `npm install`

### 2.2 Add Frontend Environment Variables

Click "Environment Variables" and add these:

```env
VITE_API_URL=https://YOUR-BACKEND-URL.vercel.app/api

VITE_BETTER_AUTH_URL=https://YOUR-BACKEND-URL.vercel.app/api/auth
```

⚠️ Replace `YOUR-BACKEND-URL` with your **actual backend URL** from Step 1.4

Select **Production, Preview, and Development** for all variables.

### 2.3 Deploy Frontend

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. **Copy your frontend URL** (e.g., `https://cloudcb-frontend.vercel.app`)

---

## 🔄 STEP 3: UPDATE BACKEND WITH FRONTEND URL

Now that you have both URLs, update the backend:

1. Go to your **backend project** on Vercel
2. Settings → Environment Variables
3. Update these variables:
   - `CORS_ORIGIN`: `https://YOUR-ACTUAL-FRONTEND-URL.vercel.app`
   - `WEB_URL`: `https://YOUR-ACTUAL-FRONTEND-URL.vercel.app`

4. Redeploy backend: Deployments → Click "..." → Redeploy

---

## 🗄️ STEP 4: RUN DATABASE MIGRATIONS

You need to set up your database tables. Run this locally:

```bash
cd cloudCB
export DATABASE_URL="postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres"
npm run db:generate
npm run db:push
```

This creates all the tables in your Supabase database.

---

## ✅ STEP 5: TEST YOUR DEPLOYMENT

1. Open your frontend URL: `https://YOUR-FRONTEND-URL.vercel.app`
2. Try to sign up / sign in
3. Create a note
4. Check if everything works!

---

## 🐛 TROUBLESHOOTING

### Backend Build Fails

**Error**: "Cannot find module '@cloudCB/db'"

**Fix**: The monorepo packages need to be built. Add this to backend build:

1. Go to backend project → Settings → General
2. Update **Build Command** to:

```bash
cd ../.. && npm install && npm run build && cd apps/server && npm run build
```

### Frontend Build Fails

**Error**: "Cannot find module '@cloudCB/auth'"

**Fix**: Same as above, update **Build Command** to:

```bash
cd ../.. && npm install && npm run build && cd apps/web && npm run build
```

### CORS Errors

**Fix**: Make sure:

1. Backend `CORS_ORIGIN` matches your frontend URL exactly
2. Frontend `VITE_API_URL` matches your backend URL exactly
3. No trailing slashes in URLs

### Database Connection Fails

**Fix**:

1. Check your Supabase database is running
2. Verify the DATABASE_URL is correct
3. Make sure you ran `npm run db:push`

### Auth Not Working

**Fix**:

1. Verify `BETTER_AUTH_SECRET` is set on backend
2. Check `BETTER_AUTH_URL` matches your backend URL + `/api/auth`
3. Make sure `VITE_BETTER_AUTH_URL` on frontend matches backend auth URL

---

## 📝 FINAL CHECKLIST

- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] Database migrations completed
- [ ] Backend environment variables updated with frontend URL
- [ ] Frontend can connect to backend
- [ ] Auth works (sign up/sign in)
- [ ] Can create and view notes

---

## 🎉 SUCCESS!

Your app should now be live on Vercel!

**Your URLs:**

- Frontend: `https://YOUR-FRONTEND-URL.vercel.app`
- Backend: `https://YOUR-BACKEND-URL.vercel.app`
- Database: Supabase (already configured)

---

## 🔄 FUTURE DEPLOYMENTS

Every time you push to GitHub:

- Vercel will automatically redeploy both projects
- No need to manually deploy again!

To deploy manually:

1. Go to Vercel dashboard
2. Select project
3. Deployments → Redeploy

---

## 💡 TIPS

1. **Use Environment Variables**: Never hardcode URLs
2. **Check Logs**: Vercel → Project → Deployments → View Function Logs
3. **Preview Deployments**: Every PR gets a preview URL automatically
4. **Custom Domains**: Add your own domain in Project Settings → Domains

---

Need help? Check the Vercel logs or ask me!
