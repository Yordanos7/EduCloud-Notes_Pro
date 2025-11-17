# 🚀 Complete Deployment Guide

## Koyeb (Backend) + Supabase (Database) + Vercel (Frontend)

**Total Time: 30-40 minutes**  
**Cost: 100% FREE - No credit card needed!**

---

## 📦 What We're Deploying:

- **Supabase** → PostgreSQL Database (Step 1)
- **Koyeb** → Node.js Backend API (Step 2)
- **Vercel** → React Frontend (Step 3)

---

# STEP 1: Setup Database on Supabase (10 minutes)

## 1.1 Create Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Click **"Sign in with GitHub"**
4. Authorize Supabase

## 1.2 Create New Project

1. Click **"New project"**
2. Fill in:
   - **Name:** `cloudcb`
   - **Database Password:** Create a strong password (SAVE THIS!)
   - **Region:** Choose closest to you
   - **Pricing Plan:** Free (already selected)
3. Click **"Create new project"**
4. Wait 2-3 minutes for database to be ready

## 1.3 Get Database Connection String

1. Once ready, click **"Project Settings"** (gear icon in sidebar)
2. Click **"Database"** in the left menu
3. Scroll down to **"Connection string"**
4. Select **"URI"** tab
5. Copy the connection string - it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. **IMPORTANT:** Replace `[YOUR-PASSWORD]` with the password you created
7. **SAVE THIS STRING** - you'll need it for Koyeb

Example:

```
postgresql://postgres:MyPassword123@db.abcdefgh.supabase.co:5432/postgres
```

## 1.4 Enable Connection Pooling (Important!)

1. Still in Database settings, scroll to **"Connection pooling"**
2. Copy the **"Connection string"** in **"Transaction"** mode
3. This is your **DATABASE_URL** - it looks like:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
4. **SAVE THIS** - use this one for Koyeb!

✅ **Supabase Setup Complete!**

---

# STEP 2: Deploy Backend to Koyeb (15 minutes)

## 2.1 Create Koyeb Account

1. Go to **https://www.koyeb.com**
2. Click **"Sign up"**
3. Click **"Continue with GitHub"**
4. Authorize Koyeb

## 2.2 Create New App

1. Click **"Create App"** button
2. Select **"GitHub"** as deployment method
3. Click **"Connect GitHub account"**
4. Authorize Koyeb to access your repositories

## 2.3 Configure Repository

1. Select your **cloudCb** repository
2. Click **"Next"**

## 2.4 Configure Build Settings

1. **App name:** `cloudcb-server`
2. **Region:** Choose closest to you
3. **Instance type:** Keep "Nano" (free tier)
4. **Builder:** Select "Buildpack"

### Build Configuration:

- **Build command:**

  ```
  chmod +x build.sh && ./build.sh
  ```

- **Run command:**

  ```
  node apps/server/dist/index.js
  ```

- **Port:** `3000`

## 2.5 Add Environment Variables

Click **"Environment variables"** and add these:

### Variable 1:

```
Name: DATABASE_URL
Value: [Paste your Supabase connection string from Step 1.4]
```

### Variable 2:

```
Name: BETTER_AUTH_SECRET
Value: [Generate a random 32+ character string]
```

You can generate one here: https://generate-secret.vercel.app/32
Or use: `openssl rand -base64 32` in terminal

### Variable 3:

```
Name: PORT
Value: 3000
```

### Variable 4:

```
Name: NODE_ENV
Value: production
```

