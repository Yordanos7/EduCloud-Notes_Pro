# 🔍 Exact Location of Database Connection String

## You're looking for this in Supabase:

### Navigation Path:

```
1. Supabase Dashboard (supabase.com/dashboard)
2. Click your project: "cloudcb"
3. Bottom left corner: Click ⚙️ "Project Settings"
4. Left sidebar: Click "Database"
5. Scroll down past "Database Settings"
6. Find section: "Connection string"
7. Inside that, find: "Connection pooling"
8. There's your connection string!
```

---

## What You'll See:

### Section: "Connection string"

This section has multiple tabs:

- **Postgres** (direct connection)
- **URI** (direct connection)
- **JDBC**
- **Connection pooling** ← **USE THIS ONE!**

### Click on "Connection pooling" tab

You'll see:

- **Mode:** Transaction (or Session)
- **Host:** Something like `aws-0-us-east-1.pooler.supabase.com`
- **Database:** postgres
- **Port:** 6543
- **User:** postgres.lvemllffjyhxeziucakd
- **Password:** [YOUR-PASSWORD]

### The Connection String:

Below all that info, there's a text box with:

```
postgresql://postgres.lvemllffjyhxeziucakd:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Click to copy this!**

---

## Replace the Password:

The string has `[YOUR-PASSWORD]` in it.

Replace it with your encoded password: `yordi%400721`

### Before:

```
postgresql://postgres.lvemllffjyhxeziucakd:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### After:

```
postgresql://postgres.lvemllffjyhxeziucakd:yordi%400721@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## Why "Connection pooling"?

Connection pooling is better for production because:

- ✅ Handles multiple connections efficiently
- ✅ Prevents "too many connections" errors
- ✅ Better performance
- ✅ Recommended by Supabase for external apps

---

## Visual Hierarchy:

```
Supabase Dashboard
└── Projects
    └── cloudcb (your project)
        └── Left Sidebar
            ├── Table Editor
            ├── SQL Editor
            ├── Database
            ├── Authentication
            ├── Storage
            ├── Edge Functions
            ├── Logs
            └── ⚙️ Project Settings ← CLICK HERE
                └── Settings Menu
                    ├── General
                    ├── Database ← CLICK HERE
                    │   └── Scroll down
                    │       └── "Connection string" section
                    │           └── "Connection pooling" tab ← THIS!
                    ├── API
                    ├── Auth
                    └── Storage
```

---

## 🎯 Quick Test:

Your connection string is correct if:

- ✅ Starts with `postgresql://`
- ✅ Contains `lvemllffjyhxeziucakd` (your project ref)
- ✅ Contains `pooler.supabase.com`
- ✅ Has port `:6543`
- ✅ Ends with `/postgres`
- ✅ Has your encoded password `yordi%400721`

---

## 🚀 Next Step:

Once you have this connection string:

1. Save it somewhere safe (notepad, text file)
2. Go to Koyeb
3. Use it as the `DATABASE_URL` environment variable
4. Continue with deployment!

---

**You got this! Find that connection string! 💪**
