# Deployment Guide: Railway + Vercel

## Prerequisites

- GitHub account
- Your code pushed to GitHub repository

---

## PART A: Deploy Backend to Railway (15 minutes)

### Step 1: Sign Up for Railway

1. Go to **https://railway.app**
2. Click **"Login"** → **"Login with GitHub"**
3. Authorize Railway to access your GitHub

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your **cloudCB** repository
4. Railway will start analyzing your repo

### Step 3: Add PostgreSQL Database

1. In your project dashboard, click **"New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will create a database and generate connection string
4. Wait for database to be ready (green status)

### Step 4: Configure Server Service

1. Click on your **server service** (the one Railway detected)
2. Go to **"Settings"** tab
3. Scroll to **"Root Directory"** and leave it as `/` (root)
4. Scroll to **"Start Command"** and verify it shows: `node apps/server/dist/index.js`

### Step 5: Set Environment Variables

1. In your server service, click **"Variables"** tab
2. Click **"New Variable"** and add these one by one:

```
DATABASE_URL = ${{Postgres.DATABASE_URL}}
```

(Railway auto-fills this - just type it and select from dropdown)

```
BETTER_AUTH_SECRET = [click "Generate" button or paste any random 32+ character string]
```

```
PORT = 3000
```

```
NODE_ENV = production
```

**IMPORTANT:** Leave these blank for now (we'll fill them after deployment):

- `BETTER_AUTH_URL`
- `CORS_ORIGIN`
- `WEB_URL`

### Step 6: Deploy Backend

1. Click **"Deploy"** button (or it auto-deploys)
2. Watch the build logs - wait for "Build successful"
3. Once deployed, click **"Settings"** → **"Networking"**
4. Click **"Generate Domain"** to get your public URL
5. **COPY THIS URL** - it will look like: `https://cloudcb-server-production.up.railway.app`

### Step 7: Update Environment Variables with URLs

1. Go back to **"Variables"** tab
2. Add/update these variables with your Railway URL:

```
BETTER_AUTH_URL = https://YOUR-RAILWAY-URL.railway.app/api/auth
CORS_ORIGIN = https://YOUR-VERCEL-URL.vercel.app
WEB_URL = https://YOUR-VERCEL-URL.vercel.app
```

(We'll update CORS_ORIGIN and WEB_URL after Vercel deployment)

---

## PART B: Deploy Frontend to Vercel (10 minutes)

### Step 1: Sign Up for Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find and **Import** your **cloudCB** repository
3. Vercel will detect it's a monorepo

### Step 3: Configure Build Settings

1. **Framework Preset:** Select "Other"
2. **Root Directory:** Click "Edit" → Select `apps/web`
3. **Build Command:**
   ```
   npm install && npm run build
   ```
4. **Output Directory:**
   ```
   build/client
   ```
5. **Install Command:**
   ```
   npm install
   ```

### Step 4: Set Environment Variables

Click **"Environment Variables"** and add:

```
VITE_API_URL = https://YOUR-RAILWAY-URL.railway.app/api
```

```
VITE_BETTER_AUTH_URL = https://YOUR-RAILWAY-URL.railway.app/api/auth
```

(Replace YOUR-RAILWAY-URL with the URL you copied from Railway)

### Step 5: Deploy Frontend

1. Click **"Deploy"**
2. Wait for build to complete (3-5 minutes)
3. Once done, Vercel will show your live URL
4. **COPY THIS URL** - it will look like: `https://cloudcb.vercel.app`

---

## PART C: Final Configuration (5 minutes)

### Step 1: Update Railway Environment Variables

1. Go back to **Railway dashboard**
2. Open your **server service**
3. Go to **"Variables"** tab
4. Update these variables with your Vercel URL:

```
CORS_ORIGIN = https://YOUR-VERCEL-URL.vercel.app
WEB_URL = https://YOUR-VERCEL-URL.vercel.app
```

5. Click **"Deploy"** to restart with new variables

### Step 2: Test Your App

1. Open your Vercel URL in browser
2. Try signing up / logging in
3. Create a note
4. Test the share link feature

---

## Troubleshooting

### Backend Issues (Railway)

- **Build fails:** Check build logs in Railway dashboard
- **Database connection error:** Verify DATABASE_URL is set correctly
- **CORS errors:** Make sure CORS_ORIGIN matches your Vercel URL exactly

### Frontend Issues (Vercel)

- **Build fails:** Check build logs in Vercel dashboard
- **API not connecting:** Verify VITE_API_URL points to Railway URL
- **Auth not working:** Check VITE_BETTER_AUTH_URL is correct

### Check Logs

- **Railway:** Click service → "Deployments" → Click latest → "View Logs"
- **Vercel:** Click deployment → "Logs" tab

---

## Environment Variables Summary

### Railway (Backend)

```
DATABASE_URL = ${{Postgres.DATABASE_URL}}
BETTER_AUTH_SECRET = [generated-secret]
BETTER_AUTH_URL = https://YOUR-RAILWAY-URL.railway.app/api/auth
CORS_ORIGIN = https://YOUR-VERCEL-URL.vercel.app
WEB_URL = https://YOUR-VERCEL-URL.vercel.app
PORT = 3000
NODE_ENV = production
```

### Vercel (Frontend)

```
VITE_API_URL = https://YOUR-RAILWAY-URL.railway.app/api
VITE_BETTER_AUTH_URL = https://YOUR-RAILWAY-URL.railway.app/api/auth
```

---

## Auto-Deployment

Both platforms will auto-deploy when you push to GitHub:

- **Railway:** Deploys backend on every push to main branch
- **Vercel:** Deploys frontend on every push to main branch

---

## Cost

- **Railway:** 500 hours/month free (enough for 1 app running 24/7)
- **Vercel:** Unlimited deployments, 100GB bandwidth/month free

Both are completely free for your use case!
