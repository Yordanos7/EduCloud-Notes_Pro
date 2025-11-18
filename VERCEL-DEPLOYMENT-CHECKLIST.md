# ✅ Vercel Deployment Checklist

## Step 1: Push Code

```bash
cd cloudCB
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

---

## Step 2: Deploy Frontend

### In Vercel:

- [ ] New Project
- [ ] Select repo: EduCloud-Notes_Pro
- [ ] Root Directory: `apps/web`
- [ ] Build Command: `npm install && npm run build`
- [ ] Output Directory: `build/client`
- [ ] Add env vars:
  - `VITE_API_URL = http://localhost:3000/api` (temporary)
  - `VITE_BETTER_AUTH_URL = http://localhost:3000/api/auth` (temporary)
- [ ] Deploy
- [ ] Copy frontend URL

---

## Step 3: Deploy Backend

### In Vercel (New Project):

- [ ] New Project (again)
- [ ] Select repo: EduCloud-Notes_Pro (same repo)
- [ ] Root Directory: `apps/server`
- [ ] Build Command: `npm install && npm run build`
- [ ] Output Directory: `dist`
- [ ] Add env vars:
  - `DATABASE_URL = postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres`
  - `BETTER_AUTH_SECRET = a8f3k2m9p1q7r4s6t8u2v5w9x3y7z1b4c6d8e2f5g9h3`
  - `NODE_ENV = production`
  - `PORT = 3000`
- [ ] Deploy
- [ ] Copy backend URL

---

## Step 4: Connect Them

### Update Backend Env Vars:

- [ ] `BETTER_AUTH_URL = [backend URL]/api/auth`
- [ ] `CORS_ORIGIN = [frontend URL]`
- [ ] `WEB_URL = [frontend URL]`
- [ ] Redeploy backend

### Update Frontend Env Vars:

- [ ] `VITE_API_URL = [backend URL]/api`
- [ ] `VITE_BETTER_AUTH_URL = [backend URL]/api/auth`
- [ ] Redeploy frontend

---

## Step 5: Test!

- [ ] Open frontend URL
- [ ] Sign up
- [ ] Create note
- [ ] Share note
- [ ] ✅ Done!

---

**Total time: ~30 minutes**
