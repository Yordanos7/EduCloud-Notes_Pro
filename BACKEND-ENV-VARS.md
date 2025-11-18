# 🔧 Backend Environment Variables

## Go to Backend Project in Vercel:

1. Open Vercel dashboard
2. Click on **"edu-cloud-notes-pro-server"** project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left menu

---

## Add These Variables:

### 1. DATABASE_URL

```
postgresql://postgres:yordi%400721@db.lvemllffjyhxeziucakd.supabase.co:5432/postgres
```

### 2. BETTER_AUTH_SECRET

```
a8f3k2m9p1q7r4s6t8u2v5w9x3y7z1b4c6d8e2f5g9h3
```

(Or generate your own random 32+ character string)

### 3. BETTER_AUTH_URL

```
https://edu-cloud-notes-pro-server-qdxn.vercel.app/api/auth
```

### 4. CORS_ORIGIN

```
https://edu-cloud-notes-pro-web.vercel.app
```

### 5. WEB_URL

```
https://edu-cloud-notes-pro-web.vercel.app
```

### 6. NODE_ENV

```
production
```

### 7. PORT

```
3000
```

---

## How to Add Each Variable:

1. Click **"Add New"** button
2. Enter **Name** (e.g., `DATABASE_URL`)
3. Enter **Value** (copy from above)
4. Select **"Production"**, **"Preview"**, and **"Development"** (all three)
5. Click **"Save"**
6. Repeat for all 7 variables

---

## After Adding All Variables:

1. Click **"Deployments"** tab
2. Find the latest deployment
3. Click **"..."** (three dots)
4. Click **"Redeploy"**
5. Wait 2-3 minutes

---

**Add all 7 variables, then redeploy! 🚀**
