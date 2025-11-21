# ✅ DEPLOY TO VERCEL NOW - QUICK CHECKLIST

## 🎯 BEFORE YOU START

- [ ] Code is pushed to GitHub
- [ ] You have a Vercel account (free tier is fine)
- [ ] Supabase database is running

---

## 📦 STEP 1: DEPLOY BACKEND (15 minutes)

### 1.1 Create Project

- [ ] Go to https://vercel.com/new
- [ ] Import your GitHub repo
- [ ] Project name: `cloudcb-backend`

### 1.2 Configure Build

- [ ] Root Directory: `apps/server`
- [ ] Framework: Other
- [ ] Build Command: `cd ../.. && npm install && npm run build && cd apps/server && npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `cd ../.. && npm install`

### 1.3 Add Environment Variables

Copy from `VERCEL-ENV-VARS-READY.md`:

- [ ] DATABASE_URL
- [ ] BETTER_AUTH_SECRET
- [ ] BETTER_AUTH_URL (use placeholder for now)
- [ ] CORS_ORIGIN (use placeholder for now)
- [ ] WEB_URL (use placeholder for now)
- [ ] PORT

### 1.4 Deploy

- [ ] Click "Deploy"
- [ ] Wait for build (2-5 min)
- [ ] **COPY YOUR BACKEND URL** → `https://______.vercel.app`

### 1.5 Update Backend URLs

- [ ] Go to Settings → Environment Variables
- [ ] Update `BETTER_AUTH_URL` with your backend URL + `/api/auth`
- [ ] Redeploy (Deployments → ... → Redeploy)

---

## 🎨 STEP 2: DEPLOY FRONTEND (15 minutes)

### 2.1 Create Project

- [ ] Go to https://vercel.com/new
- [ ] Import **same GitHub repo**
- [ ] Project name: `cloudcb-frontend`

### 2.2 Configure Build

- [ ] Root Directory: `apps/web`
- [ ] Framework: Vite
- [ ] Build Command: `cd ../.. && npm install && npm run build && cd apps/web && npm run build`
- [ ] Output Directory: `build/client`
- [ ] Install Command: `cd ../.. && npm install`

### 2.3 Add Environment Variables

Use your **actual backend URL** from Step 1.4:

- [ ] VITE_API_URL → `https://YOUR-BACKEND-URL.vercel.app/api`
- [ ] VITE_BETTER_AUTH_URL → `https://YOUR-BACKEND-URL.vercel.app/api/auth`

### 2.4 Deploy

- [ ] Click "Deploy"
- [ ] Wait for build (2-5 min)
- [ ] **COPY YOUR FRONTEND URL** → `https://______.vercel.app`

---

## 🔄 STEP 3: CONNECT FRONTEND TO BACKEND (5 minutes)

### 3.1 Update Backend with Frontend URL

- [ ] Go to backend project on Vercel
- [ ] Settings → Environment Variables
- [ ] Update `CORS_ORIGIN` → Your frontend URL
- [ ] Update `WEB_URL` → Your frontend URL
- [ ] Redeploy backend

---

## 🗄️ STEP 4: SETUP DATABASE (5 minutes)

Run locally to create tables:

```bash
cd cloudCB
export DATABASE_URL="postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres"
npm run db:generate
npm run db:push
```

- [ ] Database tables created

---

## ✅ STEP 5: TEST (5 minutes)

- [ ] Open frontend URL
- [ ] Sign up with email
- [ ] Sign in
- [ ] Create a note
- [ ] Edit the note
- [ ] Everything works! 🎉

---

## 🐛 IF SOMETHING FAILS

### Backend Build Fails

→ Check `VERCEL-MONOREPO-FIX.md`

### Frontend Build Fails

→ Check `VERCEL-MONOREPO-FIX.md`

### CORS Errors

→ Verify URLs match exactly (no trailing slashes)

### Auth Not Working

→ Check `BETTER_AUTH_URL` and `VITE_BETTER_AUTH_URL` match

### Database Errors

→ Run `npm run db:push` locally

---

## 📝 YOUR DEPLOYMENT URLS

Fill these in as you deploy:

**Backend URL**: `https://________________________________.vercel.app`

**Frontend URL**: `https://________________________________.vercel.app`

**Database**: `db.lvemllffjyhxeziucakd.supabase.co` ✅

---

## 🎉 DONE!

Total time: ~45 minutes

Your app is now live on Vercel!

---

## 📚 DETAILED GUIDES

- Full guide: `VERCEL-DEPLOYMENT-COMPLETE-GUIDE.md`
- Environment variables: `VERCEL-ENV-VARS-READY.md`
- Build issues: `VERCEL-MONOREPO-FIX.md`

---

**Ready? Let's deploy! 🚀**

Start with Step 1 above, or follow the complete guide.
