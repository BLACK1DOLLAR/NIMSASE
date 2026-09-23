# NiMSA South East Region — Official Website
### Built with Node.js + Express + EJS

---

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
# OR for development (auto-restart on changes)
npm run dev
```

### 3. Open in Browser
```
http://localhost:3000
```

---

## 🔐 Default Admin Login
| Field    | Value                  |
|----------|------------------------|
| Email    | admin@nimsase.org      |
| Password | password               |

> **IMPORTANT:** Change this immediately! Go to Admin Dashboard → Users to manage access.

---

## 📁 Project Structure

The public marketing site is a prerendered React app (`web/`); the admin dashboard, auth,
and all data live in the original Express + EJS + MongoDB backend. Express serves both.

```
nimsa-se/
├── app.js                    # Express entry point — mounts /api, /auth, /admin,
│                              #   then serves web/dist (the built React site) for everything else
├── package.json               # "npm run build" builds web/ too (also runs on postinstall)
├── middleware/
│   ├── auth.js                # Login/Admin guard middleware
├── models/                    # Mongoose schemas (Executive, Event, Bulletin, News, …)
├── routes/
│   ├── api.js                 # Read-only JSON endpoints powering the React site
│   ├── auth.js                 # Login / Register / Logout (still EJS)
│   └── admin.js                # All admin CRUD routes (still EJS)
├── views/
│   ├── partials/nav.ejs, footer.ejs   # Used by 404/500/change-password only
│   ├── admin/                  # Admin dashboard templates
│   ├── login.ejs, register.ejs, change-password.ejs
│   └── 404.ejs, 500.ejs
├── public/
│   ├── css/style.css, js/main.js      # Styles/JS for the remaining EJS pages (admin/auth)
│   └── uploads/                # Cloudinary-backed upload staging
└── web/                        # React public site (Vite + React Router + Framer Motion + Lenis)
    ├── src/pages/               # Home, About, Leadership, Events, Bulletin, Resources,
    │                            #   Gallery, News, Campaigns, Join, Contact, Acknowledgement
    ├── src/components/          # Nav, Footer, Magnetic (rubber buttons), Reveal, ZoomHero, …
    ├── src/lib/api.js           # Client-side: fetches /api/*. Build-time: reads MongoDB directly
    ├── src/lib/serverData.js    # Build-time-only direct MongoDB reads (no server needed yet at build)
    └── dist/                    # Build output (gitignored) — prerendered per-route static HTML
```

### Building the React site

`npm run build` (or the `postinstall` hook, which runs automatically after `npm install`)
builds `web/` via `vite-react-ssg`, which prerenders every public route to static HTML with
real content pulled directly from MongoDB — no running Express server is required at build
time. `MONGODB_URI` must be set in the build environment for this to pick up real data.

---

## 👤 User Roles

| Role  | Access                                                     |
|-------|------------------------------------------------------------|
| Guest | View all public pages; see Join page prompt to register    |
| User  | All public pages + personalised Join form                  |
| Admin | Full access + Admin Dashboard to manage ALL content        |

### Admin Can Manage:
- ✅ **Executives** — Add/Edit/Delete REC members & school presidents
- ✅ **Events** — Create webinars, conventions, campaigns
- ✅ **Bulletins** — Upload new issues, set featured, manage archive
- ✅ **News** — Post announcements & stories
- ✅ **Users** — Promote to admin, delete accounts
- ✅ **Settings** — WhatsApp number, email, social links

---

## 🌐 Deployment Options

### Option A — Railway (Recommended for Node.js)
1. Push this folder to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Railway auto-detects Node.js and deploys
4. Add a custom domain in Railway settings

### Option B — Render
1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Build command: `npm install`
4. Start command: `npm start`

### Option C — Heroku
```bash
heroku login
heroku create nimsa-se-website
git push heroku main
```

---

## ⚙️ Configuration

### Update Contact Details
Go to **Admin Dashboard → Settings** and update:
- Official email
- WhatsApp number (format: `2348012345678` — no `+` or spaces)
- Social media links (Facebook, Instagram, Twitter/X, YouTube)

### Update Formspree (Contact & Join Forms)
1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID
3. In the EJS files, replace `your-form-id` with your real ID:
   - `views/contact.ejs`
   - `views/join.ejs`
   - `views/bulletin.ejs` (newsletter form)

### Add Google Analytics
Add your GA4 tracking ID to `views/partials/nav.ejs` (in the `<head>` area):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
```

---

## 🗓️ Adding Real Content (Quick Checklist)

- [ ] Log in as admin at `/auth/login`
- [ ] Add Regional Coordinator profile at `/admin/executives`
- [ ] Add all REC members and school presidents
- [ ] Add upcoming events (conventions, webinars, campaigns)
- [ ] Upload latest bulletin PDF link
- [ ] Post your first news story
- [ ] Update WhatsApp number and email in Settings
- [ ] Add real social media links in Settings
- [ ] Replace Formspree `your-form-id` in EJS files

---

## 🔧 Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Runtime      | Node.js            |
| Framework    | Express.js         |
| Templates    | EJS                |
| Auth         | express-session + bcryptjs |
| Database     | JSON flat-file (data/db.json) |
| CSS          | Custom (DM Sans + Playfair Display) |
| Fonts        | Google Fonts (CDN) |
| Icons        | Inline SVG         |

---

## 🎨 Brand Colors

| Token         | Hex       | Usage                          |
|---------------|-----------|--------------------------------|
| Primary Green | `#006400` | Nav, buttons, headers          |
| Deep Green    | `#003300` | Footer, dark overlays          |
| Gold Accent   | `#D4AF37` | CTAs, badges, active states    |
| Light Green   | `#e8f5e9` | Backgrounds, card fills        |

---

*NiMSA South East Region — ICT Directorate*  
*"Ever Solid Region" 🏆*
