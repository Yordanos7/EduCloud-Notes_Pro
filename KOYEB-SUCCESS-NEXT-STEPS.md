# 🎉 Koyeb Deployed Successfully!

## ✅ Your Backend URL:

```
https://severe-sunny-yalegn-bca3d23e.koyeb.app
```

---

## 🔧 Fix the Websocket Error

### Step 1: Add Missing Environment Variables

1. In Koyeb dashboard, click on your service
2. Go to **"Settings"** tab
3. Click **"Environment variables"**
4. Add these three variables:

#### Variable 1: BETTER_AUTH_URL

```
Name: BETTER_AUTH_URL
Value: https://severe-sunny-yalegn-bca3d23e.koyeb.app/api/auth
```

#### Variable 2: CORS_ORIGIN

```
Name: CORS_ORIGIN
Value: http://localhost:5173
```

(We'll update this after Vercel deployment)

#### Variable 3: WEB_URL

```
Name: WEB_URL
Value: http://localhost:5173
```

(We'll update this after Vercel deployment)

5. Click **"Save"**
6. Service will redeploy automatically (2-3 minutes)

---

## ✅ Test Your Backend

Once redeployed, test it:

1. Open: `https://severe-sunny-yalegn-bca3d23e.koyeb.app`
2. You should see: `{"status":"OK","message":"CloudCB API Server"}`

If you see that, your backend is working! 🎉

---

## 🎯 Next: Deploy Frontend to Vercel

Now that backend is ready, let's deploy the frontend!

### Step 1: Go to Vercel

1. Open: https://vercel.com
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**

### Step 2: Import Project

1. Find **EduCloud-Notes_Pro** repository
2. Click **"Import"**

### Step 3: Configure Project

#### Framework Preset:

- Select **"Other"**

#### Root Directory:

- Click **"Edit"**
- Select **`apps/web`**
- Click **"Continue"**

#### Build Settings:

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

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

#### Variable 1:

```
Name: VITE_API_URL
Value: https://severe-sunny-yalegn-bca3d23e.koyeb.app/api
```

#### Variable 2:

```
Name: VITE_BETTER_AUTH_URL
Value: https://severe-sunny-yalegn-bca3d23e.koyeb.app/api/auth
```

### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 3-5 minutes
3. Copy your Vercel URL

---

## 🔄 Final Step: Update Koyeb with Vercel URL

Once you have your Vercel URL (like `https://cloudcb.vercel.app`):

1. Go back to Koyeb
2. Settings → Environment variables
3. Update:
   - `CORS_ORIGIN` = your Vercel URL
   - `WEB_URL` = your Vercel URL
4. Save and redeploy

---

## 📝 Summary:

✅ Backend deployed: https://severe-sunny-yalegn-bca3d23e.koyeb.app
⏭️ Next: Deploy frontend to Vercel
⏭️ Then: Connect them together

---

**Continue to Vercel deployment now! 🚀**
