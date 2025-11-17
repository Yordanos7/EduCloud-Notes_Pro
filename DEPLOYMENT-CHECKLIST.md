# ✅ Deployment Checklist

Print this and check off as you go!

---

## PREPARATION

- [ ] Code pushed to GitHub
- [ ] GitHub account ready
- [ ] 30-40 minutes available

---

## STEP 1: SUPABASE (Database) - 10 minutes

- [ ] Go to supabase.com
- [ ] Sign in with GitHub
- [ ] Create new project named "cloudcb"
- [ ] Set database password (SAVE IT!)
- [ ] Wait for project to be ready (2-3 min)
- [ ] Go to Settings → Database
- [ ] Copy Connection Pooling URL (Transaction mode)
- [ ] Save this URL somewhere safe

**My Supabase URL:**

```
_____________________________________________
```

---

## STEP 2: KOYEB (Backend) - 15 minutes

- [ ] Go to koyeb.com
- [ ] Sign in with GitHub
- [ ] Click "Create App"
- [ ] Connect GitHub and select cloudCB repo
- [ ] App name: cloudcb-server
- [ ] Builder: Buildpack
- [ ] Build command: `chmod +x build.sh && ./build.sh`
- [ ] Run command: `node apps/server/dist/index.js`
- [ ] Port: 3000

### Environment Variables:

- [ ] DATABASE_URL = (Supabase URL from Step 1)
- [ ] BETTER_AUTH_SECRET = (generate random 32+ chars)
- [ ] PORT = 3000
- [ ] NODE_ENV = production

- [ ] Click Deploy
- [ ] Wait for build (5-10 min)
- [ ] Copy your Koyeb URL

**My Koyeb URL:**

```
_____________________________________________
```

---

## STEP 3: VERCEL (Frontend) - 10 minutes

- [ ] Go to vercel.com
- [ ] Sign in with GitHub
- [ ] Click "Add New" → "Project"
- [ ] Import cloudCB repository
- [ ] Framework: Other
- [ ] Root directory: apps/web
- [ ] Build command: `npm install && npm run build`
- [ ] Output directory: `build/client`

### Environment Variables:

- [ ] VITE_API_URL = (Koyeb URL + /api)
- [ ] VITE_BETTER_AUTH_URL = (Koyeb URL + /api/auth)

- [ ] Click Deploy
- [ ] Wait for build (3-5 min)
- [ ] Copy your Vercel URL

**My Vercel URL:**

```
_____________________________________________
```

---

## STEP 4: FINAL CONFIG - 5 minutes

- [ ] Go back to Koyeb dashboard
- [ ] Open cloudcb-server app
- [ ] Go to Settings → Environment variables
- [ ] Add/Update: BETTER_AUTH_URL = (Koyeb URL + /api/auth)
- [ ] Add/Update: CORS_ORIGIN = (Vercel URL)
- [ ] Add/Update: WEB_URL = (Vercel URL)
- [ ] Click Save
- [ ] Wait for redeploy (2-3 min)

---

## TESTING

- [ ] Open Vercel URL in browser
- [ ] Homepage loads correctly
- [ ] Sign up with new account
- [ ] Login works
- [ ] Create a new note
- [ ] Edit the note
- [ ] Create a share link
- [ ] Open share link in incognito window
- [ ] Share link works!

---

## 🎉 DONE!

**My Live App:**

```
Frontend: _______________________________________
Backend:  _______________________________________
Database: Supabase
```

---

## If Something Breaks:

1. Check Troubleshooting in DEPLOYMENT-KOYEB-SUPABASE-VERCEL.md
2. Verify all URLs are correct (no typos)
3. Check environment variables match exactly
4. Look at build logs in Koyeb/Vercel
5. Make sure no trailing slashes in URLs

---

**Save this checklist! You can use it to redeploy or help others deploy.**
