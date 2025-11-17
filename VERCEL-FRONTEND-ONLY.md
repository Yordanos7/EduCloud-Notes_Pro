# 🚀 Deploy Frontend to Vercel (Fix the Error)

## ❌ The Error:

```
cd: apps/web: No such file or directory
```

This happens because Vercel is in the root directory, not inside the monorepo.

---

## ✅ Solution: Configure in Vercel Dashboard

### Step 1: Push vercel.json

```bash
cd cloudCB
git add .
git commit -m "Add Vercel config"
git push origin main
```

### Step 2: In Vercel Dashboard

1. Go to your project settings
2. Click **"General"** → **"Build & Development Settings"**

#### Root Directory:

- Click **"Edit"**
- Select **`apps/web`**
- Click **"Save"**

#### Build Command:

```
npm install && npm run build
```

#### Output Directory:

```
build/client
```

#### Install Command:

```
npm install
```

### Step 3: Add Environment Variables

Go to **"Environment Variables"** and add:

```
VITE_API_URL = http://localhost:3000/api
```

(We'll update this later with real backend URL)

```
VITE_BETTER_AUTH_URL = http://localhost:3000/api/auth
```

(We'll update this later)

### Step 4: Redeploy

Click **"Deployments"** → **"..."** → **"Redeploy"**

---

## 🎯 This Will Deploy Frontend Only

Your frontend will be live, but it will try to connect to localhost for the backend (which won't work yet).

---

## 🔄 Next Steps:

After frontend deploys successfully:

1. **Deploy backend to Glitch** (I'll create guide)
2. **Update Vercel env vars** with Glitch URL
3. **Redeploy frontend**
4. **Everything works!**

---

**Configure Vercel dashboard now and redeploy! 🚀**
