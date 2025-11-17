# 🚀 Deploy EVERYTHING to Vercel (100% Free, No Card!)

Vercel can host both your frontend AND backend! No credit card needed!

---

## ✅ What You Get:

- **Backend API** (Serverless functions)
- **Frontend** (Static site)
- **100% Free** - No credit card!
- **Auto-deploys** from GitHub
- **Works with Prisma!**

---

## 🎯 The Plan:

1. **Database:** Use your Supabase (already set up!)
2. **Backend:** Deploy to Vercel as API routes
3. **Frontend:** Deploy to Vercel as static site

---

## 📋 Step-by-Step:

### STEP 1: Restructure for Vercel (I'll do this for you!)

Vercel needs the backend as API routes in the `api/` folder.

### STEP 2: Push to GitHub

```bash
cd cloudCB
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### STEP 3: Deploy to Vercel

1. Go to: **https://vercel.com**
2. Sign in with GitHub (no card needed!)
3. Click **"Add New..."** → **"Project"**
4. Import your **EduCloud-Notes_Pro** repo
5. Configure (I'll tell you what to enter)
6. Deploy!

---

## 🔧 Vercel Configuration:

### Framework Preset:

- Select **"Other"**

### Root Directory:

- Leave as **"/"** (root)

### Build Command:

```
npm install && npm run db:generate && npm run build
```

### Output Directory:

```
apps/web/build/client
```

### Install Command:

```
npm install
```

---

## 🌍 Environment Variables:

Add these in Vercel:

```
DATABASE_URL = postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres
```

```
BETTER_AUTH_SECRET = [generate random 32+ chars]
```

```
NODE_ENV = production
```

```
VITE_API_URL = https://YOUR-PROJECT.vercel.app/api
```

```
VITE_BETTER_AUTH_URL = https://YOUR-PROJECT.vercel.app/api/auth
```

```
CORS_ORIGIN = https://YOUR-PROJECT.vercel.app
```

```
WEB_URL = https://YOUR-PROJECT.vercel.app
```

```
BETTER_AUTH_URL = https://YOUR-PROJECT.vercel.app/api/auth
```

---

## ⏱️ Total Time: ~15 minutes

- 5 min: Restructure (I'll help)
- 2 min: Push to GitHub
- 5 min: Deploy to Vercel
- 3 min: Add env vars

---

## 💰 Cost: $0 (FREE!)

- Serverless functions: 100GB-hours/month
- Bandwidth: 100GB/month
- Deployments: Unlimited
- No credit card needed!

---

**Want me to restructure your project for Vercel? Say yes and I'll do it! 🚀**
