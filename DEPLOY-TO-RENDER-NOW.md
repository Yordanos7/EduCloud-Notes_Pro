# 🚀 DEPLOY TO RENDER - SIMPLE GUIDE

## ✅ WHY RENDER IS EASIER

- ✅ Better monorepo support
- ✅ Simpler configuration
- ✅ Free tier (no credit card needed)
- ✅ Automatic deployments from GitHub
- ✅ Built-in database support

---

## 🎯 STEP-BY-STEP DEPLOYMENT

### STEP 1: Create Render Account (2 minutes)

1. Go to https://render.com
2. Click **"Get Started"**
3. Sign up with GitHub (easiest)
4. Authorize Render to access your GitHub

---

### STEP 2: Deploy Backend (5 minutes)

1. Click **"New +"** → **"Web Service"**

2. Connect your GitHub repository:
   - Find **"EduCloud-Notes_Pro"**
   - Click **"Connect"**

3. Configure the service:

**Name:**

```
cloudcb-backend
```

**Region:**

```
Oregon (US West) or Frankfurt (EU Central) - pick closest to you
```

**Branch:**

```
main
```

**Root Directory:**

```
apps/server
```

**Runtime:**

```
Node
```

**Build Command:**

```
cd ../.. && npm install && npm run db:generate && npm run build && cd apps/server && npm run build
```

**Start Command:**

```
node dist/index.js
```

**Instance Type:**

```
Free
```

4. Click **"Advanced"** and add environment variables:

```
DATABASE_URL=postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres

BETTER_AUTH_SECRET=gFIZh8I5hRaHUzfu4CTxAcc8TaSTFs73uTI6W9cUtGg=

BETTER_AUTH_URL=https://YOUR-BACKEND-URL.onrender.com/api/auth

CORS_ORIGIN=https://YOUR-FRONTEND-URL.onrender.com

WEB_URL=https://YOUR-FRONTEND-URL.onrender.com

PORT=3000

NODE_ENV=production
```

⚠️ **Note**: Use placeholder URLs for now, we'll update them after deployment

5. Click **"Create Web Service"**

6. Wait 5-10 minutes for the build (first build is slower)

7. **Copy your backend URL** (e.g., `https://cloudcb-backend.onrender.com`)

---

### STEP 3: Deploy Frontend (5 minutes)

1. Click **"New +"** → **"Static Site"**

2. Connect your repository again

3. Configure:

**Name:**

```
cloudcb-frontend
```

**Branch:**

```
main
```

**Root Directory:**

```
apps/web
```

**Build Command:**

```
cd ../.. && npm install && npm run build && cd apps/web && npm run build
```

**Publish Directory:**

```
build/client
```

4. Add environment variables:

```
VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api

VITE_BETTER_AUTH_URL=https://YOUR-BACKEND-URL.onrender.com/api/auth
```

⚠️ Replace `YOUR-BACKEND-URL` with your actual backend URL from Step 2

5. Click **"Create Static Site"**

6. Wait 5-10 minutes for build

7. **Copy your frontend URL** (e.g., `https://cloudcb-frontend.onrender.com`)

---

### STEP 4: Update Backend URLs (2 minutes)

1. Go to your **backend service** on Render

2. Click **"Environment"** in the left sidebar

3. Update these 3 variables with your actual frontend URL:
   - `BETTER_AUTH_URL` → `https://YOUR-ACTUAL-BACKEND-URL.onrender.com/api/auth`
   - `CORS_ORIGIN` → `https://YOUR-ACTUAL-FRONTEND-URL.onrender.com`
   - `WEB_URL` → `https://YOUR-ACTUAL-FRONTEND-URL.onrender.com`

4. Click **"Save Changes"**

5. Render will automatically redeploy

---

### STEP 5: Setup Database (2 minutes)

Run this locally (one time only):

```bash
cd cloudCB
export DATABASE_URL="postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres"
npm run db:generate
npm run db:push
```

This creates all the tables in your Supabase database.

---

### STEP 6: Test Your App (2 minutes)

1. Open your frontend URL: `https://YOUR-FRONTEND-URL.onrender.com`
2. Sign up with email
3. Create a note
4. Success! 🎉

---

## ✅ ADVANTAGES OF RENDER

- **Automatic Deploys**: Every git push triggers a new deployment
- **Free SSL**: HTTPS automatically configured
- **Logs**: Easy to view logs in the dashboard
- **No Cold Starts**: Unlike Vercel serverless, Render keeps your app running
- **Simple**: No complex configuration needed

---

## 🐛 TROUBLESHOOTING

### Build Fails

**Check the logs:**

1. Go to your service
2. Click on the failed deployment
3. Read the build logs

**Common issues:**

- Missing environment variables
- Wrong root directory
- Build command incorrect

### App Not Loading

**Check:**

1. Backend is running (visit backend URL, should see `{"status":"OK"}`)
2. Frontend environment variables have correct backend URL
3. Backend CORS_ORIGIN matches frontend URL exactly

### Database Errors

**Make sure:**

1. You ran `npm run db:push` locally
2. DATABASE_URL is correct in backend environment variables
3. Supabase database is running

---

## 💰 COST

**100% FREE!**

Render free tier includes:

- ✅ 750 hours/month (enough for 1 app running 24/7)
- ✅ Automatic SSL
- ✅ Custom domains
- ✅ Automatic deploys

---

## 🔄 FUTURE DEPLOYMENTS

After initial setup:

- **Automatic**: Push to GitHub → Render auto-deploys
- **Manual**: Click "Manual Deploy" → "Deploy latest commit"

---

## 📝 FINAL CHECKLIST

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] Backend environment variables updated with frontend URL
- [ ] Database tables created (ran `npm run db:push`)
- [ ] Can sign up and create notes

---

## 🎉 YOU'RE DONE!

Your app is now live on Render!

**Your URLs:**

- Backend: `https://cloudcb-backend.onrender.com`
- Frontend: `https://cloudcb-frontend.onrender.com`

---

**Much easier than Vercel, right? 😊**
