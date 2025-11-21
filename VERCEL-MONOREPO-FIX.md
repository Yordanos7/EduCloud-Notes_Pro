# 🔧 VERCEL MONOREPO BUILD FIX

## ⚠️ THE PROBLEM

Your app is a **monorepo** with shared packages:

- `@cloudCB/db` (database/Prisma)
- `@cloudCB/auth` (authentication)
- `@cloudCB/config` (TypeScript config)

When Vercel builds `apps/server` or `apps/web`, it can't find these packages because they're in `packages/`.

---

## ✅ THE SOLUTION

We need to build the entire monorepo, not just individual apps.

### Option 1: Custom Build Commands (RECOMMENDED)

#### For Backend (`apps/server`):

**Root Directory**: `apps/server`

**Build Command**:

```bash
cd ../.. && npm install && npm run build && cd apps/server && npm run build
```

**Install Command**:

```bash
cd ../.. && npm install
```

**Output Directory**: `dist`

#### For Frontend (`apps/web`):

**Root Directory**: `apps/web`

**Build Command**:

```bash
cd ../.. && npm install && npm run build && cd apps/web && npm run build
```

**Install Command**:

```bash
cd ../.. && npm install
```

**Output Directory**: `build/client`

---

### Option 2: Build from Root (ALTERNATIVE)

If Option 1 doesn't work, try building from the monorepo root:

#### For Backend:

**Root Directory**: `.` (root)

**Build Command**:

```bash
npm install && npm run build && cd apps/server && npm run build
```

**Output Directory**: `apps/server/dist`

#### For Frontend:

**Root Directory**: `.` (root)

**Build Command**:

```bash
npm install && npm run build && cd apps/web && npm run build
```

**Output Directory**: `apps/web/build/client`

---

## 🔍 WHY THIS WORKS

1. `cd ../..` - Go to monorepo root
2. `npm install` - Install all dependencies (including workspace packages)
3. `npm run build` - Build all packages (db, auth, config)
4. `cd apps/server` - Go to specific app
5. `npm run build` - Build the app

This ensures shared packages are built before the app tries to use them.

---

## 🐛 COMMON BUILD ERRORS

### Error: "Cannot find module '@cloudCB/db'"

**Cause**: Shared packages not built

**Fix**: Use the custom build commands above

---

### Error: "Prisma Client not generated"

**Cause**: Prisma generate not run

**Fix**: Add to backend build command:

```bash
cd ../.. && npm install && npx prisma generate --schema=packages/db/prisma/schema.prisma && npm run build && cd apps/server && npm run build
```

---

### Error: "Module not found: Can't resolve '@cloudCB/auth'"

**Cause**: Auth package not built

**Fix**: Ensure `npm run build` at root builds all packages (check turbo.json)

---

### Error: "ENOENT: no such file or directory"

**Cause**: Wrong output directory

**Fix**: Check your build output:

```bash
# Locally test the build
cd cloudCB
npm install
npm run build
ls -la apps/server/dist  # Should see index.js
ls -la apps/web/build/client  # Should see index.html
```

---

## 📦 VERCEL CONFIGURATION

### Backend Project Settings:

```json
{
  "name": "cloudcb-backend",
  "framework": null,
  "rootDirectory": "apps/server",
  "buildCommand": "cd ../.. && npm install && npm run build && cd apps/server && npm run build",
  "outputDirectory": "dist",
  "installCommand": "cd ../.. && npm install"
}
```

### Frontend Project Settings:

```json
{
  "name": "cloudcb-frontend",
  "framework": "vite",
  "rootDirectory": "apps/web",
  "buildCommand": "cd ../.. && npm install && npm run build && cd apps/web && npm run build",
  "outputDirectory": "build/client",
  "installCommand": "cd ../.. && npm install"
}
```

---

## 🎯 TESTING LOCALLY

Before deploying, test the build locally:

```bash
# Test backend build
cd cloudCB
npm install
npm run build
cd apps/server
npm run build
ls -la dist  # Should see index.js

# Test frontend build
cd ../..
cd apps/web
npm run build
ls -la build/client  # Should see index.html, assets/
```

If local build works, Vercel build should work too!

---

## 🔄 ALTERNATIVE: SEPARATE REPOS

If monorepo is too complex, you can split into 2 repos:

1. **cloudcb-backend** repo (just apps/server + packages)
2. **cloudcb-frontend** repo (just apps/web)

This makes Vercel deployment simpler but harder to maintain code.

---

## 💡 RECOMMENDED APPROACH

**Use Option 1** (Custom Build Commands) because:

- ✅ Keeps monorepo structure
- ✅ Shared code stays DRY
- ✅ Single source of truth
- ✅ Easier to maintain

The build commands look complex but they work reliably!

---

Need help? Check Vercel build logs:

1. Go to your project on Vercel
2. Click on a deployment
3. Click "Building" or "View Function Logs"
4. Look for the error message
