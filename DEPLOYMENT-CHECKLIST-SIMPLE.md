# Simple Deployment Checklist ✅

## Before You Start

- [ ] Have your Supabase database URL ready
- [ ] Have your GitHub repository pushed with latest changes
- [ ] Have Vercel account ready

---

## Deploy Backend (Do This First!)

### Create Project

- [ ] Go to https://vercel.com/new
- [ ] Import your GitHub repo
- [ ] Set **Root Directory**: `apps/server`
- [ ] Set **Project Name**: `edu-cloud-notes-pro-server`
- [ ] Set **Build Command**: `npm run build`
- [ ] Click "Deploy" (it will fail first time - that's OK!)

### Add Environment Variables

- [ ] Go to Project Settings → Environment Variables
- [ ] Copy from `BACKEND-ENV-TEMPLATE.txt`
- [ ] Replace with your actual values:
  - [ ] DATABASE_URL (from Supabase)
  - [ ] BETTER_AUTH_SECRET (generate with: `openssl rand -base64 32`)
  - [ ] BETTER_AUTH_URL (use your backend URL)
  - [ ] CORS_ORIGIN (use your frontend URL - you'll update this later)
  - [ ] WEB_URL (use your frontend URL - you'll update this later)

### Redeploy Backend

- [ ] Go to Deployments tab
- [ ] Click "Redeploy" on latest deployment
- [ ] Wait for success
- [ ] **Copy your backend URL**: `https://edu-cloud-notes-pro-server.vercel.app`

---

## Deploy Frontend (Do This Second!)

### Create Project

- [ ] Go to https://vercel.com/new
- [ ] Import the SAME GitHub repo
- [ ] Set **Root Directory**: `apps/web`
- [ ] Set **Project Name**: `edu-cloud-notes-pro-web`
- [ ] Set **Framework Preset**: Remix
- [ ] Set **Build Command**: `npm run build`
- [ ] Set **Output Directory**: `build/client`
- [ ] Click "Deploy" (it will fail first time - that's OK!)

### Add Environment Variables

- [ ] Go to Project Settings → Environment Variables
- [ ] Copy from `FRONTEND-ENV-TEMPLATE.txt`
- [ ] Replace with your actual backend URL from previous step:
  - [ ] VITE_API_URL
  - [ ] VITE_BETTER_AUTH_URL

### Redeploy Frontend

- [ ] Go to Deployments tab
- [ ] Click "Redeploy" on latest deployment
- [ ] Wait for success
- [ ] **Copy your frontend URL**: `https://edu-cloud-notes-pro-web.vercel.app`

---

## Update Backend CORS (Do This Third!)

- [ ] Go back to **backend** Vercel project
- [ ] Settings → Environment Variables
- [ ] Update `CORS_ORIGIN` with your actual frontend URL
- [ ] Update `WEB_URL` with your actual frontend URL
- [ ] Go to Deployments tab
- [ ] Click "Redeploy"
- [ ] Wait for success

---

## Test Your App! 🎉

- [ ] Open your frontend URL
- [ ] Try to sign up with a new account
- [ ] Check if login works
- [ ] Create a note
- [ ] Everything working? You're done! 🎊

---

## If You Get CORS Errors

1. [ ] Check backend logs in Vercel
2. [ ] Verify all environment variables are correct
3. [ ] Make sure both projects were redeployed after adding env vars
4. [ ] Hard refresh browser (Ctrl+Shift+R)
5. [ ] Check browser console for exact error message

---

## Your URLs (Fill These In)

**Backend URL**: `https://_____________________.vercel.app`

**Frontend URL**: `https://_____________________.vercel.app`

**Database URL**: `postgresql://postgres.xxxxx:password@aws-0-region.pooler.supabase.com:6543/postgres`
