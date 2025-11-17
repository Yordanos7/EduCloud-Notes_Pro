# 🚀 Next Step: Deploy to Koyeb

## ✅ What You Have:

- Supabase database created
- Database URL: `postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres`

## 🎯 Now: Deploy Backend to Koyeb

---

## Step 1: Push Your Code to GitHub (if not done)

```bash
cd cloudCB
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## Step 2: Go to Koyeb

1. Open: **https://www.koyeb.com**
2. Click **"Sign up"**
3. Click **"Continue with GitHub"**
4. Authorize Koyeb

---

## Step 3: Create New App

1. Click **"Create App"** button
2. Select **"GitHub"** as deployment method
3. Click **"Connect GitHub account"**
4. Authorize Koyeb to access your repositories
5. Select your **cloudCB** repository
6. Click **"Next"**

---

## Step 4: Configure Build Settings

### Basic Settings:

- **App name:** `cloudcb-server`
- **Region:** Choose closest to you (e.g., Washington, Frankfurt)
- **Instance type:** Keep **"Nano"** (free tier)

### Builder:

- Select **"Buildpack"**

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

---

## Step 5: Add Environment Variables

Click **"Environment variables"** and add these:

### 1. DATABASE_URL

```
Name: DATABASE_URL
Value: postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres
```

### 2. BETTER_AUTH_SECRET

```
Name: BETTER_AUTH_SECRET
Value: [Generate a random 32+ character string]
```

**How to generate:**

- Go to: https://generate-secret.vercel.app/32
- Or use: `openssl rand -base64 32` in terminal
- Or just type any random 32+ characters

Example: `a8f3k2m9p1q7r4s6t8u2v5w9x3y7z1b4c6d8e2f5g9h3`

### 3. PORT

```
Name: PORT
Value: 3000
```

### 4. NODE_ENV

```
Name: NODE_ENV
Value: production
```

**Leave these EMPTY for now (we'll add after deployment):**

- BETTER_AUTH_URL
- CORS_ORIGIN
- WEB_URL

---

## Step 6: Deploy!

1. Click **"Deploy"** button at the bottom
2. Wait for deployment (5-10 minutes)
3. Watch the build logs

You'll see:

- Installing dependencies...
- Generating Prisma client...
- Running database migrations... ← Tables created here!
- Building server...
- Deployment successful!

---

## Step 7: Get Your Backend URL

1. Once deployed (green checkmark ✅)
2. Click on your app
3. You'll see your public URL at the top:
   ```
   https://cloudcb-server-xxxxx.koyeb.app
   ```
4. **COPY THIS URL** and save it!

---

## Step 8: Update Environment Variables

1. Click **"Settings"** tab
2. Click **"Environment variables"**
3. Add these three:

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

4. Click **"Save"**
5. App will redeploy automatically

---

## ✅ Backend Deployed!

Your backend is now live at: `https://cloudcb-server-xxxxx.koyeb.app`

---

## 🎯 Next: Deploy Frontend to Vercel

Continue with **Step 3** in `DEPLOYMENT-KOYEB-SUPABASE-VERCEL.md`

Or open: `DEPLOY-TO-VERCEL.md` (I'll create this next!)

---

## 🆘 Troubleshooting

### Build fails with "Prisma error"

- Check DATABASE_URL is correct
- Make sure password is encoded: `yordi%400721`

### "Cannot connect to database"

- Verify Supabase connection string
- Check if database is active in Supabase

### Build takes too long

- This is normal for first deployment (5-10 minutes)
- It's installing dependencies and running migrations

---

**Ready? Go to koyeb.com and start deploying! 🚀**
