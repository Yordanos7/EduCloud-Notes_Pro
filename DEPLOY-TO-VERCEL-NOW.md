# 🚀 Deploy Frontend to Vercel

## ✅ Backend is Ready!

Your backend: `https://severe-sunny-yalegn-bca3d23e.koyeb.app`

Now let's deploy the frontend!

---

## 📋 Step-by-Step:

### STEP 1: Go to Vercel (2 minutes)

1. Open: **https://vercel.com**
2. Click **"Sign Up"** (or "Login")
3. Click **"Continue with GitHub"**
4. Authorize Vercel

### STEP 2: Import Project (1 minute)

1. Click **"Add New..."** → **"Project"**
2. Find your **EduCloud-Notes_Pro** repository
3. Click **"Import"**

### STEP 3: Configure Build Settings (3 minutes)

Vercel will show configuration screen:

#### Framework Preset:

- Select **"Other"**

#### Root Directory:

- Click **"Edit"** button
- Select **`apps/web`** from the dropdown
- Click **"Continue"**

#### Build and Output Settings:

**Build Command:**

```
npm install && npm run build
```

**Output Directory:**

```
build/client
```

**Install Command:**

```
npm install
```

### STEP 4: Add Environment Variables (2 minutes)

Scroll down to **"Environment Variables"** section.

Click **"Add"** for each variable:

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

### STEP 5: Deploy! (5 minutes)

1. Click **"Deploy"** button
2. Wait for build (3-5 minutes)
3. Watch the build logs

You'll see:

- Installing dependencies...
- Building application...
- Deployment successful! ✅

### STEP 6: Get Your URL

Once deployed, Vercel shows your live URL:

```
https://educloud-notes-pro.vercel.app
```

(or similar)

**COPY THIS URL!**

---

## 🔄 FINAL STEP: Connect Backend and Frontend

### Update Koyeb Environment Variables:

1. Go back to **Koyeb dashboard**
2. Click on your **severe-sunny-yalegn** service
3. Go to **"Settings"** → **"Environment variables"**
4. Add/Update these:

```
Name: CORS_ORIGIN
Value: [YOUR VERCEL URL]
```

```
Name: WEB_URL
Value: [YOUR VERCEL URL]
```

```
Name: BETTER_AUTH_URL
Value: https://severe-sunny-yalegn-bca3d23e.koyeb.app/api/auth
```

5. Click **"Save"**
6. Wait for redeploy (2-3 minutes)

---

## 🎉 Test Your App!

1. Open your Vercel URL
2. You should see your app homepage
3. Try to sign up
4. Create a note
5. Share a note

Everything should work! 🎉

---

## 🆘 Troubleshooting

### Vercel build fails:

- Check build logs
- Make sure root directory is `apps/web`
- Verify build command is correct

### Frontend loads but can't connect to API:

- Check VITE_API_URL is correct
- Make sure it ends with `/api`
- No trailing slash!

### Auth not working:

- Check VITE_BETTER_AUTH_URL
- Should end with `/api/auth`
- Make sure CORS_ORIGIN in Koyeb matches Vercel URL

---

## ✅ Checklist:

- [ ] Go to vercel.com
- [ ] Import EduCloud-Notes_Pro repo
- [ ] Set root directory to `apps/web`
- [ ] Add environment variables
- [ ] Deploy
- [ ] Copy Vercel URL
- [ ] Update Koyeb CORS_ORIGIN and WEB_URL
- [ ] Test the app!

---

**Go to Vercel now and deploy! You're almost done! 🚀**