**Leave these EMPTY for now (we'll add them later):**

- `BETTER_AUTH_URL`
- `CORS_ORIGIN`
- `WEB_URL`

## 2.6 Deploy Backend

1. Click **"Deploy"** button at the bottom
2. Wait for deployment (5-10 minutes)
3. Watch the build logs - you'll see:
   - Installing dependencies
   - Generating Prisma client
   - Running migrations
   - Building server

## 2.7 Get Your Backend URL

1. Once deployed (green checkmark), click on your app
2. You'll see your public URL at the top:
   ```
   https://cloudcb-server-xxxxx.koyeb.app
   ```
3. **COPY THIS URL** and save it!

## 2.8 Update Environment Variables

1. Click **"Settings"** tab
2. Click **"Environment variables"**
3. Add these three variables:

```
Name: BETTER_AUTH_URL
Value: https://YOUR-KOYEB-URL.koyeb.app/api/auth
```

```
Name: CORS_ORIGIN
Value: https://YOUR-VERCEL-URL.vercel.app
```

(We'll update this after Vercel deployment)

```
Name: WEB_URL
Value: https://YOUR-VERCEL-URL.vercel.app
```

(We'll update this after Vercel deployment)

4. Click **"Save"** - app will redeploy automatically

✅ **Backend Deployed on Koyeb!**

---

# STEP 3: Deploy Frontend to Vercel (10 minutes)

## 3.1 Create Vercel Account

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel

## 3.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your **cloudCB** repository
3. Click **"Import"**

## 3.3 Configure Project Settings

Vercel will show configuration screen:

### Framework Preset:

- Select **"Other"**

### Root Directory:

- Click **"Edit"**
- Select **`apps/web`**
- Click **"Continue"**

### Build and Output Settings:

- **Build Command:**

  ```
  npm install && npm run build
  ```

- **Output Directory:**

  ```
  build/client
  ```

- **Install Command:**
  ```
  npm install
  ```

## 3.4 Add Environment Variables

Click **"Environment Variables"** section and add:

### Variable 1:

```
Name: VITE_API_URL
Value: https://YOUR-KOYEB-URL.koyeb.app/api
```

(Use the Koyeb URL from Step 2.7)

### Variable 2:

```
Name: VITE_BETTER_AUTH_URL
Value: https://YOUR-KOYEB-URL.koyeb.app/api/auth
```

(Use the Koyeb URL from Step 2.7)

## 3.5 Deploy Frontend

1. Click **"Deploy"** button
2. Wait for build (3-5 minutes)
3. Vercel will show build progress

## 3.6 Get Your Frontend URL

1. Once deployed, Vercel shows your live URL:
   ```
   https://cloudcb.vercel.app
   ```
   (or similar)
2. **COPY THIS URL** and save it!

✅ **Frontend Deployed on Vercel!**

---

# STEP 4: Final Configuration (5 minutes)

## 4.1 Update Koyeb Environment Variables

Now we need to tell the backend about the frontend URL:

1. Go back to **Koyeb dashboard**
2. Click on your **cloudcb-server** app
3. Click **"Settings"** → **"Environment variables"**
4. Update these two variables:

```
CORS_ORIGIN = https://YOUR-VERCEL-URL.vercel.app
```

(Use the Vercel URL from Step 3.6)

```
WEB_URL = https://YOUR-VERCEL-URL.vercel.app
```

(Same URL)

5. Click **"Save"**
6. App will redeploy automatically (takes 2-3 minutes)

## 4.2 Test Your App! 🎉

1. Open your Vercel URL in browser
2. You should see your app homepage
3. Try to **Sign Up** with a new account
4. Try to **Create a note**
5. Try to **Share a note** - the link should work!

---

# 📝 Summary - Your URLs

Write these down:

```
Frontend (Vercel): https://cloudcb.vercel.app
Backend (Koyeb):   https://cloudcb-server-xxxxx.koyeb.app
Database (Supabase): [Connection string saved]
```

---

# 🔧 Troubleshooting

## Backend Issues (Koyeb)

### Build fails with "Prisma error"

1. Go to Koyeb → Your app → Settings → Environment variables
2. Make sure `DATABASE_URL` is correct
3. Redeploy

### "Cannot connect to database"

1. Check your Supabase connection string
2. Make sure you used the **Connection Pooling** URL (Step 1.4)
3. Verify password is correct (no brackets)

### CORS errors in browser console

1. Go to Koyeb → Settings → Environment variables
2. Make sure `CORS_ORIGIN` exactly matches your Vercel URL
3. No trailing slash!

## Frontend Issues (Vercel)

### Build fails

1. Check Vercel build logs
2. Make sure Root Directory is set to `apps/web`
3. Verify build command is correct

### "Failed to fetch" errors

1. Check browser console for the API URL
2. Go to Vercel → Settings → Environment Variables
3. Make sure `VITE_API_URL` points to your Koyeb URL
4. Redeploy

### Auth not working

1. Check `VITE_BETTER_AUTH_URL` in Vercel
2. Should be: `https://YOUR-KOYEB-URL.koyeb.app/api/auth`
3. Redeploy if you change it

## Database Issues (Supabase)

### "Too many connections"

1. Make sure you're using the **Connection Pooling** URL
2. In Supabase → Settings → Database → Connection pooling
3. Use the Transaction mode URL

---

# 🔄 Auto-Deployment

Both platforms auto-deploy when you push to GitHub:

- **Koyeb:** Watches your main branch
- **Vercel:** Watches your main branch

Just push your code and both will update automatically!

---

# 💰 Free Tier Limits

### Supabase Free:

- 500MB database
- 2GB bandwidth/month
- Unlimited API requests

### Koyeb Free:

- 1 web service
- 512MB RAM
- 2GB disk
- Unlimited bandwidth

### Vercel Free:

- Unlimited deployments
- 100GB bandwidth/month
- Unlimited projects

**All perfect for your app!**

---

# ✅ Checklist

Before you start, make sure:

- [ ] Code is pushed to GitHub
- [ ] You have a GitHub account
- [ ] You have 30-40 minutes

Then follow:

- [ ] Step 1: Supabase (Database)
- [ ] Step 2: Koyeb (Backend)
- [ ] Step 3: Vercel (Frontend)
- [ ] Step 4: Final Config
- [ ] Test your app!

---

# 🆘 Need Help?

If you get stuck:

1. Check the Troubleshooting section above
2. Check build logs in Koyeb/Vercel
3. Verify all environment variables are correct
4. Make sure URLs don't have trailing slashes

---

**You're all set! Follow the steps in order and you'll have your app live in 30-40 minutes! 🚀**
