# ✅ Supabase Setup Checklist

## What You Have So Far:

- ✅ Supabase account created
- ✅ Project created: cloudcb
- ✅ Project URL: `https://lvemllffjyhxeziucakd.supabase.co`
- ✅ Database password: `yordi@0721`

## What You Still Need:

- ❌ PostgreSQL connection string (DATABASE_URL)

---

## 🎯 Get Your Database Connection String:

### Quick Path:

```
Supabase Dashboard
  → Your Project (cloudcb)
  → ⚙️ Project Settings (bottom left)
  → Database (left menu)
  → Scroll down to "Connection string"
  → Find "Connection pooling" section
  → Copy the URI
  → Replace [YOUR-PASSWORD] with: yordi%400721
```

---

## 📋 Step-by-Step:

1. [ ] Go to: https://supabase.com/dashboard
2. [ ] Click on your **cloudcb** project
3. [ ] Click **⚙️ Project Settings** (bottom left sidebar)
4. [ ] Click **Database** in the left menu
5. [ ] Scroll down to **"Connection string"** section
6. [ ] Look for **"Connection pooling"** (expand if needed)
7. [ ] Copy the connection string
8. [ ] Replace `[YOUR-PASSWORD]` with `yordi%400721`

---

## ✅ Your Connection String Should Look Like:

```
postgresql://postgres.lvemllffjyhxeziucakd:yordi%400721@aws-0-REGION.pooler.supabase.com:6543/postgres
```

Where REGION might be:

- us-east-1
- us-west-1
- eu-central-1
- etc.

---

## 🚫 Common Mistakes:

### ❌ WRONG - API Key (JWT token):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

This is NOT what you need!

### ❌ WRONG - Project URL:

```
https://lvemllffjyhxeziucakd.supabase.co
```

This is NOT the database connection string!

### ✅ CORRECT - PostgreSQL Connection String:

```
postgresql://postgres.lvemllffjyhxeziucakd:yordi%400721@...
```

This is what you need!

---

## 🆘 Still Can't Find It?

### Alternative Method 1:

1. In Supabase, click **"Database"** in left sidebar (not settings)
2. Look for a **"Connect"** button
3. Select **"Connection pooling"**
4. Copy the URI

### Alternative Method 2:

1. In Project Settings → Database
2. Look for **"Connection Info"** section
3. Find **"Connection pooling"** subsection
4. Copy the string

---

## 📝 Once You Have It:

Write it down here:

```
DATABASE_URL =
_____________________________________________
_____________________________________________
```

Then continue to **Step 2: Deploy to Koyeb**!

---

## 🔐 Password Encoding:

Your password: `yordi@0721`
Encoded password: `yordi%400721`

Why? The `@` symbol is special in URLs, so we encode it as `%40`.

---

**Go find that connection string! You're almost there! 🚀**
