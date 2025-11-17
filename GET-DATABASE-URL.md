# 🔍 How to Get Your Database Connection String

## ❌ What You Found (WRONG):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

This is an **API Key** (for Supabase SDK) - we don't need this!

## ✅ What You Need (CORRECT):

A PostgreSQL connection string that looks like:

```
postgresql://postgres:PASSWORD@host.supabase.co:5432/postgres
```

---

## 📍 Step-by-Step to Find It:

### Step 1: Go to Your Project

1. Open: https://supabase.com/dashboard
2. Click on your **cloudcb** project

### Step 2: Open Database Settings

1. Look at the **left sidebar**
2. At the **bottom**, click the **⚙️ gear icon** (Project Settings)
3. In the settings menu, click **"Database"**

### Step 3: Scroll Down to "Connection string"

You'll see a section called **"Connection string"**

### Step 4: Get the Connection Pooler URL

Look for **"Connection pooling"** section (it might be collapsed, click to expand)

You'll see:

- **Mode:** Transaction (or Session)
- **Connection string:** This is what you need!

### Step 5: Copy the Connection String

Click on the connection string to copy it. It will look like:

```
postgresql://postgres.lvemllffjyhxeziucakd:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Step 6: Replace [YOUR-PASSWORD]

Replace `[YOUR-PASSWORD]` with your actual password: `yordi@0721`

But since it has `@` symbol, encode it as: `yordi%400721`

---

## 🎯 Your Final Connection String Should Be:

```
postgresql://postgres.lvemllffjyhxeziucakd:yordi%400721@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Note:** The exact host might be different (like `aws-0-us-west-1` or `aws-0-eu-central-1`) depending on your region.

---

## 📸 Visual Guide:

```
Supabase Dashboard
  └─ Your Project (cloudcb)
      └─ ⚙️ Project Settings (bottom left)
          └─ Database (left menu)
              └─ Scroll down
                  └─ "Connection string" section
                      └─ "Connection pooling"
                          └─ Copy this URL! ✅
```

---

## 🆘 Can't Find It?

### Alternative Method:

1. In Supabase dashboard, click **"Database"** in the left sidebar (not settings)
2. You might see a **"Connect"** button at the top
3. Click it and select **"Connection pooling"**
4. Copy the URI

---

## ✅ How to Know You Have the Right String:

Your connection string should:

- ✅ Start with `postgresql://`
- ✅ Contain your project ref: `lvemllffjyhxeziucakd`
- ✅ Have a host like: `pooler.supabase.com`
- ✅ End with `/postgres`
- ✅ Have port `:6543` (for pooler) or `:5432` (direct)

---

## 🚀 Once You Have It:

1. Copy the full connection string
2. Replace `[YOUR-PASSWORD]` with `yordi%400721`
3. Save it somewhere safe
4. Use it as `DATABASE_URL` in Koyeb

---

**Go back to Supabase and find the "Connection pooling" URL! 🔍**
