# 🚀 Render SPA Deployment - Complete Fix

## The Problem

Your React Router v7 app is configured as a SPA (SSR disabled), but Render wasn't serving the fallback `index.html` for client-side routing.

---

## ✅ THE EASIEST SOLUTION - Render Dashboard (2 Minutes)

### Step-by-Step Fix:

1. **Go to Render Dashboard** → https://dashboard.render.com
2. **Select your `cloudcb-web` service**
3. **Click "Settings"** (left sidebar)
4. **Scroll down to "Redirects / Rewrites"** section
5. **Click "Add Rule"** button
6. **Enter these exact values**:
   ```
   Source:      /*
   Destination: /index.html
   Type:        Rewrite
   ```
7. **Click "Save Changes"**
8. **Go back to your service** and click **"Manual Deploy"**

**That's it!** Your SPA routing will now work perfectly. All routes like `/dashboard`, `/notes/123` will now serve `index.html` and let React Router handle the routing.

---

## 📋 Complete Setup Checklist

### For `cloudcb-web` Service:

**✅ Step 1: Add Redirect Rule** (Settings → Redirects / Rewrites)

```
Source:      /*
Destination: /index.html
Type:        Rewrite
```

**✅ Step 2: Set Environment Variables** (Settings → Environment)

```
VITE_API_URL=https://cloudcb-server.onrender.com
VITE_BETTER_AUTH_URL=https://cloudcb-server.onrender.com
```

**✅ Step 3: Verify Build Settings**

```
Build Command:        npm install && npm run build && cd apps/web && npm run build
Publish Directory:    apps/web/build/client
```

### For `cloudcb-server` Service:

**✅ Set Environment Variables** (Settings → Environment)

```
BETTER_AUTH_URL=https://cloudcb-server.onrender.com
CORS_ORIGIN=https://cloudcb-web.onrender.com
WEB_URL=https://cloudcb-web.onrender.com
DATABASE_URL=(auto-set from database)
BETTER_AUTH_SECRET=(auto-generated)
NODE_ENV=production
PORT=10000
```

---

## 🧪 Test Your Deployment

After deploying, test these scenarios:

1. ✅ Visit root: `https://cloudcb-web.onrender.com/`
2. ✅ Visit a route: `https://cloudcb-web.onrender.com/dashboard`
3. ✅ Refresh on a route (should NOT get 404)
4. ✅ Check browser console for API errors
5. ✅ Test authentication flow

---

## 🔧 Alternative Solutions

### Option 1: Using `_redirects` File (Already Added)

I've created `apps/web/public/_redirects` with:

```
/*    /index.html   200
```

This file will be copied to your build output and Render will automatically use it.

### Option 2: Using `render.yaml` (Already Configured)

Your `render.yaml` already has the rewrite rule:

```yaml
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

**Note**: The Dashboard method is more reliable and easier to verify.

---

## 🐛 Troubleshooting

### Still Getting 404s?

1. Check that the redirect rule is saved in Dashboard
2. Verify build completed successfully (check logs)
3. Confirm `index.html` exists in `apps/web/build/client/`
4. Try clearing Render's cache and redeploying

### API Calls Failing?

1. Check `VITE_API_URL` is set correctly
2. Verify CORS settings on backend (`CORS_ORIGIN`)
3. Check Network tab in browser DevTools
4. Ensure backend service is running

### Build Failing?

1. Check build logs in Render Dashboard
2. Verify all dependencies install correctly
3. Test build locally: `npm run build && cd apps/web && npm run build`
4. Check Node version compatibility (Render uses Node 20)

---

## 📝 How It Works

### React Router v7 SPA Mode

Your `react-router.config.ts` has `ssr: false`, which builds a static SPA:

- All routing happens client-side
- Server must serve `index.html` for all routes
- React Router takes over once the app loads

### The Rewrite Rule

```
Source: /*  →  Destination: /index.html  (Type: Rewrite)
```

This means:

- `/` → serves `index.html` ✓
- `/dashboard` → serves `index.html` (React Router handles it) ✓
- `/notes/123` → serves `index.html` (React Router handles it) ✓
- `/assets/main.js` → serves actual file (not rewritten) ✓

Static assets are served directly because they exist as files.

---

## 🎯 Quick Reference

**Render Dashboard URLs:**

- Dashboard: https://dashboard.render.com
- Your services: https://dashboard.render.com/services

**Your Service URLs (update with actual):**

- Frontend: `https://cloudcb-web.onrender.com`
- Backend: `https://cloudcb-server.onrender.com`

**Files Modified:**

- ✅ `render.yaml` - Updated build command
- ✅ `apps/web/public/_redirects` - Added fallback rule
- ✅ This guide - `RENDER-SPA-FIX.md`
