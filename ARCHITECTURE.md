# 🏗️ Your App Architecture

## How Everything Connects:

```
┌─────────────────────────────────────────────────────────┐
│                         USER                            │
│                    (Your Browser)                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Opens website
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend)                    │
│                                                         │
│  • React App                                           │
│  • Your UI/Pages                                       │
│  • URL: https://cloudcb.vercel.app                    │
│                                                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Makes API calls
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   KOYEB (Backend)                       │
│                                                         │
│  • Node.js/Express API                                 │
│  • Authentication                                      │
│  • Business Logic                                      │
│  • URL: https://cloudcb-server.koyeb.app             │
│                                                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Reads/Writes data
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 SUPABASE (Database)                     │
│                                                         │
│  • PostgreSQL Database                                 │
│  • Stores: Users, Notes, Notebooks, Tags              │
│  • Connection: postgresql://...                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Example User Flow:

### 1. User Creates a Note:

```
User types note
    ↓
Frontend (Vercel) sends POST request
    ↓
Backend (Koyeb) receives request
    ↓
Backend validates user is logged in
    ↓
Backend saves to Database (Supabase)
    ↓
Database returns saved note
    ↓
Backend sends response to Frontend
    ↓
Frontend shows the new note to User
```

### 2. User Shares a Note:

```
User clicks "Share"
    ↓
Frontend sends request to Backend
    ↓
Backend creates share link with token
    ↓
Backend saves share link to Database
    ↓
Backend returns URL: https://cloudcb.vercel.app/share/abc123
    ↓
Frontend shows share link to User
    ↓
User copies and shares link
    ↓
Friend opens link in browser
    ↓
Frontend loads share page
    ↓
Frontend asks Backend for note (using token)
    ↓
Backend checks Database if token is valid
    ↓
Backend returns note content
    ↓
Frontend shows note to Friend
```

---

## Environment Variables Flow:

### Frontend (Vercel) needs to know:

```
VITE_API_URL → Where is the backend?
VITE_BETTER_AUTH_URL → Where is authentication?
```

### Backend (Koyeb) needs to know:

```
DATABASE_URL → Where is the database?
CORS_ORIGIN → Which frontend can access me?
WEB_URL → What URL to use in share links?
BETTER_AUTH_URL → My own auth URL
BETTER_AUTH_SECRET → Secret for auth tokens
```

### Database (Supabase) needs:

```
Nothing! Just provides connection string
```

---

## Why This Setup?

### Vercel for Frontend:

✅ Free forever
✅ Optimized for React
✅ Auto-deploys from GitHub
✅ Global CDN (fast worldwide)

### Koyeb for Backend:

✅ Free tier (no card)
✅ Runs Node.js perfectly
✅ Easy environment variables
✅ Auto-deploys from GitHub

### Supabase for Database:

✅ Free PostgreSQL
✅ 500MB storage (plenty for notes)
✅ Connection pooling (handles many users)
✅ Automatic backups

---

## What Happens When You Push Code?

```
You: git push origin main
    ↓
GitHub: Code updated!
    ↓
    ├─→ Vercel: Detects change → Builds frontend → Deploys
    │
    └─→ Koyeb: Detects change → Builds backend → Deploys
```

Both update automatically! 🎉

---

## Free Tier Limits:

| Service  | Storage | Bandwidth | Requests  |
| -------- | ------- | --------- | --------- |
| Supabase | 500MB   | 2GB/month | Unlimited |
| Koyeb    | 2GB     | Unlimited | Unlimited |
| Vercel   | N/A     | 100GB/mo  | Unlimited |

**Perfect for your app!** Can handle thousands of users.

---

## Security:

```
User Password
    ↓
Hashed by Better Auth (Backend)
    ↓
Stored in Database (Supabase)
    ↓
Never sent to Frontend in plain text
```

All connections use HTTPS (encrypted) 🔒

---

This is your complete architecture! Simple, free, and scalable. 🚀
