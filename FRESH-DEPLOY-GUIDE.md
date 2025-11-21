# Fresh Deployment Guide - Backend + Frontend on Vercel

## Overview

You'll deploy TWO separate Vercel projects:

1. **Backend** (Express API server)
2. **Frontend** (React/Remix web app)

---

## STEP 1: Deploy Backend First

### 1.1 Create Backend Project on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. **Root Directory**: `apps/server`
4. **Project Name**: `edu-cloud-notes-pro-server` (or any name you want)
5. **Framework Preset**: Other
6. **Build Command**: `npm run build`
7. **Output Directory**: Leave empty
8. **Install Command**: `npm install`

### 1.2 Add Backend Environment Variables

In Vercel project settings → Environment Variables, add these:

```
DATABASE_URL=your_supabase_postgres_url
BETTER_AUTH_SECRET=generate_random_32_char_string
BETTER_AUTH_URL=https://edu-cloud-notes-pro-server.vercel.app/api/auth
CORS_ORIGIN=https://edu-cloud-notes-pro-web.vercel.app
WEB_URL=https://edu-cloud-notes-pro-web.vercel.app
PORT=3000
```

**Important Notes:**

- Replace `your_supabase_postgres_url` with your actual Supabase database URL
- Generate `BETTER_AUTH_SECRET` using: `openssl rand -base64 32`
- Use your actual backend domain for `BETTER_AUTH_URL`
- Use your actual frontend domain for `CORS_ORIGIN` and `WEB_URL`

### 1.3 Deploy Backend

Click "Deploy" and wait for it to finish.

**Your backend URL will be**: `https://edu-cloud-notes-pro-server.vercel.app`

---

## STEP 2: Deploy Frontend

### 2.1 Create Frontend Project on Vercel

1. Go to https://vercel.com/new
2. Import the SAME GitHub repository
3. **Root Directory**: `apps/web`
4. **Project Name**: `edu-cloud-notes-pro-web` (or any name you want)
5. **Framework Preset**: Remix
6. **Build Command**: `npm run build`
7. **Output Directory**: `build/client`
8. **Install Command**: `npm install`

### 2.2 Add Frontend Environment Variables

In Vercel project settings → Environment Variables, add these:

```
VITE_API_URL=https://edu-cloud-notes-pro-server.vercel.app/api
VITE_BETTER_AUTH_URL=https://edu-cloud-notes-pro-server.vercel.app/api/auth
```

**Important**: Replace with your actual backend URL from Step 1.3

### 2.3 Deploy Frontend

Click "Deploy" and wait for it to finish.

**Your frontend URL will be**: `https://edu-cloud-notes-pro-web.vercel.app`

---

## STEP 3: Update Backend CORS Settings

After frontend is deployed, you need to update the backend environment variables:

1. Go to your **backend** Vercel project
2. Settings → Environment Variables
3. Update these variables with your actual frontend URL:
   ```
   CORS_ORIGIN=https://edu-cloud-notes-pro-web.vercel.app
   WEB_URL=https://edu-cloud-notes-pro-web.vercel.app
   ```
4. Go to Deployments tab
5. Click "Redeploy" on the latest deployment

---

## STEP 4: Test Your Deployment

1. Open your frontend URL: `https://edu-cloud-notes-pro-web.vercel.app`
2. Try to sign up with a new account
3. If CORS errors appear, check:
   - Backend environment variables are correct
   - Frontend environment variables are correct
   - Both projects have been redeployed after setting env vars

---

## Troubleshooting CORS Issues

If you still get CORS errors:

1. **Check Backend Logs**:
   - Go to backend Vercel project → Deployments → Click latest → View Function Logs
   - Look for any errors

2. **Verify Environment Variables**:
   - Backend `CORS_ORIGIN` must match frontend URL exactly
   - Frontend `VITE_API_URL` must match backend URL exactly

3. **Clear Browser Cache**:
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or open in incognito/private window

4. **Check Network Tab**:
   - Open browser DevTools → Network tab
   - Look at the OPTIONS request (preflight)
   - Check if `Access-Control-Allow-Origin` header is present in response

---

## Quick Reference - Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://user:pass@host:5432/db
BETTER_AUTH_SECRET=your_32_char_random_string
BETTER_AUTH_URL=https://your-backend.vercel.app/api/auth
CORS_ORIGIN=https://your-frontend.vercel.app
WEB_URL=https://your-frontend.vercel.app
PORT=3000
```

### Frontend (.env)

```env
VITE_API_URL=https://your-backend.vercel.app/api
VITE_BETTER_AUTH_URL=https://your-backend.vercel.app/api/auth
```

---

## Important Notes

1. **Always deploy backend FIRST**, then frontend
2. **After getting frontend URL**, update backend CORS settings and redeploy
3. **Preview deployments** will work automatically (code already handles `*.vercel.app` domains)
4. **Database migrations**: Run `npx prisma migrate deploy` in backend before first deployment
5. **Secrets**: Never commit `.env` files to git

---

## Need Help?

Common issues:

- **CORS errors**: Backend CORS_ORIGIN doesn't match frontend URL
- **Auth errors**: BETTER_AUTH_URL is incorrect
- **Database errors**: DATABASE_URL is wrong or database not accessible
- **Build errors**: Missing dependencies or wrong build command
