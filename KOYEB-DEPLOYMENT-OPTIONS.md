# 🚀 Koyeb Deployment - Two Options

You have two ways to deploy to Koyeb:

---

## ✅ OPTION 1: Buildpack (Recommended - Easier)

### Step 1: Push New Files to GitHub

```bash
git add .
git commit -m "Add Dockerfile and fix configs"
git push origin main
```

### Step 2: In Koyeb Dashboard

1. **Delete failed deployment** (if exists)
2. Click **"Create App"**
3. Select **"GitHub"**
4. Choose **EduCloud-Notes_Pro** repo
5. Branch: **main**

### Step 3: Configure (IMPORTANT!)

#### Builder:

- Select **"Buildpack"** (NOT Docker!)

#### Build Command:

```
npm install && npm run db:generate && npm run db:migrate:deploy && npm run build -- --filter=server
```

#### Run Command:

```
node apps/server/dist/index.js
```

#### Port:

```
3000
```

### Step 4: Environment Variables

Add these:

```
DATABASE_URL = postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres
BETTER_AUTH_SECRET = [random 32+ chars]
PORT = 3000
NODE_ENV = production
```

### Step 5: Deploy!

---

## ✅ OPTION 2: Docker (If Buildpack Fails)

### Step 1: Push Files (Already Done Above)

### Step 2: In Koyeb Dashboard

1. **Delete failed deployment** (if exists)
2. Click **"Create App"**
3. Select **"GitHub"**
4. Choose **EduCloud-Notes_Pro** repo
5. Branch: **main**

### Step 3: Configure

#### Builder:

- Select **"Docker"**

#### Dockerfile Path:

```
Dockerfile
```

(Leave as default, it will find it in root)

#### Port:

```
3000
```

### Step 4: Environment Variables

Add these:

```
DATABASE_URL = postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres
BETTER_AUTH_SECRET = [random 32+ chars]
PORT = 3000
NODE_ENV = production
```

### Step 5: Deploy!

Docker will:

1. Install dependencies
2. Generate Prisma client
3. Build server
4. Run migrations
5. Start server

---

## 🎯 Which Option to Choose?

### Use Buildpack if:

- ✅ You want simpler setup
- ✅ You want faster builds
- ✅ You're familiar with Heroku-style deployments

### Use Docker if:

- ✅ Buildpack keeps failing
- ✅ You want more control
- ✅ You're familiar with Docker

---

## 🔧 Troubleshooting

### Buildpack: "No Procfile found"

Add this to build command:

```
npm install && npm run db:generate && npm run db:migrate:deploy && npm run build -- --filter=server
```

### Docker: "Cannot find module"

Make sure Dockerfile is in root of repo (it is now!)

### Both: "Database connection failed"

Check DATABASE_URL is correct with encoded password: `yordi%400721`

---

## 📝 What to Do Now:

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Add Dockerfile and configs"
   git push origin main
   ```

2. **Go to Koyeb**

3. **Try Option 1 (Buildpack) first**

4. **If it fails, try Option 2 (Docker)**

---

## ✅ Expected Build Time:

- First build: 5-10 minutes
- Subsequent builds: 2-5 minutes

---

**Push to GitHub first, then try deploying again! 🚀**
