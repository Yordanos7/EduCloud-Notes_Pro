# 🚀 Deploy Backend to Vercel

## ✅ Backend is Ready!

I've created `apps/server/vercel.json` for you.

---

## 📋 Steps to Deploy Backend:

### 1. Push to GitHub

```bash
cd cloudCB
git add .
git commit -m "Prepare backend for Vercel"
git push origin main
```

### 2. Create New Vercel Project for Backend

1. Go to: **https://vercel.com**
2. Click **"Add New..."** → **"Project"**
3. Select your **EduCloud-Notes_Pro** repository again
4. This time configure it for backend:

---

## 🔧 Vercel Backend Configuration:

### Root Directory:

- Click **"Edit"**
- Select **`apps/server`**

### Build Command:

```
npm install && npm run build
```

### Output Directory:

```
dist
```

### Install Command:

```
npm install
```

---

## 🌍 Environment Variables for Backend:

Add these in Vercel:

```
DATABASE_URL = postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres
```

```
BETTER_AUTH_SECRET = a8f3k2m9p1q7r4s6t8u2v5w9x3y7z1b4c6d8e2f5g9h3
```

(Or generate your own random 32+ character string)

```
NODE_ENV = production
```

```
PORT = 3000
```

Leave these empty for now (we'll fill after both are deployed):

- `BETTER_AUTH_URL`
- `CORS_ORIGIN`
- `WEB_URL`

---

## 🎯 After Both Deploy:

### Step 1: Get URLs

- Frontend URL: `https://educloud-notes-pro.vercel.app`
- Backend URL: `https://educloud-notes-pro-server.vercel.app`

### Step 2: Update Backend Env Vars

Go to backend project → Environment Variables:

```
BETTER_AUTH_URL = https://YOUR-BACKEND-URL.vercel.app/api/auth
CORS_ORIGIN = https://YOUR-FRONTEND-URL.vercel.app
WEB_URL = https://YOUR-FRONTEND-URL.vercel.app
```

### Step 3: Update Frontend Env Vars

Go to frontend project → Environment Variables:

```
VITE_API_URL = https://YOUR-BACKEND-URL.vercel.app/api
VITE_BETTER_AUTH_URL = https://YOUR-BACKEND-URL.vercel.app/api/auth
```

### Step 4: Redeploy Both

- Redeploy backend
- Redeploy frontend
- Done!

---

## ✅ Summary:

1. Push code to GitHub
2. Deploy frontend (root: `apps/web`)
3. Deploy backend (root: `apps/server`)
4. Update environment variables
5. Redeploy both
6. Test!

---

**Push to GitHub now, then deploy both projects! 🚀**
