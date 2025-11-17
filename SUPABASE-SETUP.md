# 🔗 Get Your Supabase Connection String

## You Have:

- Supabase URL: `https://lvemllffjyhxeziucakd.supabase.co`
- Database Password: `yordi@0721`

## Now Get the Connection String:

### Step 1: Go to Supabase Dashboard

1. Open: https://supabase.com/dashboard
2. Click on your **cloudcb** project

### Step 2: Get Connection String

1. Click **"Project Settings"** (gear icon ⚙️ in bottom left)
2. Click **"Database"** in the left menu
3. Scroll down to **"Connection string"**

### Step 3: Copy the RIGHT Connection String

You'll see two sections:

#### Section 1: Connection string

- Click the **"URI"** tab
- You'll see something like:
  ```
  postgresql://postgres.lvemllffjyhxeziucakd:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
  ```

#### Section 2: Connection pooling (USE THIS ONE!)

- Look for **"Connection pooling"** section
- Mode: **Transaction**
- Copy the connection string that looks like:
  ```
  postgresql://postgres.lvemllffjyhxeziucakd:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
  ```

### Step 4: Replace [YOUR-PASSWORD]

Replace `[YOUR-PASSWORD]` with: `yordi@0721`

**IMPORTANT:** If your password has special characters like `@`, you need to encode it!

Your password `yordi@0721` has an `@` symbol, so encode it:

- `@` becomes `%40`
- So `yordi@0721` becomes `yordi%400721`

### Your Final Connection String:

```
postgresql://postgres.lvemllffjyhxeziucakd:yordi%400721@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**COPY THIS!** You'll use it in Koyeb.

---

## About Tables:

### Will tables be created automatically?

**YES!** When you deploy to Koyeb, the build script runs:

```bash
npm run db:migrate:deploy
```

This will:

1. Connect to your Supabase database
2. Create all tables (User, Note, Notebook, Tag, etc.)
3. Set up all relationships

You don't need to do anything manually!

---

## Next Steps:

1. ✅ You have Supabase database
2. ✅ You have the connection string
3. ➡️ Now go to Koyeb and deploy backend
4. ➡️ Use this connection string as `DATABASE_URL`

Continue with **Step 2** in `DEPLOYMENT-KOYEB-SUPABASE-VERCEL.md`!
